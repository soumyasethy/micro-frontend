export const AnalyticsEventTracker = {
  borrower_sign_up: {
    "Event Name": "borrower_sign_up",
    "Event Type": "user initiated",
    "Screen Name": "Email Verification",
    Trigger: "When user provides email",
    Description: "New user sign up.",
  },
  borrower_mf_pull: {
    "Event Name": "borrower_mf_pull",
    "Event Type": "user initiated",
    "Screen Name": "MF Fetch",
    Trigger:
      "When portfolio is fetched, otp verification successful and we have some amount",
  },
  borrower_mf_pull_failed: {
    "Event Name": "borrower_mf_pull_failed",
    "Event Type": "user initiated",
    "Screen Name": "MF Fetch",
    Trigger:
      "When portfolio is fetched, otp verification successful and we got empty/null response",
  },
  borrower_mf_pledge_init: {
    "Event Name": "borrower_mf_pledge_init",
    "Event Type": "user initiated",
    "Screen Name": "MF Pledge",
    Trigger: "When user clicks on initiate pledge request.",
  },
  borrower_mf_pledge_complete: {
    "Event Name": "borrower_mf_pledge_complete",
    "Event Type": "user initiated",
    "Screen Name": "MF Pledge",
    Trigger: "OTP verification successful and pledge is complete.",
  },
  borrower_ckyc_complete: {
    "Event Name": "borrower_ckyc_complete",
    "Event Type": "system initiated",
    "Screen Name": "KYC Stepper",
    Trigger: "If CKYC_STEP is complete for the user",
  },
  borrower_kyc_complete: {
    "Event Name": "borrower_kyc_complete",
    "Event Type": "user initiated",
    "Screen Name": "KYC Summary",
    Trigger:
      "When user completes the KYC verification and click on KYC succesful modal",
  },
};

export const TextConstants = {
  "GENERIC_PROCEED_MESSAGE" : "Please click continue to proceed."
}

export enum QUERY_PARAMS {
  START_NEW = 'startnew',
  PARTNER_PLATFORM = 'partnerplatform',
  PLATFORM = 'platform',
  USER = 'user',
  REF = 'ref',
  PRIMARY_COLOR = 'primaryColor',
}

export enum POPUP_TARGET_NAME {
  AGREEMENT = "volt money",
  AUTOPAY = "volt money"
}