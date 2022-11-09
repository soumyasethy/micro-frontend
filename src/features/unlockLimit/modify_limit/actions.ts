import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
    AssetsPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

let phoneNumber: string = "";

export const selectAssets: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {

  console.warn("**** using phoneNumber ****",  action.payload.value);
  //await navigate(ROUTE.PORTFOLIO);
  console.warn("**** Assets data****");
};

export const goBack: ActionFunction<AssetsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("**** Go Back****");
};

