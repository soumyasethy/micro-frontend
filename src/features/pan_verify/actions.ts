import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";

let emailId: string = "";

export const verifyPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** using emailId ****", emailId);
};
export const textOnChange: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update pan ****", action.payload.value);
  emailId = action.payload.value;
};
