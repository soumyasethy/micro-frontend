import { ActionFunction, Datastore } from "@voltmoney/types";
import { ROUTE } from "../../index";

export const getStarted: ActionFunction = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.SIGNUP);
};
