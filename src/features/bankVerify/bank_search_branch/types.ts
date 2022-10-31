export enum ACTION {
  ON_SELECT_IFSC = "ON_SELECT_IFSC",
  SEARCH_IFSC_ACTION = "SEARCH_IFSC_ACTION",
}
export type IFSCCodePayload = { ifscCode: string };
export type IFSCSearchActionPayload = { bankCode: string; value: string };
