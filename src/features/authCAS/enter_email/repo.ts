import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";

export const saveAttribute = async (
  applicationId: string,
  key: string,
  value: string
) => {
  const body = JSON.stringify({
    secureDataAttributeDetailsMap: {
      [key]: {
        secureDataAttributeDetails: {
          value: value,
          sources: ["SELF"],
          verified: true,
          verificationSources: [`web`],
          collectedOn: `${Date.now()}`,
          verifiedOn: `${Date.now()}`,
        },
        isPrimary: true,
      },
    },
  });

  const requestOptions = {
    method: "PATCH",
    headers: defaultHeaders(),
    body: body,
  };
  const xxx = {
    isLoggedIn: true,
    user: {
      userId: "a95da6e6-1bb1-470a-82f7-03a7d7ba7315",
      phoneNumber: "+919898898980",
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
      addedOnTimeStamp: 1667227425533,
      lastUpdatedTimeStamp: 1667227425616,
    },
    linkedBorrowerAccounts: [
      {
        "@type": "Borrower",
        accountId: "c620fd02-2fab-464f-b8ca-21cf7f54992e",
        accountState: "ACTIVE",
        isInternal: false,
        accountTier: "BASIC",
        addedOnTimeStamp: 1667227425635,
        lastUpdatedTimeStamp: 1667227448227,
        accountHolderPhoneNumber: "+919898898980",
        accountHolderEmail: "ssshhjjjkkk@gggggg.in",
        accountHolderPAN: null,
        isKYCVerified: null,
        isBankAccountVerified: null,
      },
    ],
    linkedPartnerAccounts: [],
    linkedPlatformAccounts: [],
    linkedApplications: [
      {
        applicationId: "24011eda-9f1f-4c0f-8746-bcfa36fc8393",
        accountId: "c620fd02-2fab-464f-b8ca-21cf7f54992e",
        applicationType: "CREDIT_AGAINST_SECURITIES_BORROWER",
        applicationState: "IN_PROGRESS",
        applicationApprovalStatus: null,
        creditAmount: null,
        partnerAccountId: null,
        platformAccountId: null,
        currentStepId: "KYC_PAN_VERIFICATION",
        stepStatusMap: {
          MF_FETCH_PORTFOLIO: "NOT_STARTED",
          MANDATE_SETUP: "NOT_STARTED",
          KYC_AADHAAR_VERIFICATION: "NOT_STARTED",
          CREDIT_APPROVAL: "NOT_STARTED",
          BANK_ACCOUNT_VERIFICATION: "NOT_STARTED",
          AGREEMENT_SIGN: "NOT_STARTED",
          KYC_PAN_VERIFICATION: "NOT_STARTED",
          KYC_CKYC: "NOT_STARTED",
          KYC_PHOTO_VERIFICATION: "NOT_STARTED",
        },
        createdOn: 1667227425804,
        lastUpdatedOn: 1667227425827,
        completedOn: null,
      },
    ],
    linkedCredits: [],
  };

  await fetch(`${api.accountAttributes}${applicationId}`, requestOptions)
    .then(async (response) => {
      const updatedUser: User = await response.json();
      await SharedPropsService.setUser(updatedUser);
      console.warn("updatedUser ", updatedUser);
    })
    .catch(async (error) => {
      console.log("error", error);
      return Promise.reject(error);
    });
};
