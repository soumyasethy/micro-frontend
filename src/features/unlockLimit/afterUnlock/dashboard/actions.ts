import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../../routes";
import { CreditPayload, RepaymentPayload } from "./types";

export const withdrawNow: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.WITHDRAW_AMOUNT, {
    availableCreditAmount: action.payload.value,
  });
};

export const profile: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MY_PROFILE);
};

export const repayment: ActionFunction<RepaymentPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** Go Repayment****");
  await navigate(ROUTE.REPAYMENT, {
    repaymentAmount: action.payload.repaymentAmount,
  });
};

export const goBack: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  console.warn("**** Go Back****");
  await goBack();
};
