import { ActionFunction } from "@voltmoney/types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { AadharInputPayload, ACTION } from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { aadharVerifyRepo } from "./repo";
import { AlertNavProps } from "../../popup_loader/types";

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
  { navigate }
): Promise<any> => {
  if (action.payload.value.length === 6) {
    const response = await aadharVerifyRepo(
      (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId,
      action.payload.value
    );
    if (response.hasOwnProperty("status") && response.status === "SUCCESS") {
      await navigate(ROUTE.KYC_PHOTO_VERIFICATION);
    } else if (response.message) {
      await navigate(ROUTE.ALERT_PAGE, {
        alertProps: <AlertNavProps>{
          title: response.statusCode,
          subTitle: response.message,
          ctaLabel: "Got It",
          ctaAction: {
            type: ACTION.GO_BACK,
            routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
            payload: {},
          },
        },
      });
    }
  }
};
