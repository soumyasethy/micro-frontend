import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../../routes";
import {
    AssetsPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../../configs/api";
import { defaultAuthHeaders } from "../../../../configs/config";

let phoneNumber: string = "";

export const getOtp: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {

  await navigate(ROUTE.WITHDRAWAL_OTP);
};

export const goBack: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage ,goBack}
): Promise<any> => {
  goBack();
};

