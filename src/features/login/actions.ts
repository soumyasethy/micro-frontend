import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload } from "./types";
import { Auth } from "aws-amplify";
let otp;
export const loginCognito: ActionFunction<LoginAction> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  try {
    const response = await Auth.sendCustomChallengeAnswer(
      action.payload.session,
      otp
    );
    console.warn("auth **->", response);
  } catch (e) {
    console.warn("error: ", "loginCognito ->", e);
  }
};

export const otpOnChange: ActionFunction<OTPPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  otp = action.payload.value;
};
