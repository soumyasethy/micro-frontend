import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { LimitPayload } from "./types";
import { nextStepId } from "../../../configs/utils";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const routeObj = await nextStepId(ROUTE.MF_PLEDGE_PORTFOLIO);
  console.log(routeObj)
  await navigate(routeObj.routeId, routeObj.params);
  // await navigate(ROUTE.MF_PLEDGE_PORTFOLIO);
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
