// @ts-nocheck

import { User } from "../features/login/otp_verify/types";

export const MockUser: User = {
	"isLoggedIn": true,
	"user": {
		"userId": "678ae0df-7c1b-45ac-99ec-b9115fd5c656",
		"phoneNumber": "+918763666620",
		"emailId": null,
		"consent": "Y",
		"fullName": null,
		"gender": null,
		"address": null,
		"onboardingPartnerCode": null,
		"onboardingRelationshipManagerCode": null,
		"state": "ACTIVE",
		"externalId": null,
		"isInternal": null,
		"addedOnTimeStamp": 1667829968218,
		"lastUpdatedTimeStamp": 1667829968337
	},
	"linkedBorrowerAccounts": [{
		"@type": "Borrower",
		"accountId": "a4cda568-30cb-40ba-8ecc-9cd0b95647bd",
		"accountState": "ACTIVE",
		"isInternal": false,
		"accountTier": "BASIC",
		"addedOnTimeStamp": 1667829968355,
		"lastUpdatedTimeStamp": 1667830113453,
		"accountHolderPhoneNumber": "+918763666620",
		"accountHolderEmail": "soumya.sethy@voltmoney.in",
		"accountHolderPAN": "EDZPS7363L",
		"isKYCVerified": true,
		"isBankAccountVerified": null
	}],
	"linkedPartnerAccounts": [],
	"linkedPlatformAccounts": [{
		"@type": "Platform",
		"accountId": "6a8d1b14-61fc-4b30-ad07-de4052b4f295",
		"accountState": "ACTIVE",
		"isInternal": false,
		"accountTier": "BASIC",
		"addedOnTimeStamp": 1665751958715,
		"lastUpdatedTimeStamp": 1665751959014,
		"platformName": "Platform 1",
		"platformLogoImgSrc": "wGTIRwOTOncrw2GIstss",
		"platformCode": "VOLT_MOBILE_APP",
		"platformAgreementIdUri": null,
		"address": "UFdIMRVvZaJkUamfyCYoiGHaHcmSdA"
	}],
	"linkedApplications": [{
		"applicationId": "c403bcc4-62c3-4d05-945e-2cdc3935f4b2",
		"accountId": "a4cda568-30cb-40ba-8ecc-9cd0b95647bd",
		"applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
		"applicationState": "IN_PROGRESS",
		"applicationApprovalStatus": null,
		"creditAmount": null,
		"partnerAccountId": null,
		"platformAccountId": "6a8d1b14-61fc-4b30-ad07-de4052b4f295",
		"currentStepId": "BANK_ACCOUNT_VERIFICATION",
		"stepStatusMap": {
			"KYC_PAN_VERIFICATION": "COMPLETED",
			"MANDATE_SETUP": "NOT_STARTED",
			"AGREEMENT_SIGN": "NOT_STARTED",
			"KYC_PHOTO_VERIFICATION": "IN_PROGRESS",
			"BANK_ACCOUNT_VERIFICATION": "COMPLETED",
			"MF_PLEDGE_PORTFOLIO": "NOT_STARTED",
			"KYC_SUMMARY": "COMPLETED",
			"KYC_CKYC": "COMPLETED",
			"KYC_AADHAAR_VERIFICATION": "SKIPPED",
			"CREDIT_APPROVAL": "NOT_STARTED",
			"MF_FETCH_PORTFOLIO": "NOT_STARTED"
		},
		"createdOn": 1667829968561,
		"lastUpdatedOn": 1667877453281,
		"completedOn": null
	}],
	"linkedCredits": []
}