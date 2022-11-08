export enum ACTION {
  ON_SELECT_IFSC = "ON_SELECT_IFSC",
  CLEAR_SEARCH = "CLEAR_SEARCH",
  SEARCH_IFSC_ACTION = "SEARCH_IFSC_ACTION",
}
export type IFSCCodePayload = { ifscCode: string };
export type IFSCSearchActionPayload = { bankCode: string; value: string };
