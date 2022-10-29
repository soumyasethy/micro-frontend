import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EnableDisableCTA } from "../../login/phone_number/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { AadharInputPayload } from "./types";
import { AadharInitPayload } from "../kyc_digilocker/types";
import { AadharInitRepo } from "../kyc_digilocker/repo";
import { ROUTE } from "../../../routes";

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

export const triggerCTA: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("action", action);
  action.payload.aadhaarNumber = aadharNumber;
  const response = await AadharInitRepo(
    action.payload.applicationId,
    action.payload.aadhaarNumber
  );
  if (response) await navigate(ROUTE.KYC_AADHAAR_VERIFICATION_OTP);
};
