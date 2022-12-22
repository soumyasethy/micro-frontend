import SharedPropsService, { BUILD_TYPE } from "../SharedPropsService";

export const BASE_URL = {
  [BUILD_TYPE.BORROWER_STAGING]: "https://api.staging.voltmoney.in",
  [BUILD_TYPE.BORROWER_PRODUCTION]: "https://api.voltmoney.in",
};
export const config = {
  URL: BASE_URL[SharedPropsService.getBuildType()], /// change this to BASE_URL.PRODUCTION for production
};
export const StoreKey = {
  isPledgeFirstTime: "isPledgeFirstTime",
  isLoadedFirstTime: "is_Loaded_First_Time",
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
  urlWithDate: "url_with_date",
};
// Partner's app apis
export const partnerApi = {
  login: `${config.URL}/api/client/auth/requestOtp/`,
  verifyOtp: `${config.URL}/api/client/auth/verifyOtp/`,
  userContext:`${config.URL}/app/partner/user`,
  accountAttributes: `${config.URL}/app/partner/accountAttributes/`,
  customer: `${config.URL}/app/partner/`,
  bavAdd:`${config.URL}/app/borrower/application/bav/add`,
  pledgeLimit: `${config.URL}/app/borrower/application/pledge/limit/`,
  userProfile:`${config.URL}/app/borrower/userProfile/`
};

export const api = {
  login: `${config.URL}/api/client/auth/requestOtp/`,
  verifyOtp: `${config.URL}/api/client/auth/verifyOtp/`,
  panVerify: `${config.URL}/app/borrower/application/kyc/pan/panVerify`,
  pledgeInit: `${config.URL}/app/borrower/application/pledge/init`,
  authCAS: `${config.URL}/app/borrower/application/pledge/authCAS`,
  userContext: `${config.URL}/app/borrower/user`,
  accountAttributes: `${config.URL}/app/borrower/accountAttributes/`,
  aadharInit: `${config.URL}/app/borrower/application/kyc/aadhaar/init`,
  aadharVerify: `${config.URL}/app/borrower/application/kyc/aadhaar/verify`,
  kycSummaryInit: `${config.URL}/app/borrower/application/kyc/summary/init/`,
  kycSummaryVerify: `${config.URL}/app/borrower/application/kyc/summary/verify/`,
  banks: `${config.URL}/util/bankInfo/banks`,
  bav: `${config.URL}/app/borrower/application/bav/`,
  bavVerify: `${config.URL}/app/borrower/application/bav/verify`,
  bankInfoSearch: `${config.URL}/util/bankInfo/search/`,
  photoInit: `${config.URL}/app/borrower/application/kyc/photo/init`,
  photoVerify: `${config.URL}/app/borrower/application/kyc/photo/verify`,
  pledgeLimit: `${config.URL}/app/borrower/application/pledge/limit/`,
  pledgeCreate: `${config.URL}/app/borrower/application/pledge/create`,
  authPledge: `${config.URL}/app/borrower/application/pledge/authPledge`,
  mandateLink: `${config.URL}/app/borrower/application/mandate/link/`,
  mandateStatus: `${config.URL}/app/borrower/application/mandate/status/`,
  agreementLink: `${config.URL}/app/borrower/application/agreement/link/`,
  agreementStatus: `${config.URL}/app/borrower/application/agreement/status/`,
  approvalCheck: `${config.URL}/app/borrower/application/approval/check/`,
  userProfile: `${config.URL}/app/borrower/userProfile/`,
  lmsDisbursal: `${config.URL}/app/borrower/lms/disbursal/`,
  lmsDisbursalVerify: `${config.URL}/app/borrower/lms/disbursal/verifyOTP`,
  repaymentBankAccountDetails: `${config.URL}/app/borrower/lms/repaymentBankAccountDetails/`,
  processingCharges: `${config.URL}/app/borrower/application/pledge/processingCharges`,
  borrowerApplication: `${config.URL}/app/borrower/application/`,
  additionalDetails: `${config.URL}/app/borrower/application/additionalDetails/`,
  pdfLink: `${config.URL}/app/borrower/lms/transactions/`,
  kycDocument: `${config.URL}/app/borrower/application/kyc/document/`,
  documentValidate: `${config.URL}/app/borrower/application/kyc/document/validate/`,
  pdfEmail: `${config.URL}/app/borrower/lms/transactions/email/`,
  digioKycESignInitiateRequest: `${config.URL}/app/borrower/application/kyc/digio/init/`,
  digioKycCheckRequestStatus: `${config.URL}/app/borrower/application/kyc/digio/status/`,
  kycDocumentPOA: `${config.URL}/app/borrower/application/kyc/document/poa/`,
  documentValidatePOA: `${config.URL}/app/borrower/application/kyc/document/poa/validate/`,
  kycDocumentPOI: `${config.URL}/app/borrower/application/kyc/document/poi/`,
  documentValidatePOI: `${config.URL}/app/borrower/application/kyc/document/poi/validate/`,
  getListOfDisbursalByCreditId: `${config.URL}/app/borrower/lms/disbursal/credit/`,
  pdfHoldingStatement: `${config.URL}/app/borrower/lms/holdingStatement/email/`,
  savePortfolio: `${config.URL}/app/borrower/application/pledge/save`,
};
