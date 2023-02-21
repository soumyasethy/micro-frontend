import { ActionFunction } from "@voltmoney/types";
import { nextStepCredStepper } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";

export const Go_Next_Action: ActionFunction<{ stepId?: string }> = async (
  action,
  _datastore,
  { navigate, network }
): Promise<any> => {
  console.warn("**** NextStep Action triggered ****", action.payload.stepId);
  // const routeObj = action.payload.stepId
  //   ? await nextStepCredStepper(action.payload.stepId)
  //   : await nextStepCredStepper();
  let user: User = await SharedPropsService.getUser();
  const routeObj = await nextStepCredStepper(
    user.linkedApplications[0].currentStepId
  );
  console.warn("**** NextStep Route ****", routeObj);
  await navigate(routeObj.routeId, routeObj.params);
};
