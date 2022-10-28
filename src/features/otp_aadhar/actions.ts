import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../phone_number/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { AadharInputPayload } from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import { aadharVerifyRepo } from "./repo";

let aadharNumber = "";
export const onChangeAadhar: ActionFunction<AadharInputPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
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

export const triggerCTA: ActionFunction<AadharInputPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  if (action.payload.value.length === 6) {
    const response = await aadharVerifyRepo(
      SharedPropsService.getUser().linkedApplications[0].applicationId,
      action.payload.value
    );
    if (response) navigate(ROUTE.CAMERA_OPEN);
  }
};
