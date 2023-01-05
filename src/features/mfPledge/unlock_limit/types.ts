export enum ACTION {
  UNLOCK_LIMIT = "UNLOCK_LIMIT",
  GET_MORE_MF_PORTFOLIO = "GET_MORE_MF_PORTFOLIO",
  REMOVE_GET_MORE_MF_PORTFOLIO = "REMOVE_GET_MORE_MF_PORTFOLIO",
  MODIFY_LIMIT = "MODIFY_LIMIT",
  NAV_NEXT = "NAV_NEXT",
  NAV_PORTFOLIO = "NAV_PORTFOLIO",
}

export type ContinuePayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};
export type GetMoreMfPortfolioPayload = { casList: AvailableCASItem[] };

export type LimitPayload = {
  value: StepResponseObject;
  widgetId: string;
  isResend?: boolean;
};

export type AvailableCASItem = {
  assetRepository: string;
  amcName: string;
  amcCode: string;
  folioNo: string;
  schemeCode: string;
  schemeName: string;
  isinNo: string;
  schemeType: string;
  totalAvailableUnits: number;
  fetchedOn: any;
  is_pledged: boolean;
  is_pledged_confirmed: boolean;
  pledgedUnits: any;
  pledgedOn: any;
  pledgeReferenceNo: any;
};

export type IsinLTVMap = { [key in string]: number };
export type IsinNAVMap = { [key in string]: number };

export type StepResponseObject = {
  applicationId: string;
  availableCreditAmount: number;
  requestedCreditAmount: number;
  approvedCreditAmount: number;
  processingFees: number;
  interestRate: number;
  loanTenureInMonths: number;
  isinLTVMap: IsinLTVMap;
  isinNAVMap: IsinNAVMap;
  availableCAS: AvailableCASItem[];
  tobePledgedPortfolio: any;
  pledgedPortfolio: any;
  casFetchDates: any;
  processingFeesBreakUp: any;
};
export type UpdateAvailableCASMap = { [key in string]: AvailableCASItem };
