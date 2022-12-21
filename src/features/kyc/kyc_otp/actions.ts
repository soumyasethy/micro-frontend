import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { AadharInputPayload } from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AadharInitPayload } from "../kyc_init/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import _ from "lodash";
import { nextStepCredStepper } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";

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
export const goBack: ActionFunction<AadharInputPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};

export const triggerCTA: ActionFunction<AadharInputPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  if (action.payload.value.length === 6) {
    await setDatastore(ROUTE.KYC_AADHAAR_VERIFICATION_OTP, "input", <
      TextInputProps
    >{ state: InputStateToken.LOADING });
    const user: User = await SharedPropsService.getUser();

    const applicationId = user.linkedApplications[0].applicationId;

    const response = await network.post(
      api.aadharVerify,
      { applicationId, otp: action.payload.value },
      { headers: await getAppHeader() }
    );

    if (response.status === 200) {
      const currentStepId = _.get(
        response,
        "data.updatedApplicationObj.currentStepId"
      );
      user.linkedApplications[0].currentStepId = currentStepId;
      await SharedPropsService.setUser(user);

      await setDatastore(ROUTE.KYC_AADHAAR_VERIFICATION_OTP, "input", <
        TextInputProps
      >{ state: InputStateToken.SUCCESS });
      const routeObj = await nextStepCredStepper();
      await navigate(routeObj.routeId, routeObj.params);
    }
  }
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const resendOTP: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { network, setDatastore }
): Promise<any> => {
  const response = await network.post(
    api.aadharInit,
    {
      applicationId: action.payload.applicationId,
      aadhaarNumber: action.payload.aadhaarNumber,
    },
    { headers: await getAppHeader() }
  );
  if (response.status === 200) {
    await setDatastore(ROUTE.KYC_AADHAAR_VERIFICATION_OTP, "input", <
      TextInputProps
    >{ state: InputStateToken.DEFAULT });
  }
};
