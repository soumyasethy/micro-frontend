export enum ACTION {
    REPAYMENT = "REPAYMENT",
    GO_BACK = "GO_BACK",
    LINK_POLL = "LINK_POLL",
  }
  export type TestActionPayload = {};
  
  export type LimitPayload = {
    value: string;
    widgetId: string;
  };