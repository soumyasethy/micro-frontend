import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { saveAttribute } from "./repo";
import {nextStep} from "../../../configs/utils";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { setDatastore, navigate, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  await saveAttribute(
    action.payload.applicationId,
    "EMAIL",
    action.payload.value || emailId
  );
  // const user: User = SharedPropsService.getUser();
  // user.linkedBorrowerAccounts[0].accountHolderEmail = action.payload.value;
  // await SharedPropsService.setUser(user);
  const route = await nextStep();
  await navigate(route.routeId, route.params);
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email ****", action.payload.value);
  emailId = action.payload.value;
};
