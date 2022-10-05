import { ActionFunction } from "@voltmoney/types";
import { cognitoRepo } from "./repo";
import { LoginAction } from "./types";
import { CognitoUserSession } from "amazon-cognito-identity-js";

export const loginCognito: ActionFunction<LoginAction> = async (
  action,
  _datastore,
  { asyncStorage }
): Promise<any> => {
  try {
    const result: CognitoUserSession = await cognitoRepo({
      email: action.payload.username,
      password: action.payload.confirmCode,
    });
    console.warn("Response->", result);
    asyncStorage.set(action.routeId, JSON.stringify(result));
  } catch (e) {
    console.warn("error: ", "loginCognito ->", e);
  }
};
