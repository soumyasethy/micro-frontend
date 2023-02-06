import { ActionFunction } from "@voltmoney/types";
import {
  ACTION,
  BAVVerifyActionPayload,
  NextNavPayload,
  ToggleActionPayload,
} from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { StepStatusMap } from "../../login/otp_verify/types";
import {
  nextStepCredStepper,
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../../configs/utils";
import {TextConstants} from "../../../configs/constants";

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
  } else {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      SelectiveListItemProps
    >{ state: SelectiveListItemStateTokens.SELECTED });
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
    selectedWidget = action.payload.targetWidgetId;
    ifscCode = action.payload.bankIfscCode;
    bankAccountNumber = action.payload.bankAccountNumber;
  }
};

export const BavVerifyAction: ActionFunction<BAVVerifyActionPayload> = async (
  action,
  _datastore,
  { setDatastore, network, showPopup }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  const response = await network.post(
    api.bavVerify,
    {
      applicationId,
      bankAccountDetails: {
        bankAccountNumber,
        bankIfscCode: ifscCode,
      },
    },
    { headers: await getAppHeader() }
  );
  const currentStepId = _.get(
    response,
    "data.updatedApplicationObj.currentStepId"
  );
  const stepStatusMap: StepStatusMap = _.get(
    response,
    "data.updatedApplicationObj.stepStatusMap"
  );
  if (currentStepId && stepStatusMap) {
    await updateCurrentStepId(currentStepId);
    await updateStepStatusMap(stepStatusMap);
    await showPopup({
      autoTriggerTimerInMilliseconds: APP_CONFIG.AUTO_REDIRECT,
      isAutoTriggerCta: false,
      type: "SUCCESS",
      title: "Account verified successfully!",
      subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION.GO_NEXT,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: <NextNavPayload>{
          currentStepId: _.get(
            response,
            "data.updatedApplicationObj.currentStepId"
          ),
        },
      },
    });
  }

  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
};
export const AddAccountNavAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  navigate(ROUTE.BANK_SELECT);
};
export const GoBackAction: ActionFunction<{}> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER);
};
export const GoNext: ActionFunction<NextNavPayload> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  const routeObj = await nextStepCredStepper();
  await navigate(routeObj.routeId, routeObj.params);
};
