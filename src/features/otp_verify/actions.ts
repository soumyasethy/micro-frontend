import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload, ResendOtp, SignInUserSession } from "./types";
import { Auth } from "aws-amplify";
import { ROUTE } from "../../routes";
import { InputStateToken } from "@voltmoney/schema";
import { api } from "../../configs/api";
let otp;
export const loginCognito: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  console.warn(
    "using otp: ",
    otp,
    " session-->",
    action.payload.session,
    " otp-->",
    action.payload.value
  );
  if (action.payload.value.length !== 6) {
    console.warn("do nothing....");
  }
  try {
    const response: { signInUserSession: SignInUserSession } =
      await Auth.sendCustomChallengeAnswer(
        action.payload.session,
        action.payload.value
      );
    console.warn(
      "aws accessToken: --->",
      response.signInUserSession.accessToken
    );
    if (response.signInUserSession.accessToken) {
      await setDatastore(action.routeId, action.payload.widgetId, {
        state: InputStateToken.SUCCESS,
      });
      await navigate(ROUTE.EMAIL_VERIFY);
    } else {
      console.warn("Something went wrong");
      await setDatastore(action.routeId, action.payload.widgetId, {
        state: InputStateToken.ERROR,
      });
    }
  } catch (e) {
    console.warn("aws error: ", e);
    await setDatastore(action.routeId, action.payload.widgetId, {
      state: InputStateToken.ERROR,
    });
  }
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const resendOtp: ActionFunction<ResendOtp> = async (
  action,
  _datastore,
  { network }
) => {
  console.warn("resend otp number ->", action.payload.phoneNumber);
  const response = await network.post(api.sendOTP, {
    phoneNumber: `${action.payload.phoneNumber}`,
  });
  console.warn("resend otp response ->", response);
};
