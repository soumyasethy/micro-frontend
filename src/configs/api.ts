//export enum BUILD_TYPE {
//   PRODUCTION = "PRODUCTION",
//   STAGING = "STAGING",
// }
// export const BASE_URL = {
//   [BUILD_TYPE.STAGING]: "https://api.staging.voltmoney.in",
//   [BUILD_TYPE.PRODUCTION]: "https://api.voltmoney.in",
// };
// let baseUrl = "";
// export const setBaseURL = (buildType: BUILD_TYPE) => {
//   baseUrl = BASE_URL[buildType];
// };
//
// export const config = {
//   URL: getBaseUrl(),
// };

export const BASE_URL = {
  STAGING: "https://api.staging.voltmoney.in",
  PRODUCTION: "https://api.voltmoney.in",
};
export const config = {
  URL: BASE_URL.STAGING,
};
export const StoreKey = {
  isLoadedFirstTime: "is_Loaded_First_Time",
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
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
};
