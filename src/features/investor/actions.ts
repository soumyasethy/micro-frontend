import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import { Linking, Dimensions } from "react-native";
import { LinkPayload
} from "./types";
import { ROUTE } from "../../routes";
import { getScreenType } from "../../configs/platfom-utils";
import { ButtonProps } from "@voltmoney/schema";

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
  { setDatastore,clipboard }
): Promise<any> => {
  clipboard.set(action.payload.value);
  await setDatastore(ROUTE.INVESTOR, "copy", <
    ButtonProps
  >{
    label: "Copied invite Link",
  });
};

export const onClient: ActionFunction<{}> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
};


