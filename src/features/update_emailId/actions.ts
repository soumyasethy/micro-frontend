import { ActionFunction } from "@voltmoney/types";
import { UpdateEmailIdPayload } from "./types";
import { ContinuePayload } from "../phone_number/types";
import { User } from "../otp_verify/types";
import { StoreKey } from "../../configs/api";
import { ROUTE } from "../../routes";

let emailId = "";

export const updateEmailId: ActionFunction<UpdateEmailIdPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
  const user: User = await asyncStorage
    .get(StoreKey.userContext)
    .then((result) => JSON.parse(result));

  user.linkedBorrowerAccounts[0].accountHolderEmail = emailId;
  await asyncStorage.set(StoreKey.userContext, JSON.stringify(user));

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
