import { ActionFunction } from "@voltmoney/types";
import { UpdateEmailIdPayload } from "./types";
import { ContinuePayload } from "../phone_number/types";
import { User } from "../otp_verify/types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";

let emailId = "";

export const updateEmailId: ActionFunction<UpdateEmailIdPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
  const user: User = SharedPropsService.getUser();
  user.linkedBorrowerAccounts[0].accountHolderEmail = emailId;
  await SharedPropsService.setUser(user);
  await setDatastore(ROUTE.MF_PLEDGING, action.payload.targetWidgetId, {
    subTitle: emailId,
  });
  await goBack();
};

export const emailOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email id ****", action.payload.value);
  emailId = action.payload.value;
};
