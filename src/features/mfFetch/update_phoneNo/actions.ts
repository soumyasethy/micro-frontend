import { ActionFunction } from "@voltmoney/types";
import { UpdateMobileNumber } from "./types";
import { ContinuePayload } from "../../login/phone_number/types";
import { PartnerUser, User } from "../../login/otp_verify/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";

let phoneNumber = "";
export const updateMobileNumber: ActionFunction<UpdateMobileNumber> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {

  if (!phoneNumber.includes("+91")) {
    phoneNumber = `+91${phoneNumber}`;
  }


  const userType = await SharedPropsService.getUserType();
  if (userType === "BORROWER") {
    const user: User = await SharedPropsService.getUser();
    user.linkedBorrowerAccounts[0].accountHolderPhoneNumber = phoneNumber;
    await SharedPropsService.setUser(user);
    await setDatastore(ROUTE.MF_FETCH_PORTFOLIO, action.payload.targetWidgetId, {
      subTitle: phoneNumber.substring(3),
    });
    await goBack();
  } else {
    const partnerUser: PartnerUser = await SharedPropsService.getPartnerUser();
    partnerUser.phoneNumber = phoneNumber;
    await SharedPropsService.setPartnerUser(partnerUser);
    await setDatastore(ROUTE.MF_FETCH_PORTFOLIO, action.payload.targetWidgetId, {
      subTitle: phoneNumber.substring(3),
    });
    await goBack();
  }
};

export const phoneOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { }
): Promise<any> => {
  phoneNumber = action.payload.value;
};
export const emailOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { }
): Promise<any> => {
  phoneNumber = action.payload.value;
};
