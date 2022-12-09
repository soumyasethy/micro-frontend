export enum ACTION {
  NAVIGATION_SEARCH_IFSC = "NAVIGATION_SEARCH_IFSC",
  ONCHANGE_ACCOUNT_NUMBER = "ONCHANGE_ACCOUNT_NUMBER",
  ONCHANGE_IFSC_NUMBER = "ONCHANGE_IFSC_NUMBER",
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  CHANGE_BANK_GO_BACK = "CHANGE_BANK_GO_BACK",
  NAV_STEPPER = "NAV_STEPPER",
}
export type NavigationSearchIFSCActionPayload = {
  bankCode: string;
  bankName: string;
};
export type InputNumberActionPayload = { value: string };
