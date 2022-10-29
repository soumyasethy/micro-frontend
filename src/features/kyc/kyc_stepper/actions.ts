import { ActionFunction } from "@voltmoney/types";
import { nextStep, nextStepStepper } from "../../login/otp_verify/repo";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const routeObj = await nextStepStepper();
  console.warn("**** routeObj ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
