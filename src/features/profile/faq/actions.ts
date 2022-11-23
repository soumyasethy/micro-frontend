import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { FaqPayload } from "./types";


export const faqDetails: ActionFunction<FaqPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await( navigate(ROUTE.FAQ_DETAILS,{
    title:action.payload.value
  }));
};

export const accountDetails: ActionFunction<FaqPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
 
};


export const goBack: ActionFunction<FaqPayload> = async (
  action,
  _datastore,
  {goBack }
): Promise<any> => {
  goBack();
};

