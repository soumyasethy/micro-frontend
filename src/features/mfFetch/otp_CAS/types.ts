export enum ACTIONS {
  AUTH_CAS = "AUTH_CAS",
  OTP_NUMBER = "OTP_NUMBER",
  RESEND_OTP_AUTH_CAS = "RESEND_OTP_AUTH_CAS",
  GO_BACK = "GO_BACK",
  NEXT_ROUTE="NEXT_ROUTE",
  MY_ROUTE="MY_ROUTE"
}
export type AuthCASPayload = {
  applicationId: string;
  value: string;
  assetRepository: string;
};
export type ResendOtp = {
  phoneNumber: string;
};
