export enum ACTION {
  TRANSACTION = "TRANSACTION",
  NAVIGATION = "NAVIGATION",
  EMAIL = "EMAIL",
  MENU = "MENU"
}

export type manageLimitPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

export type NavPayload = {
  value: number;
};

