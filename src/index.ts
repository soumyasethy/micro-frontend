import { onboardMF } from "./features/on_boarding";
import {RouteMap} from "@voltmoney/types";

export enum ROUTE {
  ON_BOARDING,
  MOBILE_NO_VERIFY,
  ENTER_OTP,
  EMAIL_VERIFY,
  PAN_VERIFY,
  PAN_CONFIRM,
}
export const ROUTE_MAP:RouteMap = {
  ON_BOARDING: onboardMF,
};
