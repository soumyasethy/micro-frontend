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

export const otpSend: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.PLEDGED_AMOUNT);
  console.warn("**** Otp data****");
};

export const goBack: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  {  goBack , setDatastore, asyncStorage }
): Promise<any> => {
  goBack();
  console.warn("**** Go Back****");
};


