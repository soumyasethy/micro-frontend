import { onBoarding } from "./features/on_boarding";

export enum ROUTE {
  ON_BOARDING,
  MOBILE_NO_VERIFY,
  ENTER_OTP,
  EMAIL_VERIFY,
  PAN_VERIFY,
  PAN_CONFIRM,
}
export const RouteMap = {
  ON_BOARDING: onBoarding,
};
