import { ActionFunction } from "@voltmoney/types";
import { signInGoogle, signInGoogleWeb } from "./repo";
import { GoogleLoginResponse, OtherEmail } from "./types";
import { ROUTE } from "../../../routes";

export const loginGoogle: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  // const responseWeb = await signInGoogleWeb();
  // console.warn("responseWeb-->", responseWeb);
  // const response: GoogleLoginResponse = await signInGoogle();
  // console.warn("email id ------>", response.user.email);
  navigate(ROUTE.ENTER_EMAIL, { applicationId: action.payload.applicationId });
};
export const otherEmail: ActionFunction<OtherEmail> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("sending application id ------>", action.payload.applicationId);
  navigate(ROUTE.ENTER_EMAIL, { applicationId: action.payload.applicationId });
};
