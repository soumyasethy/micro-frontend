import {BUILD_TYPE, getBuildType} from "../SharedPropsService";

export const AnalyticsEventTracker = {
  borrower_sign_up: {
    "Event Name": "borrower_sign_up",
    "Event Type": "user initiated",
    "Screen Name": "Email Verification",
    Trigger: "When user provides email",
    Description: "New user sign up.",
  },
  borrower_mf_pull: {
    "Event Name": "borrower_mf_pull",
    "Event Type": "user initiated",
    "Screen Name": "MF Fetch",
    Trigger:
      "When portfolio is fetched, otp verification successful and we have some amount",
  },
  borrower_mf_pull_failed: {
    "Event Name": "borrower_mf_pull_failed",
    "Event Type": "user initiated",
    "Screen Name": "MF Fetch",
    Trigger:
      "When portfolio is fetched, otp verification successful and we got empty/null response",
  },
  borrower_mf_pledge_init: {
    "Event Name": "borrower_mf_pledge_init",
    "Event Type": "user initiated",
    "Screen Name": "MF Pledge",
    Trigger: "When user clicks on initiate pledge request.",
  },
  borrower_mf_pledge_complete: {
    "Event Name": "borrower_mf_pledge_complete",
    "Event Type": "user initiated",
    "Screen Name": "MF Pledge",
    Trigger: "OTP verification successful and pledge is complete.",
  },
  borrower_ckyc_complete: {
    "Event Name": "borrower_ckyc_complete",
    "Event Type": "system initiated",
    "Screen Name": "KYC Stepper",
    Trigger: "If CKYC_STEP is complete for the user",
  },
  borrower_kyc_complete: {
    "Event Name": "borrower_kyc_complete",
    "Event Type": "user initiated",
    "Screen Name": "KYC Summary",
    Trigger:
      "When user completes the KYC verification and click on KYC succesful modal",
  },
};

export const TextConstants = {
  "GENERIC_PROCEED_MESSAGE" : "Please click continue to proceed."
}

export enum QUERY_PARAMS {
  START_NEW = 'startnew',
  PARTNER_PLATFORM = 'partnerplatform',
  PLATFORM = 'platform',
  USER = 'user',
  REF = 'ref',
  PRIMARY_COLOR = 'primaryColor',
  DASHBOARD_ACTIVE_ID = 'dashboardActiveId'
}

export enum ImportScriptSrc {
  DIGIO_SCRIPT="https://app.digio.in/sdk/v10/digio.js"
}

export enum DigioKycStatus {
  CREATED = "CREATED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED"
}

export enum DigioDocsStatus {
  REQUESTED = "REQUESTED",
}

export enum POPUP_TARGET_NAME {
  AGREEMENT = "volt money",
  AUTOPAY = "volt money"
}

export enum CreditApplicationStepId {
  MF_FETCH_PORTFOLIO = 'MF_FETCH_PORTFOLIO',
  MF_PLEDGE_PORTFOLIO = 'MF_PLEDGE_PORTFOLIO',
  KYC_CKYC = 'KYC_CKYC',
  KYC_AADHAAR_VERIFICATION = 'KYC_AADHAAR_VERIFICATION',
  KYC_DOCUMENT_UPLOAD = 'KYC_DOCUMENT_UPLOAD',
  KYC_DOCUMENT_UPLOAD_POI = 'KYC_DOCUMENT_UPLOAD_POI',
  KYC_DOCUMENT_UPLOAD_POA = 'KYC_DOCUMENT_UPLOAD_POA',
  KYC_PAN_VERIFICATION = 'KYC_PAN_VERIFICATION',
  KYC_PHOTO_VERIFICATION = 'KYC_PHOTO_VERIFICATION',
  KYC_DIGIO_DIGILOCKER = 'KYC_DIGIO_DIGILOCKER',
  DIGIO_AGREEMENT_SIGN = 'DIGIO_AGREEMENT_SIGN',
  DIGIO_MANDATE_SIGN = 'DIGIO_MANDATE_SIGN',
  KYC_SUMMARY = 'KYC_SUMMARY',
  KYC_ADDITIONAL_DETAILS = 'KYC_ADDITIONAL_DETAILS',
  AGREEMENT_SIGN = 'AGREEMENT_SIGN',
  BANK_ACCOUNT_VERIFICATION = 'BANK_ACCOUNT_VERIFICATION',
  MANDATE_SETUP = 'MANDATE_SETUP',
  CREDIT_APPROVAL = 'CREDIT_APPROVAL',
  COMMUNICATION = 'COMMUNICATION',
}

export const stepIdToNameMap = {
  MF_FETCH_PORTFOLIO: "Pending MF pull",
  MF_PLEDGE_PORTFOLIO: "Pending MF pledge",
  KYC_DOCUMENT_UPLOAD_POI: "MF pledge done, Pending KYC",
  KYC_DOCUMENT_UPLOAD_POA: "MF pledge done, Pending KYC",
  KYC_PAN_VERIFICATION: "Pending PAN and other details",
  KYC_SUMMARY: "MF pledge done, Pending KYC",
  KYC_ADDITIONAL_DETAILS: "MF pledge done, Pending KYC",
  AGREEMENT_SIGN: "Pending agreement",
  BANK_ACCOUNT_VERIFICATION: "Pending bank account verification",
  MANDATE_SETUP: "Pending autopay setup"
}

export enum CreditApplicationState {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED ='COMPLETED',
  NOT_STARTED = 'NOT_STARTED'
}

export const PartnerLink =
    getBuildType() === BUILD_TYPE.PARTNER_PRODUCTION
        ? 'https://voltmoney.in/partner/'
        : 'https://staging.voltmoney.in/partner/';

export const AppLink =
    getBuildType() === BUILD_TYPE.BORROWER_PRODUCTION
        ? 'https://app.voltmoney.in/'
        : 'https://app.staging.voltmoney.in/';

export const PARTNER_CACHE_EXPIRE_TIME = 1;