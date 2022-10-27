import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";

export const Go_Next_Action: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  await navigate(ROUTE.KYC_DIGILOCKER);
};
