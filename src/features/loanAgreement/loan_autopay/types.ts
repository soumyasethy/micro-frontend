export enum ACTION {
    AUTOPAY = "AUTOPAY",
    GO_BACK = "GO_BACK",
  }
  export type TestActionPayload = {};
  
  export type LimitPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };