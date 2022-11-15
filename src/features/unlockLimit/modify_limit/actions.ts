import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AssetsPayload } from "./types";

import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
} from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import { ACTION as PLEDGE_CONFIRM_ACTIONS } from "../pledge_confirmation/types";
import { sendOtp } from "../pledge_confirmation/actions";

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
      break;
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
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  const updateAvailableCASMap = {};
  action.payload.stepResponseObject.availableCAS.map((item, index) => {
    let key = `${item.isinNo}-${item.folioNo}`;
    item.pledgedUnits = item.totalAvailableUnits;
    updateAvailableCASMap[key] = item;
  });
  await navigate(ROUTE.PORTFOLIO, {
    stepResponseObject: action.payload.stepResponseObject,
    updateAvailableCASMap,
  });
};
export const ConfirmCTA: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { setDatastore, ...props }
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
  const verifyAction = {
    type: PLEDGE_CONFIRM_ACTIONS.PLEDGE_CONFIRMATION,
    payload: {
      value: stepResponseObject,
      widgetId: "continue",
    },
    routeId: ROUTE.PLEDGE_CONFIRMATION,
  };
  await sendOtp(verifyAction, _datastore, { setDatastore, ...props });
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
  amount = parseFloat(action.payload.value);
};
