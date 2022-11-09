export enum ACTION {
    PLEDGE_VERIFY = "PLEDGE_VERIFY",
  }

  export type OtpPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  