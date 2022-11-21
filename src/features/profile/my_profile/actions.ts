import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  ProfilePayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

let phoneNumber: string = "";

export const accountDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
 await navigate(ROUTE.ACCOUNT_DETAILS)
};

export const contactDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.CONTACT_US)
};

export const faqDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.FAQ)
};


export const goBack: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  {goBack }
): Promise<any> => {
  goBack();
};

