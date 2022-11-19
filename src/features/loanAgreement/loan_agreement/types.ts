export enum ACTION {
    REPAYMENT = "REPAYMENT",
    GO_BACK = "GO_BACK",
  }
  export type TestActionPayload = {};
  
  export type LimitPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };