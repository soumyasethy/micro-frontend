import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { InputPayload, KycAdditionalDetailsPayload } from "./types";
import { AadharInitPayload } from "../kyc_init/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

let aadharNumber = "";
export const onChangeAadhar: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  aadharNumber = action.payload.value;
};
export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("action", action);
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    ButtonProps
  >{
    type: action.payload.value
      ? ButtonTypeTokens.LargeFilled
      : ButtonTypeTokens.LargeOutline,
  });
};

export const triggerCTA: ActionFunction<KycAdditionalDetailsPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  console.warn("action", action);
  const response = await network.post(
    api.additionalDetails,
    {...action.payload},
    {
      headers: await getAppHeader(),
    }
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
