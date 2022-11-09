import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
    amountPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

export const modifyAmount: ActionFunction<amountPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  navigate(ROUTE.PORTFOLIO);
  console.warn("**** amount data****");
};

