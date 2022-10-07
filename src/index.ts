import { onBoardingMF } from "./features/phone_number";
import { RouteMap } from "@voltmoney/types";
import { signupMf } from "./features/signup";
import { loginMF } from "./features/otp_verify";

export enum ROUTE {
  ON_BOARDING = "ON_BOARDING",
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
  MOBILE_NO_VERIFY = "MOBILE_NO_VERIFY",
  ENTER_OTP = "ENTER_OTP",
  EMAIL_VERIFY = "EMAIL_VERIFY",
  PAN_VERIFY = "PAN_VERIFY",
  PAN_CONFIRM = "PAN_CONFIRM",
}
export const ROUTE_MAP: RouteMap = {
  [ROUTE.ON_BOARDING]: onBoardingMF,
  [ROUTE.SIGNUP]: signupMf,
  [ROUTE.LOGIN]: loginMF,
};
