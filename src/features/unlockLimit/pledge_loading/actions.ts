import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  VerifyPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

export const verifyPledging: ActionFunction<VerifyPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("****Verify data****");
  // await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
  //   loading: true,
  // });
};

