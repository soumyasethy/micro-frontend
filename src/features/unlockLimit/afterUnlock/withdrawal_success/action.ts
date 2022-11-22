import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";
import { ROUTE } from "../../../../routes";

export const Done: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.DASHBOARD);
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
