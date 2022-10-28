import { config } from "./config";

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
};

export const StoreKey = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
};
