export enum ACTION {
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  DISABLE_CTA = "DISABLE_CTA",
  ENABLE_CTA = "ENABLE_CTA",
  AADHAR_NUMBER = "AADHAR_NUMBER",
  GO_BACK = "GO_BACK",
  RESEND_OTP = "RESEND_OTP",
}
export type EnableDisableCTA = {
  value: boolean;
  targetWidgetId: string;
};
export type AadharInputPayload = {
  value: string;
  widgetID: string;
};
export type AadharVerifyPayload = {
  applicationId: "string";
  otp: "string";
};
