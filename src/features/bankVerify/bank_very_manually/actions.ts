import { ActionFunction } from "@voltmoney/types";
import { ButtonProps, ButtonTypeTokens, IconTokens } from "@voltmoney/schema";
import { BAVVerifyActionPayload } from "../bank_verify/types";
import { postBankRepo } from "../bank_verify/repo";
import {
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AlertNavProps } from "../../popup_loader/types";
import { showBottomSheet } from "../../../configs/utils";
import {ACTION} from "../../kyc/kyc_otp/types";

let bankAccountNumber = "";
let bankIfsc = "";

export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  console.warn("**** NavigationSearchIFSCAction Triggered ****", action);
  await navigate(ROUTE.BANK_BRANCH_SEARCH, {
    bankCode: action.payload.bankCode,
  });
};
export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  console.warn("**** onChangeAccountNumber Action Triggered ****", action);
  bankAccountNumber = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};
export const onChangeIFSCNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  console.warn("**** onChangeIFSCNumber Action Triggered ****", action);
  bankIfsc = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};

export const ToggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("**** ToggleCTA Action Triggered ****", action);
  if (bankAccountNumber && bankIfsc)
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
  else
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeOutline,
    });
};

export const BavVerifyManualAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { setDatastore, handleError }): Promise<any> => {
  console.warn("**** BavVerifyManualAction Action Triggered ****", action);
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await postBankRepo(
    (
      await SharedPropsService.getUser()
    ).linkedApplications[0].applicationId,
    bankAccountNumber,
    bankIfsc
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  console.warn(
    "currentStepId-->",
    response.updatedApplicationObj.currentStepId
  );
  await handleError(response, {
    success: "Account verified successfully!",
    failed: "Verification failed!",
    ctaLabel: "Retake",
    ctaAction: {
      type: ACTION.GO_BACK,
      routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
      payload: {},
    },
  });
};
export const ChangeBankGoBackAction: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { goBack }): Promise<any> => {
  await goBack();
};
