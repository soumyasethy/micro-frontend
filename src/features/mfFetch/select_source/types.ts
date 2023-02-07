export enum ACTIONS {
  AUTH_CAS = "AUTH_CAS",
  OTP_NUMBER = "OTP_NUMBER",
  RESEND_OTP_AUTH_CAS = "RESEND_OTP_AUTH_CAS",
  GO_BACK = "GO_BACK",
  NAV_TO_FETCH = "NAV_TO_FETCH",
  TOGGLE_RADIO = "TOGGLE_RADIO",
  CONFIRM = "CONFIRM",
}
export type AuthCASPayload = {
  applicationId: string;
  value: string;
  assetRepository: string;
};
export type ResendOtp = {
  phoneNumber: string;
};
