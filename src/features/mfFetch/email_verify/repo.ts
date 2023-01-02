import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { GoogleLoginResponseOffline, useGoogleLogin } from "react-google-login";

import { GoogleLoginResponse } from "./types";

export const signInGoogle = async () => {
  GoogleSignin.configure({
    iosClientId:
      "487300478427-tfvesrcgup8dfqvskj5k563qotiab4jc.apps.googleusercontent.com",
    webClientId:
      "85274716805-4c9hnt3nm3ntslg72ojt79ubnfkmp9lf.apps.googleusercontent.com",
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo: GoogleLoginResponse = await GoogleSignin.signIn();
    // this.setState({ userInfo });
    // console.warn("google userInfo--->", userInfo);
    return userInfo;
  } catch (error) {
    console.warn("google error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
const GoogleResponse = {
  idToken:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkMzZjMjU3YzQ3ZWJhYmI0N2I0NTY4MjhhODU4YWE1ZmNkYTEyZGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0ODczMDA0Nzg0MjctdGZ2ZXNyY2d1cDhkZnF2c2tqNWs1NjNxb3RpYWI0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0ODczMDA0Nzg0MjctdGZ2ZXNyY2d1cDhkZnF2c2tqNWs1NjNxb3RpYWI0amMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY0NjYwODI3Mzg1NTg0MDc5NjAiLCJoZCI6InZvbHRtb25leS5pbiIsImVtYWlsIjoic291bXlhLnNldGh5QHZvbHRtb25leS5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoieFE0QnlvdmpBcEstNnNGdG5kTFR0QSIsIm5vbmNlIjoiX0hDR01jSkRYOXhGNGRkaXQ3WTA4VUJFY291WUxCUUpGN2ZmTmxaTWxnOCIsIm5hbWUiOiJTb3VteWEgU2V0aHkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUxtNXd1M3I5Uzd6M1g0clJia3QweUdqREdpUVp4V2tFdkxDTFVRT2dkNEE9czk2LWMiLCJnaXZlbl9uYW1lIjoiU291bXlhIiwiZmFtaWx5X25hbWUiOiJTZXRoeSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjY1MTM5MjcwLCJleHAiOjE2NjUxNDI4NzB9.p2fbrcE98i-eUpB5j0Y7owykLcXplyaoJ_Kcjo080Yeq229Lytn5zFJvQneNcPieBKxjH8BqaP14Ztd6dim5t_ozmsXaGgExcmWglecgjQTjDZ-Bb4wVBWULHF1LrDSSrj3DtV5wEDw5aMFx9Hx6H5S5S_bYTWUFuafZ4gEqkaXmyZQerQD-l6BCBn8G1QCIX_1hWSLkUcKzyaDxFb-kcPn0p6SobJkZ_q-qlUW8zbIcj5Rlf6oQkmmFSaPyqzsksFE1bIWIMX8em-FB_55gxtVg_txN-oQ90vWenR6RCF3LGbgOQy8XfCMEfcNbKLwnuEYKiseRtRAtG_VhH2cN6w",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
  serverAuthCode: null,
  user: {
    email: "soumya.sethy@voltmoney.in",
    familyName: "Sethy",
    givenName: "Soumya",
    id: "116466082738558407960",
    name: "Soumya Sethy",
    photo:
      "https://lh3.googleusercontent.com/a/ALm5wu3r9S7z3X4rRbkt0yGjDGiQZxWkEvLCLUQOgd4A=s120",
  },
};

export const signInGoogleWeb = async () => {
  const { signIn, loaded } = useGoogleLogin({
    onSuccess: (response) => {
      console.warn("google error", response);
    },
    clientId:
      "85274716805-4c9hnt3nm3ntslg72ojt79ubnfkmp9lf.apps.googleusercontent.com",
    cookiePolicy: "single_host_origin",
  });
  await signIn();
};
