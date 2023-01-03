export enum ACTION {
  REPAYMENT = "REPAYMENT",
  GO_BACK = "GO_BACK",
  LINK_POLL = "LINK_POLL",
  OPEN_TAB = "OPEN_TAB",
  POLL_MANDATE_STATUS = "POLL_AGREEMENT_STATUS",
  GO_LOAN_AGREEMENT = "GO_LOAN_AGREEMENT",
}
  export type TestActionPayload = {};
  
  export type LimitPayload = {
    value: string;
    widgetId: string;
  };