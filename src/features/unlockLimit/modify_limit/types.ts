import { StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  MODIFY_LIMIT = "MODIFY_LIMIT",
  BACK_BUTTON = "BACK_BUTTON",
  CONFIRM_CTA = "CONFIRM_CTA",
}

export type AssetsPayload = {
  value: string;
  widgetId: string;
  stepResponseObject?: StepResponseObject;
};


