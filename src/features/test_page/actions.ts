import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";

export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  await goBack();
  await navigate(ROUTE.PHONE_NUMBER, {});
};
