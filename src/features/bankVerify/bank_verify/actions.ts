import { ActionFunction } from "@voltmoney/types";
import { BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
} from "@voltmoney/schema";
import { postBankRepo } from "./repo";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AadharInitPayload } from "../../kyc/kyc_init/types";
import { ACTION } from "../../kyc/kyc_otp/types";
import { ACTION as ACTION_CURRENT } from "./types";
import _ from "lodash";
let selectedWidget = undefined;
let ifscCode = undefined;
let bankAccountNumber = undefined;

export const ToggleSelectAction: ActionFunction<ToggleActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  ///unselected if any selected
  if (selectedWidget) {
    await setDatastore(action.routeId, selectedWidget, <SelectiveListItemProps>{
      state: SelectiveListItemStateTokens.NOT_SELECTED,
    });
    selectedWidget = undefined;
    ifscCode = undefined;
    bankAccountNumber = undefined;
  }
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    SelectiveListItemProps
  >{ state: SelectiveListItemStateTokens.SELECTED });
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    type: ButtonTypeTokens.LargeFilled,
  });
  selectedWidget = action.payload.targetWidgetId;
  ifscCode = action.payload.bankIfscCode;
  bankAccountNumber = action.payload.bankAccountNumber;
};

export const BavVerifyAction: ActionFunction<BAVVerifyActionPayload> = async (
  action,
  _datastore,
  { setDatastore, navigate, handleError, showPopup }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await postBankRepo(
    (
      await SharedPropsService.getUser()
    ).linkedApplications[0].applicationId,
    bankAccountNumber,
    ifscCode
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  console.warn("bavVerifyAction-->", response);
  if (_.get(response, "updatedApplicationObj.currentStepId")) {
    await showPopup({
      type: "SUCCESS",
      title: "Account verified successfully!",
      subTitle: "You will be redirected to next step in few seconds",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION_CURRENT.GO_NEXT,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: {
          currentStepId: _.get(response, "updatedApplicationObj.currentStepId"),
        },
      },
    });
  } else {
    await showPopup({
      type: "FAILED",
      title: "Verification failed!",
      subTitle: "We couldn't verify the account. Edit bank details & try again",
      ctaLabel: "Edit details",
      ctaAction: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: {},
      },
    });
  }
};
export const AddAccountNavAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  navigate(ROUTE.BANK_VERIFY_MANUALLY);
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const GoNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.KYC_STEPPER);
};
