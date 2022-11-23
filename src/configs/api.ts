export const config = {
  baseUrl: "https://api.voltmoney.in",
};
export const StoreKey = {
  isLoadedFirstTime: "is_Loaded_First_Time",
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
};
export const api = {
  login: `${config.baseUrl}/api/client/auth/requestOtp/`,
  verifyOtp: `${config.baseUrl}/api/client/auth/verifyOtp/`,
  panVerify: `${config.baseUrl}/app/borrower/application/kyc/pan/panVerify`,
  pledgeInit: `${config.baseUrl}/app/borrower/application/pledge/init`,
  authCAS: `${config.baseUrl}/app/borrower/application/pledge/authCAS`,
  userContext: `${config.baseUrl}/app/borrower/user`,
  accountAttributes: `${config.baseUrl}/app/borrower/accountAttributes/`,
  aadharInit: `${config.baseUrl}/app/borrower/application/kyc/aadhaar/init`,
  aadharVerify: `${config.baseUrl}/app/borrower/application/kyc/aadhaar/verify`,
  kycSummaryInit: `${config.baseUrl}/app/borrower/application/kyc/summary/init/`,
  kycSummaryVerify: `${config.baseUrl}/app/borrower/application/kyc/summary/verify/`,
  bav: `${config.baseUrl}/app/borrower/application/bav/`,
  bavVerify: `${config.baseUrl}/app/borrower/application/bav/verify`,
  bankInfoSearch: `${config.baseUrl}/util/bankInfo/search/`,
  photoInit: `${config.baseUrl}/app/borrower/application/kyc/photo/init`,
  photoVerify: `${config.baseUrl}/app/borrower/application/kyc/photo/verify`,
  pledgeLimit: `${config.baseUrl}/app/borrower/application/pledge/limit/`,
  pledgeCreate: `${config.baseUrl}/app/borrower/application/pledge/create`,
  authPledge: `${config.baseUrl}/app/borrower/application/pledge/authPledge`,
  mandateLink: `${config.baseUrl}/app/borrower/application/mandate/link/`,
  mandateStatus: `${config.baseUrl}/app/borrower/application/mandate/status/`,
  agreementLink: `${config.baseUrl}/app/borrower/application/agreement/link/`,
  agreementStatus: `${config.baseUrl}/app/borrower/application/agreement/status/`,
  approvalCheck: `${config.baseUrl}/app/borrower/application/approval/check/`,
  userProfile: `${config.baseUrl}/app/borrower/userProfile/`,
  lmsDisbursal: `${config.baseUrl}/app/borrower/lms/disbursal/`,
  lmsDisbursalVerify: `${config.baseUrl}/app/borrower/lms/disbursal/verifyOTP`,
  repaymentBankAccountDetails: `${config.baseUrl}/app/borrower/lms/repaymentBankAccountDetails/`
};
