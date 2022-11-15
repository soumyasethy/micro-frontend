import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { LimitPayload } from "./types";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  action.payload.value.availableCAS.forEach((item, index) => {
    action.payload.value.availableCAS[index].pledgedUnits =
      item.totalAvailableUnits;
  });
  await navigate(ROUTE.PLEDGE_CONFIRMATION, {
    stepResponseObject: action.payload.value,
  });
};

export const modifyLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MODIFY_LIMIT, {
    stepResponseObject: action.payload.value,
  });
};
