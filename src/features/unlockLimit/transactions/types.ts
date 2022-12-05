import { StepResponseObject } from "../unlock_limit/types";

export enum ACTION {
  TRANSACTION = "TRANSACTION",
  NAVIGATION = "NAVIGATION",
  EMAIL = "EMAIL",
  MENU = "MENU"
}

export type transactionPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

export type NavPayload = {
  value: number;
};

