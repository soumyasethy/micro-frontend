import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  CtaPayload,
  EditItemPayload,
  OtpPayload,
  PortfolioTogglePayload,
  SearchPortfolioPayload,
} from "./types";
import {
  CtaCardProps,
  IconTokens,
  ListItemDataProps,
  ListProps,
} from "@voltmoney/schema";
import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
} from "../unlock_limit/types";
import { sendOtp } from "../pledge_confirmation/actions";
import { ACTION as PLEDGE_CONFIRM_ACTIONS } from "../pledge_confirmation/types";
import { OtpPayload as CTAPayload } from "../pledge_confirmation/types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";

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
      item.pledgedUnits * isinNavMap[item.isinNo] * isinLTVMap[item.isinNo];
  });
  return Math.round(sum * 100) / 100;
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
      item.totalAvailableUnits *
        isinNavMap[item.isinNo] *
        isinLTVMap[item.isinNo];
  });
  return Math.round(sum * 100) / 100;
};

export const TriggerCTA: ActionFunction<CtaPayload> = async (
  action,
  _datastore,
  { setDatastore, navigate, ...props }
): Promise<any> => {
  // await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
  //   isLoading: true,
  // });
  const availableCASMap = await SharedPropsService.getAvailableCASMap();
  const updatedList: AvailableCASItem[] = [];
  Object.keys(availableCASMap).forEach((key) => {
    const updatedItem = availableCASMap[key];
    updatedList.push(updatedItem);
  });
  const stepResponseObject = {
    ...action.payload.value,
    availableCAS: [...updatedList],
  };
  navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
  // const verifyAction = {
  //   type: PLEDGE_CONFIRM_ACTIONS.PLEDGE_CONFIRMATION,
  //   payload: <CTAPayload>{
  //     value: {
  //       ...action.payload.value,
  //       availableCAS: [...updatedList],
  //     },
  //     widgetId: "continue",
  //   },
  //   routeId: ROUTE.PLEDGE_CONFIRMATION,
  // };
  // await sendOtp(verifyAction, _datastore, { setDatastore, ...props });
  // await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
  //   isLoading: false,
  // });
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
  const updateAvailableCASMapX = await SharedPropsService.getAvailableCASMap();
  const stepResponseObject = action.payload.stepResponseObject;
  const availableCASItem =
    action.payload.stepResponseObject.availableCAS[action.payload.value];
  let key = `${availableCASItem.isinNo}-${availableCASItem.folioNo}`;

  let pledgedUnitsCalculated: number = 0;
  if (action.payload.selectedMap[action.payload.value] === true) {
    pledgedUnitsCalculated = availableCASItem.totalAvailableUnits;
  }
  updateAvailableCASMapX[key] = {
    ...updateAvailableCASMapX[key],
    pledgedUnits: pledgedUnitsCalculated,
  };

  const selectedCAS: AvailableCASItem[] = [];
  Object.keys(updateAvailableCASMapX).forEach((key) => {
    selectedCAS.push(updateAvailableCASMapX[key]);
  });
  const totalAmount = getTotalLimit(
    selectedCAS,
    stepResponseObject.isinNAVMap,
    stepResponseObject.isinLTVMap
  );
  const updatedListUI = [
    ...selectedCAS.map((availableCASItem, i) => {
      let key = `${stepResponseObject.availableCAS[i].isinNo}-${stepResponseObject.availableCAS[i].folioNo}`;
      return <ListItemDataProps>{
        label: availableCASItem.schemeName, //"Axis Long Term Equity Mutual Funds",
        info: "",
        trailIcon: { name: IconTokens.Edit },
        trailTitle: `${
          action.payload.selectedMap.hasOwnProperty(i) &&
          action.payload.selectedMap[i]
            ? `₹${getTotalLimit(
                [updateAvailableCASMapX[key]],
                stepResponseObject.isinNAVMap,
                stepResponseObject.isinLTVMap
              )}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",")
            : 0
        }`, //"₹4,000",
        trailSubTitle: `/ ₹${getActualLimit(
          [
            {
              ...availableCASItem,
              pledgedUnits: availableCASItem.totalAvailableUnits,
            },
          ],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","),
        action: "edit",
        trailIconAction: {
          type: ACTION.EDIT_ITEM,
          routeId: ROUTE.PORTFOLIO,
          payload: <EditItemPayload>{
            value: 0,
            stepResponseObject,
            selectedMap: {},
          },
        },
      };
    }),
  ];
  const filteredList = updatedListUI.filter((item) =>
    JSON.stringify(item.label.toUpperCase()).includes(
      portfolioSearchKeyword.toUpperCase()
    )
  );
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps>{
    data: filteredList,
    selectedMap: { ...action.payload.selectedMap },
  });
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMapX);
  await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
    info: `${totalAmount}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","),
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
