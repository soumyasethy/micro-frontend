import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../../routes";
import {
  CreditPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../../configs/api";
import { defaultAuthHeaders } from "../../../../configs/config";

let phoneNumber: string = "";

export const withdrawNow: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.WITHDRAW_AMOUNT);
};

export const repayment: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** Go Repayment****");
  await navigate(ROUTE.REPAYMENT);
};

export const goBack: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** Go Back****");
};

