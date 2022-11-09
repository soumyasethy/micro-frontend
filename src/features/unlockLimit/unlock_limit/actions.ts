import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  LimitPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** unlock limit data****");
  navigate(ROUTE.PLEDGE_CONFIRMATION);
};

export const modifyLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** modify limit data****");
  navigate(ROUTE.MODIFY_LIMIT);
};

