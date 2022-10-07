export enum ACTIONS {
  GOOGLE_LOGIN = "GOOGLE_LOGIN",
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
