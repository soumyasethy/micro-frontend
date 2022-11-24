import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AmountPayload, ModifyAmountPayload } from "./types";
import {
  CtaCardProps,
  IconTokens,
  ListItemDataProps,
  ListProps,
} from "@voltmoney/schema";
import { getActualLimit, getTotalLimit } from "../portfolio/actions";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION, EditItemPayload } from "../portfolio/types";
import { AvailableCASItem } from "../unlock_limit/types";
import _ from "lodash";
let amount: number = 0;

export const ModifyAmountAction: ActionFunction<ModifyAmountPayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
  const updateAvailableCASMapX = await SharedPropsService.getAvailableCASMap();
  const stepResponseObject = action.payload.stepResponseObject;
  const availableCASItem =
    stepResponseObject.availableCAS[action.payload.index];
  let key = `${availableCASItem.isinNo}-${availableCASItem.folioNo}`;

  let pledgedUnitsCalculated: number =
    amount /
    (stepResponseObject.isinNAVMap[updateAvailableCASMapX[key].isinNo] *
      stepResponseObject.isinLTVMap[updateAvailableCASMapX[key].isinNo]);

  if (_.get(action, "payload.amount", false) || amount === 0) {
    pledgedUnitsCalculated = 0;
  }
  updateAvailableCASMapX[key].pledgedUnits = pledgedUnitsCalculated;

  await SharedPropsService.setAvailableCASMap(updateAvailableCASMapX);

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
            ? getTotalLimit(
                [updateAvailableCASMapX[key]],
                stepResponseObject.isinNAVMap,
                stepResponseObject.isinLTVMap
              )
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
        )}`,
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
      action.payload.portfolioSearchKeyword.toUpperCase()
    )
  );
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps>{
    data: filteredList,
    selectedMap: {
      ...action.payload.selectedMap,
      [action.payload.index]: amount > 0,
    },
  });
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMapX);
  await setDatastore(ROUTE.PORTFOLIO, "totalItem", <CtaCardProps>{
    info: `${totalAmount}`,
  });

  action.payload.selectedMap[action.payload.index] =
    availableCASItem.pledgedUnits > 0;
  await setDatastore(ROUTE.PORTFOLIO, "listItem", <ListProps>{
    data: filteredList,
    selectedMap: { ...action.payload.selectedMap },
  });
  await goBack();
};
export const EditAmountAction: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  _
): Promise<any> => {
  amount = parseFloat(action.payload.value);
};

export const goBack: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  console.warn("goBack called");
  // await navigate(ROUTE.MODIFY_PLEDGED_AMOUNT);
  await goBack();
};
