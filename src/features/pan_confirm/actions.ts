import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { fetchUserDetails } from "../otp_verify/actions";
import { ROUTE } from "../../routes";
import { StoreKey } from "../../configs/api";
import { User } from "../otp_verify/types";
import { ListItemProps } from "@voltmoney/schema";

export const confirmPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, goBack, setDatastore, navigate, ...props }
): Promise<any> => {
  console.warn("confirmPan action->", action);

  const user: User = await asyncStorage
    .get(StoreKey.userContext)
    .then((res) => JSON.parse(res));
  user.linkedBorrowerAccounts[0].accountHolderPAN = action.payload.panNumber;
  await setDatastore(ROUTE.MF_PLEDGING, "panItem" /*action.payload.widgetId*/, <
    ListItemProps
  >{
    subTitle: action.payload.panNumber,
  });
  await asyncStorage.set(StoreKey.userContext, JSON.stringify(user));
  goBack();
  await fetchUserDetails(action, _datastore, {
    navigate,
    asyncStorage,
    goBack,
    setDatastore,
    ...props,
  });
};
export const changePanNo: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
