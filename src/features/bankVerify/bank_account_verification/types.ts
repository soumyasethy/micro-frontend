export enum ACTION {
  TOGGLE_SELECT = "TOGGLE_SELECT",
  TRIGGER_CTA = "TRIGGER_CTA",
  GO_ADD_ACCOUNT = "GO_ADD_ACCOUNT",
  GO_BACK = "GO_BACK",
  GO_NEXT = "GO_NEXT",
}
export type BAVVerifyActionPayload = {
  applicationId: string;
  // bankAccountDetails: {
  //   bankAccountNumber: string;
  //   bankIfscCode: string;
  // };
};
export type ToggleActionPayload = {
  value: string;
  targetWidgetId: string;
  bankAccountNumber: string;
  bankIfscCode: string;
};

export type NextNavPayload = {
  currentStepId: string;
};
