import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  StepperStateToken,
} from "@voltmoney/schema";
import { Linking, Dimensions } from "react-native";
import {
  ACTION, LinkPayload
} from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import _ from "lodash";
import { api } from "../../configs/api";
import { APP_CONFIG, DeepLinks, getAppHeader } from "../../configs/config";
import {
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../configs/utils";
import { navigate } from "../afterUnlock/dashboard/actions";
import { getScreenType } from "../../configs/platfom-utils";


export const onSave: ActionFunction<{}> = async (action, _datastore, { ...props }): Promise<any> => {

};

export const onSkip: ActionFunction<{}> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
};

export const onShare: ActionFunction<LinkPayload> = async (action, _datastore, { ...props }): Promise<any> => {
  const screenType = getScreenType(Dimensions.get("window").width);
  const MOBILE_WHATSAPP = "whatsapp://send?phone=919611749097";
  const WHATSAPP = "https://wa.me/919611749097";
  const referalLink = action.payload.value;
  if (
    screenType === SCREEN_SIZE.X_SMALL ||
    screenType === SCREEN_SIZE.SMALL
  ) {
    Linking.openURL('whatsapp://send?text=' + `${referalLink}`);
  } else {
    window.open("https://api.whatsapp.com://send?text=" + `${referalLink}`, '_blank');
  }
};

export const copyToClipboard: ActionFunction<LinkPayload> = async (
  action,
  _datastore,
  { clipboard }
): Promise<any> => {
  clipboard.set(action.payload.value);
};

export const onClient: ActionFunction<{}> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
};


