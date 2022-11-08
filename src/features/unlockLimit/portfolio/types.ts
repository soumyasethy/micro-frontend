export enum ACTION {
    PORTFOLIO = "PORTFOLIO",
    BACK_BUTTON = "BACK_BUTTON"
  }

  
  export type OtpPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  