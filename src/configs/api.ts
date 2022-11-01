export const config = {
  baseUrl: "https://api.voltmoney.in",
};
export const StoreKey = {
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
  kycSummary: `${config.baseUrl}/app/borrower/application/kyc/summary/`,
  bav: `${config.baseUrl}/app/borrower/application/bav/`,
  bavVerify: `${config.baseUrl}/app/borrower/application/bav/verify`,
  bankInfoSearch: `${config.baseUrl}/util/bankInfo/search/`,
};
