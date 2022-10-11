import { ActionFunction } from "@voltmoney/types";
import { signInGoogle } from "./repo";
import { GoogleLoginResponse } from "./types";

export const loginGoogle: ActionFunction<any> = async (
  action,
  _datastore,
  { network, asyncStorage, appendWidgets }
): Promise<any> => {
  const response: GoogleLoginResponse = await signInGoogle();
  console.warn("email id ------>", response.user.email);
};
