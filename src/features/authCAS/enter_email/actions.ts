import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { api, StoreKey } from "../../../configs/api";
import { User } from "../../login/otp_verify/types";
import { ButtonProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { saveAttribute } from "./repo";
import { nextStep } from "../../login/otp_verify/repo";

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
  SharedPropsService.getUser().linkedBorrowerAccounts[0].accountHolderEmail =
    action.payload.value;
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
