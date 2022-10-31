export enum ACTION {
  SEARCH_BANK = "SEARCH_BANK",
  NAV_IFSC_SEARCH_BRANCH_INFO = "NAV_IFSC_SEARCH_BRANCH_INFO",
}
export type SearchActionPayload = { value: string; targetWidgetId: string };
export type NavSearchIfscBranchInfoActionPayload = { value: string };
