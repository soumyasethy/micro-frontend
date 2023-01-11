export enum ACTION {
  ONCHANGE_BANK_NAME = "ONCHANGE_BANK_NAME",
  ONCHANGE_ACCOUNT_NUMBER = "ONCHANGE_ACCOUNT_NUMBER",
  ONCHANGE_CONFIRM_ACCOUNT_NUMBER = "ONCHANGE_CONFIRM_ACCOUNT_NUMBER",
  NAVIGATION_SEARCH_IFSC = "NAVIGATION_SEARCH_IFSC",
  NAVIGATION_SEARCH_BANK = "NAVIGATION_SEARCH_BANK",
  ONCHANGE_IFSC = "ONCHANGE_IFSC",
  ONCHANGE_BANK_DETAILS="ONCHANGE_BANK_DETAILS",
  ONCHANGE_CONFIRMACCOUNT_NUMBER="ONCHANGE_CONFIRMACCOUNT_NUMBER",
  ONCHANGE_IFSC_DETAILS="ONCHANGE_IFSC_DETAILS",
  ONCHANGE_IFSC_NUMBER = "ONCHANGE_IFSC_NUMBER",
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  CHANGE_BANK_GO_BACK = "CHANGE_BANK_GO_BACK",
  NAV_STEPPER = "NAV_STEPPER",
  GO_NEXT = "GO_BACK",
  SAVE = "SAVE",
  SHARE = "SHARE",
  NEXT_ROUTE = "NEXT_ROUTE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
}
export type NavigationSearchIFSCActionPayload = {
  bankCode: string;
  bankName: string;
};
export type InputNumberActionPayload = { 
  value: string;
  widgetId: string; 
};
export type BAVVerifyActionPayload = {
  applicationId: string;
};

export type InputPayload = {
  value: string;
  widgetId: string;
};

 export type updatedApplicationObj = {
  applicationId: string,
  accountId: string,
  applicationType: string,
  applicationState: string,
  applicationApprovalStatus: any,
  creditAmount: any,
  lenderAccountId: string,
  partnerAccountId: string,
  platformAccountId: string,
  currentStepId: string,
  stepStatusMap: {
      KYC_AADHAAR_VERIFICATION: string,
      KYC_ADDITIONAL_DETAILS: string,
      KYC_PAN_VERIFICATION: string,
      MF_PLEDGE_PORTFOLIO: string,
      KYC_PHOTO_VERIFICATION: string,
      AGREEMENT_SIGN: string,
      MF_FETCH_PORTFOLIO: string,
      BANK_ACCOUNT_VERIFICATION: string,
      KYC_SUMMARY: string,
      KYC_CKYC: string,
      MANDATE_SETUP: string,
      KYC_DOCUMENT_UPLOAD: string,
      CREDIT_APPROVAL: string
  }
}