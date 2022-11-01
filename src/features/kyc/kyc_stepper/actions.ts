import { ActionFunction } from "@voltmoney/types";
import {nextStepStepper} from "../../../configs/utils";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const routeObj = await nextStepStepper();
  console.warn("**** NextStep ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
