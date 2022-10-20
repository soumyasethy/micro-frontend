import { ActionFunction } from "@voltmoney/types";
import { UpdateMobileNumber } from "./types";
import { ContinuePayload } from "../phone_number/types";
import { User } from "../otp_verify/types";
import { StoreKey } from "../../configs/api";
import { ROUTE } from "../../routes";

let phoneNumber = "";
export const updateMobileNumber: ActionFunction<UpdateMobileNumber> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
  const user: User = await asyncStorage
    .get(StoreKey.userContext)
    .then((result) => JSON.parse(result));

  user.linkedBorrowerAccounts[0].accountHolderPhoneNumber = phoneNumber;
  await asyncStorage.set(StoreKey.userContext, JSON.stringify(user));
  console.warn("action", action);
  await setDatastore(ROUTE.MF_PLEDGING, action.payload.targetWidgetId, {
    subTitle: phoneNumber,
  });
  await goBack();
};

export const phoneOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update phoneNumber ****", action.payload.value);
  phoneNumber = action.payload.value;
};
export const emailOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update phoneNumber ****", action.payload.value);
  phoneNumber = action.payload.value;
};
