import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";

export const GoToNumber: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  // await goBack();
  await SharedPropsService.setOnboarding(true);
  navigate(ROUTE.PHONE_NUMBER, {});
};
