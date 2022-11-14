import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  PLEDGE_CONFIRMATION = "PLEDGE_CONFIRMATION",
  BACK_BUTTON = "BACK_BUTTON"
}
export type OtpPayload = {
  value: StepResponseObject;
  widgetId: string;
  isResend?: boolean;
};



