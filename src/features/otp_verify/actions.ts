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
export const resendOtp: ActionFunction<LoginAction> = async (
  action,
  _datastore,
  {}
) => {
  await Auth.signIn(action.payload.username)
    .then(async (response: any) => {
      console.warn("AWS response[SignIn]", response);
    })
    .catch(async (err) => {
      console.warn("AWS Error", err);
      if ((err.code = "UserNotFoundException")) {
        await Auth.signUp({
          username: action.payload.username,
          password: action.payload.password,
          attributes: {
            "custom:isWhatsappEnabled": action.payload.isWhatsappEnabled,
          },
        }).then((response) => console.warn("AWS response[SignUp]", response));
      }
    });
};
