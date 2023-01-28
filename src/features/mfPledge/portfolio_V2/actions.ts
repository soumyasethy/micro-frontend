import { ActionFunction, WidgetProps } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  CtaPayload,
  EditItemPayload,
  OtpPayload,
  PortfolioTogglePayload,
  SearchPortfolioPayload,
} from "./types";
import {CtaCardProps, ListProps, TypographyProps} from "@voltmoney/schema";
import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
  StepResponseObject,
} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { portfolioListDatastoreBuilderV2, togglePortfolio } from "./utils";
import {addCommasToNumber, roundDownToNearestHundred} from "../../../configs/utils";
import { getDesiredValue } from "../portfolio_readonly/actions";

let portfolioSearchKeyword = "";
let listBeforeSearchUI = [];

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


export const getPortfolioValue = (
    availableCAS: AvailableCASItem[],
    isinNavMap: IsinNAVMap,
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
        sum +
        roundDownToNearestHundred(
            item.totalAvailableUnits * isinNavMap[item.isinNo]
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
  console.log("Here payload: ", action)
  await togglePortfolio(
    action.payload.value,
    action.payload.selectedMap[action.payload.value],
    action.payload.stepResponseObject
  );
  const props = await portfolioListDatastoreBuilderV2(
    action.payload.stepResponseObject,
    portfolioSearchKeyword
  );
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps & WidgetProps>{
    ...props.listItem,
  });
  await setDatastore(ROUTE.PORTFOLIO, "outOfText1", <TypographyProps>{
    ...props.outOfText1,
  });

  const portValue = getDesiredValue(
    action.payload.stepResponseObject.availableCAS,
    action.payload.stepResponseObject.isinNAVMap
  );

  await SharedPropsService.setDesiredPortfolio(portValue);

  await setDatastore(ROUTE.PORTFOLIO, "subTitleText", <TypographyProps>{
    label: `₹${addCommasToNumber(portValue)} out of ₹${addCommasToNumber(
      parseInt(action.payload.stepResponseObject["totalPortfolioAmount"].toString())
    )} are selected for pledging.`
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
