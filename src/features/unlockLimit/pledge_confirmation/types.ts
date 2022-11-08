export enum ACTION {
    PLEDGE_CONFIRMATION = "PLEDGE_CONFIRMATION",
    BACK_BUTTON = "BACK_BUTTON"
  }

  
  export type OtpPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  