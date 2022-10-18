import { RouteMap } from "@voltmoney/types";
import { phoneNumberMF } from "./features/phone_number";
import { otpVerifyMF } from "./features/otp_verify";
import { emailVerifyMF } from "./features/email_verify";
import { ROUTE } from "./routes";
import { emailMF } from "./features/enter_email";
import { panVerifyMF } from "./features/pan_verify";
import { panConfirmMF } from "./features/pan_confirm";
import { checkLimitMF } from "./features/check_limit";

export const ROUTE_MAP: RouteMap = {
  [ROUTE.PHONE_NUMBER]: phoneNumberMF,
  [ROUTE.OTP_VERIFY]: otpVerifyMF,
  [ROUTE.EMAIL_VERIFY]: emailVerifyMF,
  [ROUTE.ENTER_EMAIL]: emailMF,
  [ROUTE.KYC_PAN_VERIFICATION]: panVerifyMF,
  [ROUTE.PAN_CONFIRM_NAME]: panConfirmMF,
  [ROUTE.MF_PLEDGING]: checkLimitMF,
};
