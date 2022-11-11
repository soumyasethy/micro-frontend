export enum ACTION {
    WITHDRAWAL_SUCCESS = "WITHDRAWAL_SUCCESS",
    GO_BACK = "GO_BACK"
  }

  export type OtpPledgePayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  

  