import { User } from "./features/otp_verify/types";

export const mockUser = {
  isLoggedIn: true,
  user: {
    userId: "936dca66-09a7-4e4f-a4a2-55a78dd337e4",
    phoneNumber: "+918763666620",
    emailId: null,
    consent: "Y",
    fullName: null,
    gender: null,
    address: null,
    onboardingPartnerCode: null,
    onboardingRelationshipManagerCode: null,
    state: "ACTIVE",
    externalId: null,
    isInternal: null,
    addedOnTimeStamp: 1666326218162,
    lastUpdatedTimeStamp: 1666326218272,
  },
  linkedBorrowerAccounts: [
    {
      "@type": "Borrower",
      accountId: "e6a7045c-3cac-47a2-bf3f-fb2e43c5f713",
      accountState: "ACTIVE",
      isInternal: false,
      accountTier: "BASIC",
      addedOnTimeStamp: 1666326218301,
      lastUpdatedTimeStamp: 1666329117103,
      accountHolderPhoneNumber: "+918763666620",
      accountHolderEmail: "sethy.soumyaranjan@gmail.com",
      accountHolderPAN: "EDZPS7363L",
      isKYCVerified: null,
      isBankAccountVerified: null,
    },
  ],
  linkedPartnerAccounts: [],
  linkedPlatformAccounts: [
    {
      "@type": "Platform",
      accountId: "6a8d1b14-61fc-4b30-ad07-de4052b4f295",
      accountState: "ACTIVE",
      isInternal: false,
      accountTier: "BASIC",
      addedOnTimeStamp: 1665751958715,
      lastUpdatedTimeStamp: 1665751959014,
      platformName: "Platform 1",
      platformLogoImgSrc: "wGTIRwOTOncrw2GIstss",
      platformCode: "VOLT_MOBILE_APP",
      platformAgreementIdUri: null,
      address: "UFdIMRVvZaJkUamfyCYoiGHaHcmSdA",
    },
  ],
  linkedApplications: [
    {
      applicationId: "24214830-1dd8-4c10-96a0-edbc48fdb339",
      externalId: null,
      accountId: "e6a7045c-3cac-47a2-bf3f-fb2e43c5f713",
      applicationType: "CREDIT_AGAINST_SECURITIES_BORROWER",
      applicationState: "IN_PROGRESS",
      applicationApprovalStatus: null,
      creditAmount: null,
      partnerAccountId: null,
      platformAccountId: "6a8d1b14-61fc-4b30-ad07-de4052b4f295",
      currentStepId: "MF_PLEDGING",
      stepStatusMap: {
        MANDATE_SETUP: "NOT_STARTED",
        KYC_AADHAAR_VERIFICATION: "NOT_STARTED",
        MF_PLEDGING: "NOT_STARTED",
        AGREEMENT_SIGN: "NOT_STARTED",
        BANK_ACCOUNT_VERIFICATION: "NOT_STARTED",
        KYC_PHOTO_VERIFICATION: "NOT_STARTED",
        CREDIT_APPROVAL: "NOT_STARTED",
        KYC_PAN_VERIFICATION: "IN_PROGRESS",
        KYC_CKYC: "NOT_STARTED",
      },
      createdOn: 1666326218863,
      lastUpdatedOn: 1666329194353,
      completedOn: null,
    },
  ],
  linkedCredits: [],
};

type GlobalProps = {
  user: User;
  access_token: string;
};

let _globalProps: GlobalProps = {
  user: {},
  access_token: "",
};

async function setGlobalProps(props: GlobalProps) {
  _globalProps = await props;
}

function getPropsValue(key?: string) {
  if (_globalProps && key) {
    return _globalProps[key];
  }
  return null;
}
async function setUser(props: User) {
  _globalProps.user = await props;
}

function getUser() {
  if (_globalProps && _globalProps.user) {
    return mockUser; //_globalProps.user;
  }
  return null;
}
async function setToken(access_token: string) {
  _globalProps.access_token = access_token;
}

function getToken() {
  if (_globalProps && _globalProps.access_token) {
    return _globalProps.access_token;
  }
  return null;
}

export default {
  setGlobalProps,
  getPropsValue,
  setUser,
  getUser,
  setToken,
  getToken,
};
