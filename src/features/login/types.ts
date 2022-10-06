export enum ACTIONS {
  LoginWithCognitoAmplify = "LoginWithCognitoAmplify",
  LoginWithCognito = "LoginWithCognito",
  OTP_NUMBER = "OTP_NUMBER",
}
export type OTPPayload = {
  value: string;
  widgetId: string;
};
export type LoginAction = { username: string; password: string; session?: any };

export type Login = {
  accessToken: AccessToken;
  clockDrift: number;
  idToken: IDToken;
  refreshToken: RefreshToken;
};

export type AccessToken = {
  jwtToken: string;
  payload: AccessTokenPayload;
};

export type AccessTokenPayload = {
  auth_time: number;
  client_id: string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  scope: string;
  sub: string;
  token_use: string;
  username: string;
};

export type IDToken = {
  jwtToken: string;
  payload: IDTokenPayload;
};

export type IDTokenPayload = {
  aud: string;
  auth_time: number;
  "cognito:username": string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  origin_jti: string;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  token_use: string;
};

export type RefreshToken = {
  token: string;
};
