import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../../routes";
import { OtpPledgePayload } from "./types";


export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, showPopup, handleError }
): Promise<any> => {


  await navigate(ROUTE.WITHDRAWAL_SUCCESS);
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage,goBack }
): Promise<any> => {
  goBack();
};
