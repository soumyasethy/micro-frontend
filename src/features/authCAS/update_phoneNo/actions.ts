import { ActionFunction } from "@voltmoney/types";
import { UpdateMobileNumber } from "./types";
import { ContinuePayload } from "../../login/phone_number/types";
import { User } from "../../login/otp_verify/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";

let phoneNumber = "";
export const updateMobileNumber: ActionFunction<UpdateMobileNumber> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
  const user: User = await SharedPropsService.getUser();

  user.linkedBorrowerAccounts[0].accountHolderPhoneNumber = phoneNumber;
  await SharedPropsService.setUser(user);

  console.warn("action", action);
  await setDatastore(ROUTE.MF_FETCH_PORTFOLIO, action.payload.targetWidgetId, {
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
