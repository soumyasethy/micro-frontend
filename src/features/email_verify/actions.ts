import { ActionFunction } from "@voltmoney/types";
import { signInGoogle } from "./repo";
import { GoogleLoginResponse, OtherEmail } from "./types";
import { ROUTE } from "../../routes";

export const loginGoogle: ActionFunction<any> = async (
  action,
  _datastore,
  { network, asyncStorage, appendWidgets }
): Promise<any> => {
  const response: GoogleLoginResponse = await signInGoogle();
  console.warn("email id ------>", response.user.email);
};
export const otherEmail: ActionFunction<OtherEmail> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.ENTER_EMAIL, { applicationId: action.payload.applicationId });
};
