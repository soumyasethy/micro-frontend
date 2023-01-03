export enum ACTION {
  REPAYMENT = "REPAYMENT",
  GO_BACK = "GO_BACK",
  OPEN_TAB = "OPEN_TAB",
  GO_TO_DASHBOARD = "GO_TO_DASHBOARD",
  POLL_AGREEMENT_STATUS = "POLL_AGREEMENT_STATUS",
}
export type TestActionPayload = {};

export type LimitPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};
