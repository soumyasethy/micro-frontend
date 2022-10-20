const baseUrl =
  "http://beta-appor-y52xud3gnv47-417447330.ap-south-1.elb.amazonaws.com";

export const api = {
  login: `${baseUrl}/api/client/auth/requestOtp/`,
  verifyOtp: `${baseUrl}/api/client/auth/verifyOtp/`,
  panVerify: `${baseUrl}/app/borrower/application/kyc/pan/panVerify`,
  pledgeInit: `${baseUrl}/app/borrower/application/pledge/init`,
  authCAS: `${baseUrl}/app/borrower/application/pledge/authCAS`,
  userContext: `${baseUrl}/app/borrower/user`,
  accountAttributes: `${baseUrl}/app/borrower/accountAttributes/`,
};

export const StoreKey = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  userContext: "user_context",
};
