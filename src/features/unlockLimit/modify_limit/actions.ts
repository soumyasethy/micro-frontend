import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AssetsPayload } from "./types";

import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
} from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import SharedPropsService from "../../../SharedPropsService";

let amount: number = 0;
const getUpdateAvailableCAS = (
  amountRequired: number,
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  const updateAvailableCAS = [];
  for (let i = 0; i < availableCAS.length; i++) {
    let item: AvailableCASItem = availableCAS[i];
    let individualAmount = getTotalLimit([item], isinNavMap, isinLTVMap);
    if (amountRequired >= individualAmount) {
      console.warn("if amountRequired", individualAmount, amountRequired);
      updateAvailableCAS.push(item);
      amountRequired = amountRequired - individualAmount;
    } else {
      let ratio = amountRequired / individualAmount;
      let newItem = {
        ...item,
        pledgedUnits: Math.ceil(item.totalAvailableUnits * ratio * 100) / 100,
      };
      updateAvailableCAS.push(newItem);
      amountRequired = 0;
      console.warn(
        "else amountRequired",
        individualAmount,
        amountRequired,
        ratio,
        newItem,
        item
      );
    }
  }

  if (amountRequired > 0) {
    /// throw error
    return [];
  }
  return updateAvailableCAS;
};
export const SelectAssets: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  if (amount !== 0) {
  }
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = {};

  if (amount > 0) {
    stepResponseObject.availableCAS.forEach((item, index) => {
      stepResponseObject.availableCAS[index].pledgedUnits =
        item.totalAvailableUnits;
    });
    stepResponseObject.availableCAS = getUpdateAvailableCAS(
      amount,
      stepResponseObject.availableCAS,
      stepResponseObject.isinNAVMap,
      stepResponseObject.isinLTVMap
    );
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      updateAvailableCASMap[key] = item;
    });
  } else {
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      item.pledgedUnits = item.totalAvailableUnits;
      updateAvailableCASMap[key] = item;
    });
  }
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  await navigate(ROUTE.PORTFOLIO, {
    stepResponseObject: stepResponseObject,
    updateAvailableCASMap,
  });
};
export const ConfirmCTA: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const stepResponseObject = action.payload.stepResponseObject;
  stepResponseObject.availableCAS.forEach((item, index) => {
    stepResponseObject.availableCAS[index].pledgedUnits =
      item.totalAvailableUnits;
  });
  stepResponseObject.availableCAS = getUpdateAvailableCAS(
    amount,
    stepResponseObject.availableCAS,
    stepResponseObject.isinNAVMap,
    stepResponseObject.isinLTVMap
  );
  navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
};

export const goBack: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};

export const EnterAmountAction: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  _
): Promise<any> => {
  if (action.payload.value === "") {
    amount = 0;
  } else {
    amount = parseFloat(action.payload.value);
  }
  console.warn("EnterAmountAction", amount);
};
