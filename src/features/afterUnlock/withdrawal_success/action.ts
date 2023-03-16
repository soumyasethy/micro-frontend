import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";
export const Done: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
goBack()
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
