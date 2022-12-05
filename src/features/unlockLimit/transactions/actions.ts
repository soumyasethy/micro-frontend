import { IconTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AlertNavProps } from "../../popup_loader/types";
import { ACTION, NavPayload, transactionPayload } from "./types";

export const emailStatement: ActionFunction<transactionPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("****Email data****");
};

export const navigation: ActionFunction<NavPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore,showPopup, asyncStorage }
): Promise<any> => {
  if(action.payload.value === 0){
    await navigate(ROUTE.DASHBOARD);
  }
  if(action.payload.value === 2){
    await navigate(ROUTE.ALERT_PAGE, {
      alertProps: <AlertNavProps>{
        type:"DEFAULT",
        iconName: IconTokens.Sound,
        title: "Coming soon",
        subTitle: '',
        ctaLabel: "Got It",
        ctaAction: {
          type: ACTION.MENU,
          routeId: ROUTE.TRANSACTIONS,
          payload: {},
        },
      },
    });
  }
  if(action.payload.value === 3){
    await navigate(ROUTE.ALERT_PAGE, {
      alertProps: <AlertNavProps>{
        type:"DEFAULT",
        iconName: IconTokens.Sound,
        title: "Coming soon",
        subTitle: '',
        ctaLabel: "Got It",
        ctaAction: {
          type: ACTION.MENU,
          routeId: ROUTE.TRANSACTIONS,
          payload: {},
        },
      },
    });
  }
 
};

export const goBack: ActionFunction<{}> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};