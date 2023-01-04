import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { amountPayload } from "./types";

export const updateAmount: ActionFunction<amountPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  navigate(ROUTE.MODIFY_PLEDGED_AMOUNT);
  console.warn("****Amount data****");
  // await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
  //   loading: true,
  // });
};

export const goBack: ActionFunction<amountPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack }
): Promise<any> => {
  goBack();
};
