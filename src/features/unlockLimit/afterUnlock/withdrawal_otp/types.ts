export enum ACTION {
    WITHDRAWAL_OTP = "WITHDRAWAL_OTP",
    GO_BACK = "GO_BACK"
  }

  export type OtpPledgePayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  

  