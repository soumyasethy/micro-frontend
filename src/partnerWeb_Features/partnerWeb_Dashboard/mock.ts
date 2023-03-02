import SharedPropsService, {PartnerLeadsListType} from "../../SharedPropsService";

export const mock = {};

export const mockTestDataApi = {
    "customerMetadataList": [
        {
            "assetDetails": {
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCAS": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "availableCreditAmount": 0,
                "casFetchDates": {
                    "additionalProp1": "2023-02-28T10:30:52.118Z",
                    "additionalProp2": "2023-02-28T10:30:52.118Z",
                    "additionalProp3": "2023-02-28T10:30:52.118Z"
                },
                "interestRate": 0,
                "isinLTVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "isinNAVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "loanTenureInMonths": 0,
                "maxLoanAmount": 0,
                "nonEligiblePortfolioAmounts": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "pledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "processingFees": 0,
                "processingFeesBreakUp": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "repositoryAssetMetadataMap": {
                    "additionalProp1": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp2": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp3": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    }
                },
                "requestedCreditAmount": 0,
                "tobePledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.119Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.119Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "totalPortfolioAmount": 0
            },
            "borrowerAccountProfile": {
                "bankDetails": {
                    "accountNumber": "123124123123",
                    "bankCode": "string",
                    "bankName": "string",
                    "branchAddress": "string",
                    "branchName": "string",
                    "city": "string",
                    "ifscCode": "string",
                    "micrCode": "string"
                },
                "dob": "string",
                "emailId": "test1@gmail.com",
                "name": "name1",
                "panNumber": "pan1",
                "phoneNumber": "9435020992"
            },
            "credit": {
                "accountId": "string",
                "actualLoanAmount": 0,
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCreditAmount": 0,
                "chargesDue": 0,
                "createdOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "creditId": "string",
                "creditStatus": "ACTIVE",
                "creditType": "CREDIT_LINE_LAMF",
                "currentApplicableInterestRate": 0,
                "currentTermStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "disbursalRequestAllowed": true,
                "lastUpdatedOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "lenderCreditId": "string",
                "lendingPartnerId": "string",
                "marginCallStatus": "NOT_REQUIRED",
                "originalStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "outstandingInterestDue": 0,
                "partnerAccountId": "string",
                "penalInterestDue": 0,
                "platformAccountId": "string",
                "principalOutStandingAmount": 0,
                "processingChargeDetails": "string",
                "processingCharges": 0,
                "renewalDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "tenureInDays": 0,
                "totalValueOfAssetsPledged": 0
            },
            "creditApplication": {
                "accountId": "string",
                "applicationApprovalStatus": "APPROVED",
                "applicationId": "string",
                "applicationState": "COMPLETED",
                "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
                "completedOn": "2023-02-28T10:30:52.119Z",
                "createdOn": 1731865052119,
                "creditAmount": 0,
                "currentStepId": "AGREEMENT_SIGN",
                "lastUpdatedOn": "2023-02-28T10:30:52.119Z",
                "lenderAccountId": "string",
                "partnerAccountId": "string",
                "platformAccountId": "string",
                "stepStatusMap": {
                    "additionalProp1": "COMPLETED",
                    "additionalProp2": "COMPLETED",
                    "additionalProp3": "COMPLETED"
                }
            },
            "partnerViewStepperMap": {
                "additionalProp1": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp2": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp3": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                }
            }
        },
        {
            "assetDetails": {
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCAS": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "availableCreditAmount": 0,
                "casFetchDates": {
                    "additionalProp1": "2023-02-28T10:30:52.118Z",
                    "additionalProp2": "2023-02-28T10:30:52.118Z",
                    "additionalProp3": "2023-02-28T10:30:52.118Z"
                },
                "interestRate": 0,
                "isinLTVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "isinNAVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "loanTenureInMonths": 0,
                "maxLoanAmount": 0,
                "nonEligiblePortfolioAmounts": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "pledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "processingFees": 0,
                "processingFeesBreakUp": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "repositoryAssetMetadataMap": {
                    "additionalProp1": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp2": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp3": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    }
                },
                "requestedCreditAmount": 0,
                "tobePledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.119Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.119Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "totalPortfolioAmount": 0
            },
            "borrowerAccountProfile": {
                "bankDetails": {
                    "accountNumber": "123124123123",
                    "bankCode": "string",
                    "bankName": "string",
                    "branchAddress": "string",
                    "branchName": "string",
                    "city": "string",
                    "ifscCode": "string",
                    "micrCode": "string"
                },
                "dob": "string",
                "emailId": "test2@gmail.com",
                "name": "name2",
                "panNumber": "pan2",
                "phoneNumber": "9435020993"
            },
            "credit": {
                "accountId": "string",
                "actualLoanAmount": 0,
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCreditAmount": 0,
                "chargesDue": 0,
                "createdOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "creditId": "string",
                "creditStatus": "ACTIVE",
                "creditType": "CREDIT_LINE_LAMF",
                "currentApplicableInterestRate": 0,
                "currentTermStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "disbursalRequestAllowed": true,
                "lastUpdatedOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "lenderCreditId": "string",
                "lendingPartnerId": "string",
                "marginCallStatus": "NOT_REQUIRED",
                "originalStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "outstandingInterestDue": 0,
                "partnerAccountId": "string",
                "penalInterestDue": 0,
                "platformAccountId": "string",
                "principalOutStandingAmount": 0,
                "processingChargeDetails": "string",
                "processingCharges": 0,
                "renewalDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "tenureInDays": 0,
                "totalValueOfAssetsPledged": 0
            },
            "creditApplication": {
                "accountId": "string",
                "applicationApprovalStatus": "APPROVED",
                "applicationId": "string",
                "applicationState": "BLOCKED",
                "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
                "completedOn": "2023-02-28T10:30:52.119Z",
                "createdOn": 1731865052119,
                "creditAmount": 0,
                "currentStepId": "AGREEMENT_SIGN",
                "lastUpdatedOn": "2023-02-28T10:30:52.119Z",
                "lenderAccountId": "string",
                "partnerAccountId": "string",
                "platformAccountId": "string",
                "stepStatusMap": {
                    "additionalProp1": "COMPLETED",
                    "additionalProp2": "COMPLETED",
                    "additionalProp3": "COMPLETED"
                }
            },
            "partnerViewStepperMap": {
                "additionalProp1": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp2": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp3": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                }
            }
        },
        {
            "assetDetails": {
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCAS": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "availableCreditAmount": 0,
                "casFetchDates": {
                    "additionalProp1": "2023-02-28T10:30:52.118Z",
                    "additionalProp2": "2023-02-28T10:30:52.118Z",
                    "additionalProp3": "2023-02-28T10:30:52.118Z"
                },
                "interestRate": 0,
                "isinLTVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "isinNAVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "loanTenureInMonths": 0,
                "maxLoanAmount": 0,
                "nonEligiblePortfolioAmounts": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "pledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "processingFees": 0,
                "processingFeesBreakUp": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "repositoryAssetMetadataMap": {
                    "additionalProp1": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp2": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp3": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    }
                },
                "requestedCreditAmount": 0,
                "tobePledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.119Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.119Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "totalPortfolioAmount": 0
            },
            "borrowerAccountProfile": {
                "bankDetails": {
                    "accountNumber": "string",
                    "bankCode": "string",
                    "bankName": "string",
                    "branchAddress": "string",
                    "branchName": "string",
                    "city": "string",
                    "ifscCode": "string",
                    "micrCode": "string"
                },
                "dob": "string",
                "emailId": "string",
                "name": "string",
                "panNumber": "string",
                "phoneNumber": "string"
            },
            "credit": {
                "accountId": "string",
                "actualLoanAmount": 0,
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCreditAmount": 0,
                "chargesDue": 0,
                "createdOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "creditId": "string",
                "creditStatus": "ACTIVE",
                "creditType": "CREDIT_LINE_LAMF",
                "currentApplicableInterestRate": 0,
                "currentTermStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "disbursalRequestAllowed": true,
                "lastUpdatedOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "lenderCreditId": "string",
                "lendingPartnerId": "string",
                "marginCallStatus": "NOT_REQUIRED",
                "originalStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "outstandingInterestDue": 0,
                "partnerAccountId": "string",
                "penalInterestDue": 0,
                "platformAccountId": "string",
                "principalOutStandingAmount": 0,
                "processingChargeDetails": "string",
                "processingCharges": 0,
                "renewalDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "tenureInDays": 0,
                "totalValueOfAssetsPledged": 0
            },
            "creditApplication": {
                "accountId": "string",
                "applicationApprovalStatus": "APPROVED",
                "applicationId": "string",
                "applicationState": "COMPLETED",
                "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
                "completedOn": "2023-02-28T10:30:52.119Z",
                "createdOn": 1731865052119,
                "creditAmount": 0,
                "currentStepId": "AGREEMENT_SIGN",
                "lastUpdatedOn": "2023-02-28T10:30:52.119Z",
                "lenderAccountId": "string",
                "partnerAccountId": "string",
                "platformAccountId": "string",
                "stepStatusMap": {
                    "additionalProp1": "COMPLETED",
                    "additionalProp2": "COMPLETED",
                    "additionalProp3": "COMPLETED"
                }
            },
            "partnerViewStepperMap": {
                "additionalProp1": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp2": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp3": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                }
            }
        },
        {
            "assetDetails": {
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCAS": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "availableCreditAmount": 0,
                "casFetchDates": {
                    "additionalProp1": "2023-02-28T10:30:52.118Z",
                    "additionalProp2": "2023-02-28T10:30:52.118Z",
                    "additionalProp3": "2023-02-28T10:30:52.118Z"
                },
                "interestRate": 0,
                "isinLTVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "isinNAVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "loanTenureInMonths": 0,
                "maxLoanAmount": 0,
                "nonEligiblePortfolioAmounts": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "pledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "processingFees": 0,
                "processingFeesBreakUp": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "repositoryAssetMetadataMap": {
                    "additionalProp1": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp2": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp3": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    }
                },
                "requestedCreditAmount": 0,
                "tobePledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.119Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.119Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "totalPortfolioAmount": 0
            },
            "borrowerAccountProfile": {
                "bankDetails": {
                    "accountNumber": "string",
                    "bankCode": "string",
                    "bankName": "string",
                    "branchAddress": "string",
                    "branchName": "string",
                    "city": "string",
                    "ifscCode": "string",
                    "micrCode": "string"
                },
                "dob": "string",
                "emailId": "string",
                "name": "string",
                "panNumber": "string",
                "phoneNumber": "string"
            },
            "credit": {
                "accountId": "string",
                "actualLoanAmount": 0,
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCreditAmount": 0,
                "chargesDue": 0,
                "createdOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "creditId": "string",
                "creditStatus": "ACTIVE",
                "creditType": "CREDIT_LINE_LAMF",
                "currentApplicableInterestRate": 0,
                "currentTermStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "disbursalRequestAllowed": true,
                "lastUpdatedOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "lenderCreditId": "string",
                "lendingPartnerId": "string",
                "marginCallStatus": "NOT_REQUIRED",
                "originalStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "outstandingInterestDue": 0,
                "partnerAccountId": "string",
                "penalInterestDue": 0,
                "platformAccountId": "string",
                "principalOutStandingAmount": 0,
                "processingChargeDetails": "string",
                "processingCharges": 0,
                "renewalDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "tenureInDays": 0,
                "totalValueOfAssetsPledged": 0
            },
            "creditApplication": {
                "accountId": "string",
                "applicationApprovalStatus": "APPROVED",
                "applicationId": "string",
                "applicationState": "BLOCKED",
                "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
                "completedOn": "2023-02-28T10:30:52.119Z",
                "createdOn": 1731865052119,
                "creditAmount": 0,
                "currentStepId": "AGREEMENT_SIGN",
                "lastUpdatedOn": "2023-02-28T10:30:52.119Z",
                "lenderAccountId": "string",
                "partnerAccountId": "string",
                "platformAccountId": "string",
                "stepStatusMap": {
                    "additionalProp1": "COMPLETED",
                    "additionalProp2": "COMPLETED",
                    "additionalProp3": "COMPLETED"
                }
            },
            "partnerViewStepperMap": {
                "additionalProp1": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp2": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp3": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                }
            }
        },
        {
            "assetDetails": {
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCAS": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "availableCreditAmount": 0,
                "casFetchDates": {
                    "additionalProp1": "2023-02-28T10:30:52.118Z",
                    "additionalProp2": "2023-02-28T10:30:52.118Z",
                    "additionalProp3": "2023-02-28T10:30:52.118Z"
                },
                "interestRate": 0,
                "isinLTVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "isinNAVMap": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "loanTenureInMonths": 0,
                "maxLoanAmount": 0,
                "nonEligiblePortfolioAmounts": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "pledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.118Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.118Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "processingFees": 0,
                "processingFeesBreakUp": {
                    "additionalProp1": 0,
                    "additionalProp2": 0,
                    "additionalProp3": 0
                },
                "repositoryAssetMetadataMap": {
                    "additionalProp1": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp2": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    },
                    "additionalProp3": {
                        "approvedCreditAmount": 0,
                        "approvedPortfolioAmount": 0,
                        "availableCreditAmount": 0,
                        "availablePortfolioAmount": 0,
                        "casFetchDate": "2023-02-28T10:30:52.119Z"
                    }
                },
                "requestedCreditAmount": 0,
                "tobePledgedPortfolio": [
                    {
                        "amcCode": "string",
                        "amcName": "string",
                        "assetRepository": "CAMS",
                        "fetchedOn": "2023-02-28T10:30:52.119Z",
                        "folioNo": "string",
                        "is_pledged": true,
                        "is_pledged_confirmed": true,
                        "isinNo": "string",
                        "modeOfHolding": "string",
                        "pledgeReferenceNo": "string",
                        "pledgedOn": "2023-02-28T10:30:52.119Z",
                        "pledgedUnits": 0,
                        "schemeCode": "string",
                        "schemeName": "string",
                        "schemeType": "string",
                        "totalAvailableUnits": 0
                    }
                ],
                "totalPortfolioAmount": 0
            },
            "borrowerAccountProfile": {
                "bankDetails": {
                    "accountNumber": "string",
                    "bankCode": "string",
                    "bankName": "string",
                    "branchAddress": "string",
                    "branchName": "string",
                    "city": "string",
                    "ifscCode": "string",
                    "micrCode": "string"
                },
                "dob": "string",
                "emailId": "string",
                "name": "string",
                "panNumber": "string",
                "phoneNumber": "string"
            },
            "credit": {
                "accountId": "string",
                "actualLoanAmount": 0,
                "applicationId": "string",
                "approvedCreditAmount": 0,
                "availableCreditAmount": 0,
                "chargesDue": 0,
                "createdOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "creditId": "string",
                "creditStatus": "ACTIVE",
                "creditType": "CREDIT_LINE_LAMF",
                "currentApplicableInterestRate": 0,
                "currentTermStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "disbursalRequestAllowed": true,
                "lastUpdatedOn": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "lenderCreditId": "string",
                "lendingPartnerId": "string",
                "marginCallStatus": "NOT_REQUIRED",
                "originalStartDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "outstandingInterestDue": 0,
                "partnerAccountId": "string",
                "penalInterestDue": 0,
                "platformAccountId": "string",
                "principalOutStandingAmount": 0,
                "processingChargeDetails": "string",
                "processingCharges": 0,
                "renewalDate": {
                    "date": 0,
                    "day": 0,
                    "hours": 0,
                    "minutes": 0,
                    "month": 0,
                    "nanos": 0,
                    "seconds": 0,
                    "time": 0,
                    "timezoneOffset": 0,
                    "year": 0
                },
                "tenureInDays": 0,
                "totalValueOfAssetsPledged": 0
            },
            "creditApplication": {
                "accountId": "string",
                "applicationApprovalStatus": "APPROVED",
                "applicationId": "string",
                "applicationState": "COMPLETED",
                "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
                "completedOn": "2023-02-28T10:30:52.119Z",
                "createdOn": 1731865052119,
                "creditAmount": 0,
                "currentStepId": "AGREEMENT_SIGN",
                "lastUpdatedOn": "2023-02-28T10:30:52.119Z",
                "lenderAccountId": "string",
                "partnerAccountId": "string",
                "platformAccountId": "string",
                "stepStatusMap": {
                    "additionalProp1": "COMPLETED",
                    "additionalProp2": "COMPLETED",
                    "additionalProp3": "COMPLETED"
                }
            },
            "partnerViewStepperMap": {
                "additionalProp1": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp2": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                },
                "additionalProp3": {
                    "horizontalDisplayName": "string",
                    "isEditable": true,
                    "message": "string",
                    "order": 0,
                    "status": "COMPLETED",
                    "verticalDescription": "string",
                    "verticalDisplayName": "string"
                }
            }
        }
    ],
    "nextToken": "string"
}
// export const referredPartnerMockData = [
//     {
//         accountHolderEmail: "string",
//         accountHolderPhoneNumber: "string",
//         accountId: "string",
//         accountState: "ACTIVE",
//         accountTier: "BASIC",
//         addedOnTimeStamp: "2023-03-11T10:41:18.846Z",
//         address: "string",
//         isInternal: true,
//         lastUpdatedTimeStamp: "2023-03-11T10:41:18.846Z",
//         partnerAccountType: "INDIVIDUAL",
//         partnerCode: "string",
//         partnerLogoImgSrc: "string",
//         partnerName: "string",
//         partnerShipCommenceDate: "2023-03-11T10:41:18.846Z",
//         partnerShipEndDate: "2023-03-11T10:41:18.846Z",
//         partnershipAgreementIdUri: "string"
//     },
//     {
//         accountHolderEmail: "string",
//         accountHolderPhoneNumber: "string",
//         accountId: "string",
//         accountState: "ACTIVE",
//         accountTier: "BASIC",
//         addedOnTimeStamp: "2023-03-11T10:41:18.846Z",
//         address: "string",
//         isInternal: true,
//         lastUpdatedTimeStamp: "2023-03-11T10:41:18.846Z",
//         partnerAccountType: "INDIVIDUAL",
//         partnerCode: "string",
//         partnerLogoImgSrc: "string",
//         partnerName: "string",
//         partnerShipCommenceDate: "2023-03-11T10:41:18.846Z",
//         partnerShipEndDate: "2023-03-11T10:41:18.846Z",
//         partnershipAgreementIdUri: "string"
//     },
//     {
//         accountHolderEmail: "string",
//         accountHolderPhoneNumber: "string",
//         accountId: "string",
//         accountState: "ACTIVE",
//         accountTier: "BASIC",
//         addedOnTimeStamp: "2023-03-11T10:41:18.846Z",
//         address: "string",
//         isInternal: true,
//         lastUpdatedTimeStamp: "2023-03-11T10:41:18.846Z",
//         partnerAccountType: "INDIVIDUAL",
//         partnerCode: "string",
//         partnerLogoImgSrc: "string",
//         partnerName: "string",
//         partnerShipCommenceDate: "2023-03-11T10:41:18.846Z",
//         partnerShipEndDate: "2023-03-11T10:41:18.846Z",
//         partnershipAgreementIdUri: "string"
//     },
// ]

export const mockTestData = [{
    name: 'test name 1',
    pan: 'CASPR3234M',
    mobile: '+919435020991',
    email: 'test@voltmoney.in',
}, {
    name: 'test name 2',
    pan: 'CASPR3234F',
    mobile: '+919435020992',
    email: 'test@voltmoney.in',
}, {
    name: 'test name 3',
    pan: 'CASPR3234G',
    mobile: '+919435020993',
    email: 'test@voltmoney.in',
}]

export const MockDataJsonTest:PartnerLeadsListType = JSON.parse(JSON.stringify(mockTestDataApi));
// export const ReferredDataMockDataJsonTest:PartnerLeadsListType = JSON.parse(JSON.stringify(referredPartnerMockData));

export const referredPartnerMockData = {
    "data": [
    {
        "@type": "Partner",
        "accountId": "a2cd799a-f8b7-427b-8880-5cf3c752f3a7",
        "accountState": "ACTIVE",
        "isInternal": false,
        "accountTier": "BASIC",
        "addedOnTimeStamp": 1678537850701,
        "lastUpdatedTimeStamp": 1678537860185,
        "partnerName": "zyc",
        "accountHolderEmail": "dasd@dasd.com",
        "accountHolderPhoneNumber": "+911654356543",
        "partnerLogoImgSrc": null,
        "partnershipAgreementIdUri": null,
        "address": null,
        "partnerCode": "GLI9MQ",
        "partnerAccountType": "INDIVIDUAL",
        "partnerShipCommenceDate": 1678537850697,
        "partnerShipEndDate": null
    },
    {
        "@type": "Partner",
        "accountId": "4692e33f-b1f7-427d-a6b6-a96400268733",
        "accountState": "ACTIVE",
        "isInternal": false,
        "accountTier": "BASIC",
        "addedOnTimeStamp": 1678536610302,
        "lastUpdatedTimeStamp": 1678536610302,
        "partnerName": null,
        "accountHolderEmail": null,
        "accountHolderPhoneNumber": "+916546545432",
        "partnerLogoImgSrc": null,
        "partnershipAgreementIdUri": null,
        "address": null,
        "partnerCode": "3MEE3Y",
        "partnerAccountType": "INDIVIDUAL",
        "partnerShipCommenceDate": 1678536610298,
        "partnerShipEndDate": null
    }
],
    "status": 200,
    "statusText": "",
    "headers": {
    "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
        "content-type": "application/json",
        "expires": "0",
        "pragma": "no-cache"
},
    "config": {
    "transitional": {
        "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
    },
    "transformRequest": [
        null
    ],
        "transformResponse": [
        null
    ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {
        "FormData": null
    },
    "headers": {
        "Accept": "application/json, text/plain, */*",
            "X-AppMode": "INVESTOR_VIEW",
            "X-AppPlatform": "VOLT_MOBILE_APP",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhOTY3ZWZjYi0zM2RjLTQ2ZGQtYTNhNy1jNTRlYWQ4Yzk5ZmIiLCJleHAiOjE2ODExMzAwMzEsImlhdCI6MTY3ODUzODAzMX0.1f9Hzet08MZ1jZqY3qEFIjky-Nn8-VmbCS3sa3XblHw",
            "X-DeviceType": "Desktop"
    },
    "method": "get",
        "url": "https://api.staging.voltmoney.in/app/partner/5b912237-f59f-4062-a434-639b7ca3bf1b/partners/all"
},
    "request": {}
}