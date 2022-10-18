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
export interface SignInUserSession {
  accessToken: AccessToken;
  clockDrift: number;
  idToken: IDToken;
  refreshToken: RefreshToken;
}

export interface AccessToken {
  jwtToken: string;
  payload: AccessTokenPayload;
}

export interface AccessTokenPayload {
  auth_time: number;
  client_id: string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  scope: string;
  sub: string;
  token_use: string;
  username: string;
}

export interface IDToken {
  jwtToken: string;
  payload: IDTokenPayload;
}

export interface IDTokenPayload {
  aud: string;
  auth_time: number;
  "cognito:username": string;
  "custom:isWhatsappEnabled": string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  token_use: string;
}

export interface RefreshToken {
  token: string;
}

//***************** User Model ***********************//

export interface User {
  isLoggedIn?: boolean;
  user?: UserClass;
  linkedBorrowerAccounts?: LinkedBorrowerAccount[];
  linkedPartnerAccounts?: any[];
  linkedPlatformAccounts?: LinkedPlatformAccount[];
  linkedApplications?: LinkedApplication[];
  linkedCredits?: any[];
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
  KYC_PHOTO_VERIFICATION?: string;
  MF_PLEDGING?: string;
  CREDIT_APPROVAL?: string;
  KYC_AADHAAR_VERIFICATION?: string;
  MANDATE_SETUP?: string;
  KYC_CKYC?: string;
  KYC_PAN_VERIFICATION?: string;
  AGREEMENT_SIGN?: string;
  BANK_ACCOUNT_VERIFICATION?: string;
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
