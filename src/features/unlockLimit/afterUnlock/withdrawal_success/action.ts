import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";


export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, showPopup, handleError }
): Promise<any> => {


  // await navigate(ROUTE.);
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage,goBack }
): Promise<any> => {
  goBack();
};
