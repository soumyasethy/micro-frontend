import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { ROUTE } from "../../routes";
import { User } from "../otp_verify/types";
import { ListItemProps } from "@voltmoney/schema";
import { nextStep } from "../otp_verify/repo";
import SharedPropsService from "../../SharedPropsService";

export const confirmPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, goBack, setDatastore, navigate, ...props }
): Promise<any> => {
  const user: User = SharedPropsService.getUser();
  user.linkedBorrowerAccounts[0].accountHolderPAN = action.payload.panNumber;
  await SharedPropsService.setUser(user);
  await setDatastore(ROUTE.MF_PLEDGING, action.payload.widgetId, <
    ListItemProps
  >{
    subTitle: user.linkedBorrowerAccounts[0].accountHolderPAN,
  });
  const routeObj = await nextStep(user);

  await navigate(routeObj.routeId, routeObj.params);
};
export const changePanNo: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
