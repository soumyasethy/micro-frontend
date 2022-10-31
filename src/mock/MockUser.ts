// @ts-nocheck

import { User } from "../features/login/otp_verify/types";

export const MockUser: User = {
  isLoggedIn: true,
  user: {
    userId: "cc6b7ba3-ebb8-42dd-bd91-57b6a6171920",
    phoneNumber: "+918763862950",
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
    addedOnTimeStamp: 1667039105747,
    lastUpdatedTimeStamp: 1667189226462,
  },
  linkedBorrowerAccounts: [
    {
      "@type": "Borrower",
      accountId: "e5f1a245-1099-4f37-8c4a-8108e437a3ed",
      accountState: "ACTIVE",
      isInternal: false,
      accountTier: "BASIC",
      addedOnTimeStamp: 1667189226479,
      lastUpdatedTimeStamp: 1667189226479,
      accountHolderPhoneNumber: "+918763862950",
      accountHolderEmail: null,
      accountHolderPAN: null,
      isKYCVerified: null,
      isBankAccountVerified: null,
    },
  ],
  linkedPartnerAccounts: [],
  linkedPlatformAccounts: [],
  linkedApplications: [
    {
      applicationId: "4d696db9-4bd7-412d-8405-17b44792a5e8",
      externalId: null,
      accountId: "e5f1a245-1099-4f37-8c4a-8108e437a3ed",
      applicationType: "CREDIT_AGAINST_SECURITIES_BORROWER",
      applicationState: "IN_PROGRESS",
      applicationApprovalStatus: null,
      creditAmount: null,
      partnerAccountId: null,
      platformAccountId: null,
      currentStepId: "BANK_ACCOUNT_VERIFICATION",
      stepStatusMap: {
        KYC_CKYC: "NOT_STARTED",
        MANDATE_SETUP: "NOT_STARTED",
        KYC_AADHAAR_VERIFICATION: "NOT_STARTED",
        AGREEMENT_SIGN: "NOT_STARTED",
        MF_PLEDGING: "NOT_STARTED",
        KYC_PHOTO_VERIFICATION: "NOT_STARTED",
        CREDIT_APPROVAL: "NOT_STARTED",
        KYC_PAN_VERIFICATION: "NOT_STARTED",
        BANK_ACCOUNT_VERIFICATION: "NOT_STARTED",
      },
      createdOn: 1667189227560,
      lastUpdatedOn: 1667189227768,
      completedOn: null,
    },
  ],
  linkedCredits: null,
};
