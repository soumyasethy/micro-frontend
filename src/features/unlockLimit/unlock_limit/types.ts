export enum ACTION {
  UNLOCK_LIMIT = "UNLOCK_LIMIT",
  MODIFY_LIMIT = "MODIFY_LIMIT",
}


export type ContinuePayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

export type LimitPayload = {
  value: AvailableCASItem[];
  widgetId: string;
  isResend?: boolean;
};

export type AvailableCASItem = {
  "assetRepository": string,
  "amcName": string,
  "amcCode": string,
  "folioNo": string,
  "schemeCode": string,
  "schemeName": string,
  "isinNo": string,
  "schemeType": string,
  "totalAvailableUnits": number,
  "fetchedOn": any,
  "is_pledged": any,
  "is_pledged_confirmed": any,
  "pledgedUnits": any,
  "pledgedOn": any,
  "pledgeReferenceNo": any
}

export type StepResponseObject = {
  "applicationId": string,
  "availableCreditAmount": number,
  "requestedCreditAmount": number,
  "approvedCreditAmount": number,
  "processingFees": number,
  "interestRate": number,
  "loanTenureInMonths": number,
  "isinLTVMap": {
    "INF201410": number,
    "INF846K01EH3": number
  },
  "isinNAVMap": {
    "INF201410": number,
    "INF846K01EH3": number
  },
  "availableCAS": AvailableCASItem[],
  "tobePledgedPortfolio": any,
  "pledgedPortfolio": any,
  "casFetchDates": any
}


