export enum ACTIONS {
  LoginWithCognitoAmplify = "LoginWithCognitoAmplify",
  LoginWithCognito = "LoginWithCognito",
  OTP_NUMBER = "OTP_NUMBER",
  RESEND_OTP_NUMBER = "RESEND_OTP_NUMBER",
  GO_BACK = "GO_BACK",
}
export type OTPPayload = {
  value: string;
  widgetId: string;
};
export type LoginAction = {
  username: string;
  password?: string;
  session?: any;
  isWhatsappEnabled?: boolean;
};
export type ResendOtp = {
  phoneNumber: string;
};
export interface SignInUserSession {
  accessToken: AccessToken;
  clockDrift: number;
  idToken: IDToken;
  refreshToken: RefreshToken;
}

export interface AccessToken {
  jwtToken: string;
  payload: AccessTokenPayload;
}

export interface AccessTokenPayload {
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
}

export interface IDToken {
  jwtToken: string;
  payload: IDTokenPayload;
}

export interface IDTokenPayload {
  aud: string;
  auth_time: number;
  "cognito:username": string;
  "custom:isWhatsappEnabled": string;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  token_use: string;
}

export interface RefreshToken {
  token: string;
}
