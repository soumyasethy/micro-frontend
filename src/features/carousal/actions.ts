import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";

export const GoToNumber: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  // await goBack();
  await SharedPropsService.setOnboarding(true);
  navigate(ROUTE.PHONE_NUMBER, {});
};
