export enum ACTIONS {
  GOOGLE_LOGIN = "GOOGLE_LOGIN",
  APPLE_LOGIN = "APPLE_LOGIN",
  OTHER_EMAIL = "OTHER_EMAIL",
}
export type GoogleLoginResponse = {
  idToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    familyName: string;
    givenName: string;
    photo: string;
  };
};

export type OtherEmail = {
  applicationId: string;
};
