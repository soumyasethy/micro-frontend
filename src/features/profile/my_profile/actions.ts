import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ProfilePayload } from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";
import { clearAllData } from "../../../configs/utils";

let phoneNumber: string = "";

// export const userProfile: ActionFunction<ProfilePayload> = async (
//   action,
//   _datastore,
//   { navigate, setDatastore, asyncStorage }
// ): Promise<any> => {
//  await navigate(ROUTE.ACCOUNT_DETAILS)
// };

export const accountDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.ACCOUNT_DETAILS, {
    profileData: action.payload.value,
  });
};

export const contactDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.CONTACT_US);
};

export const faqDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.FAQ);
};

export const aboutDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.log("abou page");
  await navigate(ROUTE.ABOUTUS);
};

export const logout: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  await clearAllData();
  await navigate(ROUTE.PHONE_NUMBER);
};

export const goBack: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
