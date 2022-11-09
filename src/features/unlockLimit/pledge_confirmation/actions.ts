import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
    OtpPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

export const sendOtp: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** otp data****");
  navigate(ROUTE.PLEDGE_VERIFY);
  
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

