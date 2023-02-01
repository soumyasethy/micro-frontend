import { ActionFunction } from "@voltmoney/types";
import { nextStepCredStepper } from "../../../configs/utils";

export const Go_Next_Action: ActionFunction<{ stepId?: string }> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** NextStep Action triggered ****", action.payload.stepId);
  const routeObj = action.payload.stepId
    ? await nextStepCredStepper(action.payload.stepId)
    : await nextStepCredStepper();
  console.warn("**** NextStep Route ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
