import { ActionFunction } from "@voltmoney/types";
import { nextStep } from "../otp_verify/repo";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);

  const routeObj = await nextStep();
  console.warn("**** routeObj ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
