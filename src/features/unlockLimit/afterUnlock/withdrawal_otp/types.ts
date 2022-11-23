export enum ACTION {
  WITHDRAWAL_OTP = "WITHDRAWAL_OTP",
  RESEND_WITHDRAWAL_OTP = "RESEND_WITHDRAWAL_OTP",
  GO_BACK = "GO_BACK",
}

export type DisbursementOTPPayload = {
  value: string;
  disbursalAmount?:string;
  accountNumber?:string;
};
