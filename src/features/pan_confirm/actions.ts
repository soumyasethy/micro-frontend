import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { fetchUserContext, nextStep } from "../otp_verify/actions";
import { ROUTE } from "../../routes";
import { StoreKey } from "../../configs/api";
import { User } from "../otp_verify/types";

export const confirmPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, goBack, setDatastore, ...props }
): Promise<any> => {
  await goBack();
  await fetchUserContext(action, _datastore, {
    asyncStorage,
    goBack,
    setDatastore,
    ...props,
  });
  const user: User = await asyncStorage
    .get(StoreKey.userContext)
    .then((res) => JSON.parse(res));
  user.linkedBorrowerAccounts[0].accountHolderPAN = action.payload.panNumber;
  await asyncStorage.set(StoreKey.userContext, JSON.stringify(user));
  await setDatastore(ROUTE.MF_PLEDGING, action.payload.widgetId, {
    subTitle: action.payload.panNumber,
  });
};
export const changePanNo: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
