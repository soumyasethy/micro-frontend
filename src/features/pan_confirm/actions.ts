import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { fetchUserContext, nextStep } from "../otp_verify/actions";

export const confirmPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, ...props }
): Promise<any> => {
  await fetchUserContext(action, _datastore, { asyncStorage, ...props });
};
export const changePanNo: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
