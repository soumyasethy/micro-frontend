export enum ACTION {
  FETCH_MY_PORTFOLIO,
}
export type FetchPortfolioPayload = {
  applicationId: string;
  assetRepository: string;
  emailId: string;
  panNumber: string;
  phoneNumber: string;
};
