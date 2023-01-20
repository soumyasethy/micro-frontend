import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";

export const GoToLoginAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await SharedPropsService.setOnboarding(true);
  navigate(ROUTE.PHONE_NUMBER, {});
};
