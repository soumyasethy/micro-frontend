import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  PLEDGE_CONFIRMATION = "PLEDGE_CONFIRMATION",
  BACK_BUTTON = "BACK_BUTTON",
  NAV_TO_FAQ = "NAV_TO_FAQ",
}
export type OtpPayloadForPledgeConfirm = {
  value: StepResponseObject;
  widgetId: string;
  isResend?: boolean;
};



