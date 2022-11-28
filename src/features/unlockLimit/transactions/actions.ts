import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { transactionPayload } from "./types";

export const emailStatement: ActionFunction<transactionPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.warn("****Email data****");
};
