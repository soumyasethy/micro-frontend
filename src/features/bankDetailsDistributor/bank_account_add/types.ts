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