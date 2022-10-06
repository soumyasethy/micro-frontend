import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../index";
import { ContinuePayload } from "./types";

export const getStarted: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.LOGIN, { phone_number: "+918763821940" });
};
export const textOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  // await navigate(ROUTE.LOGIN, { phone_number: "+918763821940" });
  console.warn("action", action);
};
