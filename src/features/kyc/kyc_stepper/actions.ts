import { ActionFunction } from "@voltmoney/types";
import { nextStepCredStepper } from "../../../configs/utils";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const routeObj = await nextStepCredStepper();
  console.warn("**** NextStep ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
