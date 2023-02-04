import { ButtonProps, IconTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { api } from "../../../configs/api";
import {APP_CONFIG, defaultHeaders, getAppHeader} from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AlertNavProps } from "../../popup_loader/types";
import { ACTION, NavPayload, manageLimitPayload } from "./types";
import sharedPropsService from "../../../SharedPropsService";
import {User} from "../../login/otp_verify/types";

export const getURL: ActionFunction<manageLimitPayload> = async (
  action,
  _datastore,
  { setDatastore, network, showPopup }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const user: User = await sharedPropsService.getUser()
  const accountId = user.linkedBorrowerAccounts[0].accountId;
  const response = await network.get(
    `${api.pdfHoldingStatement}${accountId}`,
      {
        headers: await getAppHeader()
      }
  )
  if(response.status === 200) {
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      loading: false,
    });
    showPopup({
      autoTriggerTimerInMilliseconds: APP_CONFIG.MODAL_TRIGGER_TIMEOUT,
      type: "SUCCESS",
      title: "Email sent successfully",
      subTitle: "Account holding details have been sent to your email address.",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION.MENU,
        routeId: ROUTE.MANAGE_LIMIT,
        payload: {},
      },
      primary: false,
    });
  }
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
};

export const navigation: ActionFunction<NavPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, showPopup, asyncStorage }
): Promise<any> => {
  if (action.payload.value === 0) {
    await navigate(ROUTE.DASHBOARD);
  }
  if (action.payload.value === 1) {
    await navigate(ROUTE.TRANSACTIONS)
  }
};

export const goBack: ActionFunction<{}> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
