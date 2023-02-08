import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  PLEDGE_CONFIRMATION = "PLEDGE_CONFIRMATION",
  BACK_BUTTON = "BACK_BUTTON",
  NAV_TO_FAQ = "NAV_TO_FAQ",
  SEND_OTP_FOR_PLEDGE_CONFIRM = "SEND_OTP_FOR_PLEDGE_CONFIRM",
}
export type OtpPayloadForPledgeConfirm = {
  portFolioArray: Array<AvailableCASItem>;
  value: StepResponseObject;
  widgetId: string;
  isResend?: boolean;
};
