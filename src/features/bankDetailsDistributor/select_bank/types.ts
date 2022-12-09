export enum ACTION {
  GO_BACK = "GO_BACK",
  SEARCH_BANK = "SEARCH_BANK",
  NAV_IFSC_SEARCH_BRANCH_INFO = "NAV_IFSC_SEARCH_BRANCH_INFO",
}
export type SearchActionPayload = {
  value: string;
  targetWidgetId: string;
  bankRepo: {
    ALLBANKS: { [key in string]: string };
    POPULAR: { [key in string]: string };
  };
};
export type NavSearchIfscBranchInfoActionPayload = {
  value: string;
  bankRepo: {
    ALLBANKS: { [key in string]: string };
    POPULAR: { [key in string]: string };
  };
};
