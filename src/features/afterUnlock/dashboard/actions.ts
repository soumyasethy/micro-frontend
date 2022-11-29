import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { CreditPayload, NavPayload, RepaymentPayload } from "./types";

export const navigate: ActionFunction<NavPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  if(action.payload.value === 'transaction'){
    await navigate(ROUTE.TRANSACTIONS);
  }
  
};

export const withdrawNow: ActionFunction<CreditPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.log("respay", action.payload.value);
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
