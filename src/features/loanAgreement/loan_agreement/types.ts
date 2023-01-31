export enum ACTION {
  REPAYMENT = "REPAYMENT",
  GO_BACK = "GO_BACK",
  OPEN_TAB = "OPEN_TAB",
  GO_TO_AUTOPAY = "GO_TO_AUTOPAY",
  POLL_AGREEMENT_STATUS = "POLL_AGREEMENT_STATUS",
  GO_TO_LOAN_AGREEMENT = "GO_TO_LOAN_AGREEMENT",
}
export type TestActionPayload = {};

export type LimitPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};
