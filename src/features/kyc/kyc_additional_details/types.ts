export enum ACTION {
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  DISABLE_CTA = "DISABLE_CTA",
  ENABLE_CTA = "ENABLE_CTA",
  AADHAR_NUMBER = "AADHAR_NUMBER",
  GO_BACK = "GO_BACK",
}
export type EnableDisableCTA = {
  value: boolean;
  targetWidgetId: string;
};
export type InputPayload = {
  value: string;
  widgetID: string;
};
enum MARITAL_STATUS {
  DIVORCED = "DIVORCED",
  MARRIED = "MARRIED",
  NOT_MARRIED = "NOT_MARRIED",
}

export type KycAdditionalDetailsPayload = {
  fatherFirstName: string;
  fatherLastName: string;
  martialStatus: MARITAL_STATUS;
  motherFirstName: string;
  motherLastName: string;
  qualification: string; //enum
};
