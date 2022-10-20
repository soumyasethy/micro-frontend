export enum ACTION {
  FETCH_MY_PORTFOLIO = "FETCH_MY_PORTFOLIO",
  EDIT_PAN = "EDIT_PAN",
  EDIT_EMAIL = "EDIT_EMAIL",
  EDIT_MOBILE_NUMBER = "EDIT_MOBILE_NUMBER",
}
export type PanEditPayload = {
  applicationId: string;
  targetRoute?: string;
  panNumber?: string;
};
export type FetchPortfolioPayload = {
  applicationId: string;
  assetRepository: string;
  emailId: string;
  panNumber: string;
  phoneNumber: string;
};
