import { IconTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AlertNavProps } from "../../popup_loader/types";
import { ACTION, CreditPayload, NavPayload, RepaymentPayload } from "./types";

export const navigate: ActionFunction<NavPayload> = async (
  action,
  _datastore,
  { navigate, showPopup }
): Promise<any> => {
  if (action.payload.value === 1) {
    console.log("Action here 1")
    await navigate(ROUTE.TRANSACTIONS);
  }
  if (action.payload.value === 2) {
    console.log("Action here 2")
    // await navigate(ROUTE.ALERT_PAGE, {
    //   alertProps: <AlertNavProps>{
    //     type: "DEFAULT",
    //     iconName: IconTokens.Sound,
    //     title: "Coming soon",
    //     subTitle: "",
    //     ctaLabel: "Got It",
    //     ctaAction: {
    //       type: ACTION.MENU,
    //       routeId: ROUTE.DASHBOARD,
    //       payload: {},
    //     },
    //   },
    // });
    await navigate(ROUTE.MANAGE_LIMIT, {})
  }
  if (action.payload.value === 3) {
    console.log("Action here 3")
    await navigate(ROUTE.ALERT_PAGE, {
      alertProps: <AlertNavProps>{
        type: "DEFAULT",
        iconName: IconTokens.Sound,
        title: "Coming soon",
        subTitle: "",
        ctaLabel: "Got It",
        ctaAction: {
          type: ACTION.MENU,
          routeId: ROUTE.DASHBOARD,
          payload: {},
        },
      },
    });
  }
};

export const withdrawNow: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.WITHDRAW_AMOUNT, {
    availableCreditAmount: action.payload.value,
  });
};

export const OpenProfile: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MY_PROFILE);
};
export const OpenContactUS: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.CONTACT_US);
};

export const repayment: ActionFunction<RepaymentPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.REPAYMENT, {
    repaymentAmount: action.payload.repaymentAmount,
  });
};

export const goBack: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
