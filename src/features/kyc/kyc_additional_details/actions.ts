import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { ButtonProps, ButtonTypeTokens, RadioProps } from "@voltmoney/schema";
import { InputPayload, KycAdditionalDetailsPayload, MaritalStatusPayload, MARITAL_STATUS } from "./types";
import { AadharInitPayload } from "../kyc_init/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

let martialStatus:MARITAL_STATUS = MARITAL_STATUS.SINGLE;
let fatherName = "";
let motherName = ""; 
let qualification = ""

export const onChangeInput: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  if(action.payload.widgetID == "fatherNameInput") {
    fatherName = action.payload.value;
  }
  if(action.payload.widgetID == "motherNameInput") {
    motherName = action.payload.value;
  }
};

export const onSelect: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  qualification = action.payload.value
};


export const toggleCTA: ActionFunction<MaritalStatusPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("action", action);
  if(action.payload.targetWidgetId === "singleRadio" && action.payload.value == true) {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <RadioProps>{ isChecked: true });
    await setDatastore(action.routeId, "marriedRadio", <RadioProps>{ isChecked: false });
    martialStatus = MARITAL_STATUS.SINGLE
  } 
  if(action.payload.targetWidgetId === "marriedRadio" && action.payload.value == true) {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <RadioProps>{ isChecked: true });
    await setDatastore(action.routeId, "singleRadio", <RadioProps>{ isChecked: false });
    martialStatus = MARITAL_STATUS.MARRIED
  }
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
