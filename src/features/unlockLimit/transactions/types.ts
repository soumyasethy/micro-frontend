import { StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  TRANSACTION = "TRANSACTION",
  EMAIL = "EMAIL"
}

export type transactionPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

