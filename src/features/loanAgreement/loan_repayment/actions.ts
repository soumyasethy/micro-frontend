
import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { LimitPayload } from "./types";

export const authenticateRepayment: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
 
  await navigate(ROUTE.LOAN_WEBVIEW, {
    urlData: action.payload.value,
  });
};


