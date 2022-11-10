export enum ACTION {
    PLEDGE_VERIFY = "PLEDGE_VERIFY",
    RESEND_OTP_NUMBER = "RESEND_OTP_NUMBER"
  }

  export type OtpPledgePayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  

  