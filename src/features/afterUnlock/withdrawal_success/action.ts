import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";
import { ROUTE } from "../../../routes";

export const Done: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate,navigateWithReset, goBack }
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
