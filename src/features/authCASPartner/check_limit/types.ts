export enum ACTION {
  FETCH_MY_PORTFOLIO = "FETCH_MY_PORTFOLIO",
  EDIT_PAN = "EDIT_PAN",
  EDIT_EMAIL = "EDIT_EMAIL",
  EDIT_MOBILE_NUMBER = "EDIT_MOBILE_NUMBER",
  GO_BACK = "GO_BACK"
}
export type PanEditPayload = {
  applicationId: string;
  targetRoute?: string;
  value?: string;
};

export type InputPayload = {
  value: string;
  widgetId: string;
};

export type FetchPortfolioPayload = {
  applicationId: string;
  assetRepository: string;
  emailId: string;
  panNumber: string;
  phoneNumber: string;
};
