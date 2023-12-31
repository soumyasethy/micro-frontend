import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AssetsPayload, CopyToClipboardPayload } from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

export const repayment: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.DASHBOARD);
};

export const goBack: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await navigate(ROUTE.DASHBOARD);
};
export const copyToClipboard: ActionFunction<CopyToClipboardPayload> = async (
  action,
  _datastore,
  { clipboard }
): Promise<any> => {
  clipboard.set(action.payload.value);
};
