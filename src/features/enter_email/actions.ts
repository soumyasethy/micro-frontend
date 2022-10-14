import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** using emailId ****", emailId);
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email ****", action.payload.value);
  emailId = action.payload.value;
};
