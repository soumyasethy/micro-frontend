export enum ACTION {
    ON_SAVE = "ON_SAVE",
    ON_SKIP = "ON_SKIP",
    GO_BACK = "GO_BACK",
    SHARE = "SHARE",
    GO_CAMS = "GO_CAMS",
    GO_KARVY = "GO_KARVY",
    GO_OPERATIONAL = "GO_OPERATIONAL"
  }

  export type AmountPayload = {
    value: string;
  };

  export type RepositoryPayload = {
    value: string;
  };
  
  
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

