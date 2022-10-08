import { RouteMap } from "@voltmoney/types";
import { phoneNumberMF } from "./features/phone_number";
import { otpVerifyMF } from "./features/otp_verify";
import { emailVerifyMF } from "./features/email_verify";
import { ROUTE } from "./routes";

export const ROUTE_MAP: RouteMap = {
  [ROUTE.PHONE_NUMBER]: phoneNumberMF,
  [ROUTE.OTP_VERIFY]: otpVerifyMF,
  [ROUTE.EMAIL_VERIFY]: emailVerifyMF,
};
