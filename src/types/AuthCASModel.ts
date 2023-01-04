export type AuthCASModel = {
  errorMessage?: null;
  status?: string;
  updatedApplicationObj?: UpdatedApplicationObj;
  stepResponseObject?: StepResponseObject;
  borrowerViewStepperMap?: BorrowerViewStepperMap;
  partnerViewStepperMap?: PartnerViewStepperMap;
};

export type BorrowerViewStepperMap = {
  BANK_VERIFICATION?: AgreementSign;
  KYC_VERIFICATION?: AgreementSign;
  AGREEMENT_SIGN?: AgreementSign;
  AUTOPAY_SETUP?: AgreementSign;
};

export type AgreementSign = {
  status?: ApplicationState;
  verticalDisplayName?: string;
  verticalDescription?: string;
  horizontalDisplayName?: string;
  order?: number;
};

export enum ApplicationState {
  Completed = "COMPLETED",
  InProgress = "IN_PROGRESS",
  NotStarted = "NOT_STARTED",
}

export type PartnerViewStepperMap = {
  BANK_VERIFICATION?: AgreementSign;
  BASIC_DETAILS?: AgreementSign;
  PLEDGE_PORTFOLIO?: AgreementSign;
  AGREEMENT_SIGN?: AgreementSign;
  KYC_VERIFICATION?: AgreementSign;
  FETCH_PORTFOLIO?: AgreementSign;
  SELECT_PORTFOLIO?: AgreementSign;
  AUTOPAY_SETUP?: AgreementSign;
};

export type StepResponseObject = {
  applicationId?: string;
  totalPortfolioAmount?: number;
  availableCreditAmount?: number;
  requestedCreditAmount?: number;
  approvedCreditAmount?: number;
  processingFees?: number;
  processingFeesBreakUp?: ProcessingFeesBreakUp;
  interestRate?: number;
  loanTenureInMonths?: number;
  isinLTVMap?: { [key: string]: number };
  isinNAVMap?: { [key: string]: number };
  repositoryAssetMetadataMap?: RepositoryAssetMetadataMap;
  availableCAS?: AvailableCA[];
  tobePledgedPortfolio?: any[];
  pledgedPortfolio?: any[];
  casFetchDates?: CasFetchDates;
};

export type AvailableCA = {
  assetRepository?: string;
  amcName?: null;
  amcCode?: string;
  folioNo?: string;
  schemeCode?: string;
  schemeName?: string;
  isinNo?: string;
  schemeType?: string;
  totalAvailableUnits?: number;
  fetchedOn?: null;
  is_pledged?: null;
  is_pledged_confirmed?: null;
  pledgedUnits?: null;
  pledgedOn?: null;
  pledgeReferenceNo?: null;
};

export type CasFetchDates = {
  KARVY?: number;
};

export type ProcessingFeesBreakUp = {};

export type RepositoryAssetMetadataMap = {
  KARVY?: Cams;
  CAMS?: Cams;
};

export type Cams = {
  availablePortfolioAmount?: number;
  approvedPortfolioAmount?: number;
  availableCreditAmount?: number;
  approvedCreditAmount?: number;
  casFetchDate?: number | null;
};

export type UpdatedApplicationObj = {
  applicationId?: string;
  accountId?: string;
  applicationType?: string;
  applicationState?: ApplicationState;
  applicationApprovalStatus?: null;
  creditAmount?: null;
  lenderAccountId?: string;
  partnerAccountId?: null;
  platformAccountId?: string;
  currentStepId?: string;
  stepStatusMap?: StepStatusMap;
  createdOn?: number;
  lastUpdatedOn?: number;
  completedOn?: null;
};

export type StepStatusMap = {
  KYC_PAN_VERIFICATION?: ApplicationState;
  KYC_DOCUMENT_UPLOAD?: ApplicationState;
  MANDATE_SETUP?: ApplicationState;
  CREDIT_APPROVAL?: ApplicationState;
  BANK_ACCOUNT_VERIFICATION?: ApplicationState;
  KYC_ADDITIONAL_DETAILS?: ApplicationState;
  AGREEMENT_SIGN?: ApplicationState;
  MF_FETCH_PORTFOLIO?: ApplicationState;
  KYC_CKYC?: ApplicationState;
  KYC_PHOTO_VERIFICATION?: ApplicationState;
  KYC_AADHAAR_VERIFICATION?: ApplicationState;
  MF_PLEDGE_PORTFOLIO?: ApplicationState;
  KYC_SUMMARY?: ApplicationState;
};
