export enum ACTION {
  PLEDGE_VERIFY = "PLEDGE_VERIFY",
  RESEND_OTP_NUMBER = "RESEND_OTP_NUMBER",
  GO_BACK = "GO_BACK",
  NAV_NEXT = "NAV_NEXT",
}

export type OtpPledgePayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
  assetRepository?: string;
};
