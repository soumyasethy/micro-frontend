import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { saveAttribute } from "./repo";
import { nextStepId } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { setDatastore, navigate, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const updatedUser: User = await saveAttribute(
    action.payload.applicationId,
    "EMAIL",
    action.payload.value || emailId
  );
  if (updatedUser) {
    await SharedPropsService.setUser(updatedUser);
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      loading: false,
    });
    const route = await nextStepId(
      updatedUser.linkedApplications[0].currentStepId
    );
    console.warn("route saveEmail id", route, updatedUser);
    await navigate(route.routeId, route.params);
  }
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email ****", action.payload.value);
  emailId = action.payload.value;
};
