import { ActionFunction } from "@voltmoney/types";
import {
  ACTION as ACTION_CURRENT,
  BAVVerifyActionPayload,
  ToggleActionPayload,
} from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
  StepperStateToken,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";

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

  if (_.get(response, "data.updatedApplicationObj.currentStepId")) {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION =
      StepperStateToken.COMPLETED;
    await SharedPropsService.setUser(user);
    await showPopup({
      autoTriggerTimerInMilliseconds: 2000,
      isAutoTriggerCta: true,
      type: "SUCCESS",
      title: "Account verified successfully!",
      subTitle: "You will be redirected to next step in few seconds",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION_CURRENT.GO_NEXT,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: {
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
export const GoNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  const user: User = await SharedPropsService.getUser();
  user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION =
    StepperStateToken.COMPLETED;
  user.linkedApplications[0].stepStatusMap.MANDATE_SETUP =
    StepperStateToken.IN_PROGRESS;
  await SharedPropsService.setUser(user);
  await navigate(ROUTE.LOAN_AUTOPAY);
};