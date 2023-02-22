export enum ACTION {
  TRANSACTION = "TRANSACTION",
  NAVIGATION = "NAVIGATION",
  EMAIL = "EMAIL",
  ENHANCE_LIMIT = "ENHANCE_LIMIT",
  MENU = "MENU",
}

export type EnhanceLimitPayload = {
  borrowerAccountId: string;
};

export type manageLimitPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

export type NavPayload = {
  value: number;
};
