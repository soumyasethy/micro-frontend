import { StepperStateToken } from "@voltmoney/schema";

export enum ACTIONS {
  LoginWithCognitoAmplify = "LoginWithCognitoAmplify",
  LoginWithCognito = "LoginWithCognito",
  OTP_NUMBER = "OTP_NUMBER",
  RESEND_OTP_NUMBER = "RESEND_OTP_NUMBER",
  GO_BACK = "GO_BACK",
}
export type OTPPayload = {
  value: string;
  widgetId: string;
};
export type LoginAction = {
  username: string;
  password?: string;
  isWhatsappEnabled?: boolean;
};
export type ResendOtp = {
  phoneNumber: string;
};

export type Authentication = {
  jwt?: string;
  message: string;
  status: string;
};
//***************** User Model ***********************//

export interface User {
  isLoggedIn?: boolean;
  user?: UserClass;
  linkedBorrowerAccounts?: LinkedBorrowerAccount[];
  linkedPartnerAccounts?: any[];
  linkedPlatformAccounts?: LinkedPlatformAccount[];
  linkedApplications?: LinkedApplication[];
  linkedCredits?: LinkedCreditItem[];
}
export interface LinkedCreditItem {
  creditId: string;
  lenderCreditId: string;
  applicationId: string;
  accountId: string;
  creditStatus: string;
  marginCallStatus: string;
  originalStartDate: number;
  currentTermStartDate: number;
  tenureInDays: number;
  renewalDate: number;
  totalValueOfAssetsPledged: number;
  approvedCreditAmount: number;
  actualLoanAmount: number;
  availableCreditAmount: number;
  processingCharges: number;
  processingChargeDetails: string;
  currentApplicableInterestRate: number;
  outstandingInterestDue: any;
  chargesDue: any;
  penalInterestDue: any;
  creditType: string;
  platformAccountId: string;
  partnerAccountId: null;
  lendingPartnerId: string;
  createdOn: number;
  lastUpdatedOn: number;
}

export interface LinkedApplication {
  applicationId?: string;
  externalId?: string;
  accountId?: string;
  applicationType?: string;
  applicationState?: string;
  applicationApprovalStatus?: string;
  creditAmount?: any;
  currentStepId?: string;
  stepStatusMap?: StepStatusMap;
  createdOn?: number;
  lastUpdatedOn?: number;
  completedOn?: any;
}

export interface StepStatusMap {
  KYC_PHOTO_VERIFICATION?: StepperStateToken;
  KYC_SUMMARY?: StepperStateToken;
  MF_PLEDGING?: StepperStateToken;
  CREDIT_APPROVAL?: StepperStateToken;
  KYC_AADHAAR_VERIFICATION?: StepperStateToken;
  MANDATE_SETUP?: StepperStateToken;
  KYC_CKYC?: StepperStateToken;
  KYC_PAN_VERIFICATION?: StepperStateToken;
  AGREEMENT_SIGN?: StepperStateToken;
  BANK_ACCOUNT_VERIFICATION?: StepperStateToken;
  KYC_ADDITIONAL_DETAILS?: StepperStateToken;
}

export interface LinkedBorrowerAccount {
  "@type"?: string;
  accountId?: string;
  accountState?: string;
  isInternal?: boolean;
  accountTier?: string;
  addedOnTimeStamp?: number;
  lastUpdatedTimeStamp?: number;
  accountHolderPhoneNumber?: string;
  accountHolderEmail?: string;
  accountHolderPAN?: string;
  isKYCVerified?: boolean;
  isBankAccountVerified?: boolean;
}

export interface LinkedPlatformAccount {
  "@type"?: string;
  accountId?: string;
  accountState?: string;
  isInternal?: boolean;
  accountTier?: string;
  addedOnTimeStamp?: number;
  lastUpdatedTimeStamp?: number;
  platformName?: string;
  platformLogoImgSrc?: string;
  platformCode?: string;
  platformAgreementIdUri?: string;
  address?: string;
}

export interface UserClass {
  userId?: string;
  phoneNumber?: string;
  emailId?: string;
  fullName?: string;
  gender?: string;
  address?: string;
  onboardingPartnerCode?: string;
  onboardingRelationshipManagerCode?: string;
  state?: string;
  externalId?: string;
  isInternal?: string;
  addedOnTimeStamp?: number;
  lastUpdatedTimeStamp?: number;
}
