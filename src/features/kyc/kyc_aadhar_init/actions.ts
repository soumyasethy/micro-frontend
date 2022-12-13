import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { AadharInputPayload } from "./types";
import { AadharInitPayload } from "../kyc_init/types";
import { ROUTE } from "../../../routes";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

let aadharNumber = "";
export const onChangeAadhar: ActionFunction<AadharInputPayload> = async (
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
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    ButtonProps
  >{
    type: action.payload.value
      ? ButtonTypeTokens.LargeFilled
      : ButtonTypeTokens.LargeOutline,
  });
};

export const triggerCTA: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  action.payload.aadhaarNumber = aadharNumber;
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const response = await network.post(
    api.aadharInit,
    { applicationId, aadhaarNumber: aadharNumber },
    { headers: await getAppHeader() }
  );

  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  if (response.status === 200) {
    await navigate(ROUTE.KYC_AADHAAR_VERIFICATION_OTP);
  } else {
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
      caption: { error: response.data.message },
    });
  }
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
