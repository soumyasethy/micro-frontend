import { ActionFunction, WidgetProps } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  CtaPayload,
  EditItemPayload,
  OtpPayload,
  PortfolioTogglePayload,
  SearchPortfolioPayload,
} from "./types";
import { ButtonTypeTokens, ColorTokens, CtaCardProps, ListProps } from "@voltmoney/schema";
import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
  StepResponseObject,
} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { portfolioListDatastoreBuilder, togglePortfolio } from "./utils";
import { roundDownToNearestHundred } from "../../../configs/utils";

let portfolioSearchKeyword = "";
let listBeforeSearchUI = [];

export const getTotalLimitWithoutRounding = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
      sum +
        item.pledgedUnits * isinNavMap[item.isinNo] * isinLTVMap[item.isinNo]
  });
  return sum;
};
export const getTotalLimit = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
      sum +
      roundDownToNearestHundred(
        item.pledgedUnits * isinNavMap[item.isinNo] * isinLTVMap[item.isinNo]
      );
  });
  return sum;
};
export const getActualLimit = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
      sum +
      roundDownToNearestHundred(
        item.totalAvailableUnits *
          isinNavMap[item.isinNo] *
          isinLTVMap[item.isinNo]
      );
  });
  return sum;
};

export const TriggerCTA: ActionFunction<CtaPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const availableCASMap = await SharedPropsService.getAvailableCASMap();
  const updatedList: AvailableCASItem[] = [];
  Object.keys(availableCASMap).forEach((key) => {
    const updatedItem = availableCASMap[key];
    updatedList.push(updatedItem);
  });
  const stepResponseObject: StepResponseObject = {
    ...action.payload.value,
    availableCAS: [...updatedList],
  };
  navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
};

export const goBack: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
export const EditItem: ActionFunction<EditItemPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.MODIFY_PLEDGED_AMOUNT, {
    index: action.payload.value,
    stepResponseObject: action.payload.stepResponseObject,
    selectedMap: action.payload.selectedMap,
    portfolioSearchKeyword,
  });
};

export const ToggleSelectAction: ActionFunction<
  PortfolioTogglePayload
> = async (action, _datastore, { setDatastore }): Promise<any> => {
  await togglePortfolio(
    action.payload.value,
    action.payload.selectedMap[action.payload.value],
    action.payload.stepResponseObject
  );
  const props = await portfolioListDatastoreBuilder(
    action.payload.stepResponseObject,
    portfolioSearchKeyword
  );
  if(props.totalItem['info'] < 25000) {
    await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
      ...props.totalItem,
      buttonType: ButtonTypeTokens.LargeOutline,
      labelColor: ColorTokens.Grey_Charcoal
    });
  } else {
    await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
      ...props.totalItem,
      labelColor: ColorTokens.White,
      buttonType: ButtonTypeTokens.LargeFilled,
    });
  }
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps & WidgetProps>{
    ...props.listItem,
  });
};

export const SearchPortfolio: ActionFunction<SearchPortfolioPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  portfolioSearchKeyword = action.payload.value;
  if (listBeforeSearchUI.length === 0) {
    listBeforeSearchUI = _.get(_datastore, "listItem.data", []);
  }
  const filteredList = listBeforeSearchUI.filter((item) =>
    JSON.stringify(item.label.toUpperCase()).includes(
      portfolioSearchKeyword.toUpperCase()
    )
  );
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps>{
    data: filteredList,
  });
};

export const ClearSearchPortfolio: ActionFunction<
  SearchPortfolioPayload
> = async (action, _datastore, { setDatastore }): Promise<any> => {
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps>{
    data: listBeforeSearchUI,
  });
};
