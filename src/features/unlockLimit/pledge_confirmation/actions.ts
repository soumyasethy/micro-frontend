import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  OtpPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";
import { PledgeCreateRepo } from "../unlock_limit/repo";
import SharedPropsService from "../../../SharedPropsService";

export const sendOtp: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    loading: true,
  });
  const response = await PledgeCreateRepo("CAMS", action.payload.value.availableCAS);
  await setDatastore(action.routeId, action.payload.widgetId, <
    ButtonProps
    >{
      loading: false,
    });
  navigate(ROUTE.PLEDGE_VERIFY);

};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

