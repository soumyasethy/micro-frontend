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

export const verifyOTP: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("****OTP data****");
  // await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
  //   loading: true,
  // });
};

