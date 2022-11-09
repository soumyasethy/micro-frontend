export enum ACTION {
  PLEDGE_VERIFY = "PLEDGE_VERIFY",
}

export type VerifyPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

