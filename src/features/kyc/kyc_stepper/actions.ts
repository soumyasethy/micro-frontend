import { ActionFunction } from "@voltmoney/types";
import { nextStepStepper } from "../../login/otp_verify/repo";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const routeObj = await nextStepStepper();
  console.warn("**** NextStep ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
