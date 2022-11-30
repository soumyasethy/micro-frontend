import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { NavPayload, transactionPayload } from "./types";

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
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  if(action.payload.value === 'dashboard'){
    await navigate(ROUTE.DASHBOARD);
  }
 
};
