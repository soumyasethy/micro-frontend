import { phoneNumberMF } from "./features/phone_number";
import { RouteMap } from "@voltmoney/types";
import { emailVerifyMF } from "./features/email_verify";
import { otpVerifyMF } from "./features/otp_verify";

export enum ROUTE {
  PHONE_NUMBER = "PHONE_NUMBER",
  OTP_VERIFY = "OTP_VERIFY",
  EMAIL_VERIFY = "EMAIL_VERIFY",
}
export const ROUTE_MAP: RouteMap = {
  [ROUTE.PHONE_NUMBER]: phoneNumberMF,
  [ROUTE.OTP_VERIFY]: otpVerifyMF,
  [ROUTE.EMAIL_VERIFY]: emailVerifyMF,
};
