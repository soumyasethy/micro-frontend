import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  StepperStateToken,
} from "@voltmoney/schema";
import {
  ACTION as ACTION_CURRENT,
  BAVVerifyActionPayload,
} from "../bank_account_verification/types";
import {
  ACTION,
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { StepStatusMap, User } from "../../login/otp_verify/types";
import {
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../../configs/utils";
import {TextConstants} from "../../../configs/constants";

let bankAccountNumber = "";
let bankIfsc = "";

export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.BANK_SEARCH_BRANCH, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
    bankAccountNumber,
  });
};
export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  bankAccountNumber = action.payload.value;
  await SharedPropsService.setAccountNumber(bankAccountNumber);
  await ToggleCTA(action, _datastore, props);
};
export const onChangeIFSCNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  bankIfsc = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};

export const ToggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  if (bankAccountNumber && bankIfsc) {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
  } else {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeOutline,
    });
  }
};

export const BavVerifyManualAction: ActionFunction<
  BAVVerifyActionPayload
> = async (
  action,
  _datastore,
  { setDatastore, network, showPopup, goBack }
): Promise<any> => {
  if (!bankAccountNumber || !bankIfsc) return;
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  await showPopup({
    title: "Depositing Rs 1",
    subTitle: "We’re doing this to verify your account.",
    type: "LOADING",
    iconName: IconTokens.Coin,
  });
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;

  const response = await network.post(
    api.bavVerify,
    {
      applicationId,
      bankAccountDetails: {
        bankAccountNumber,
        bankIfscCode: bankIfsc,
      },
    },
    { headers: await getAppHeader() },
    async () => {
      //dismiss modal -> Depositing Rs 1
      await goBack();
    }
  );
  const stepStatusMap: StepStatusMap = _.get(
    response,
    "data.updatedApplicationObj.stepStatusMap",
    null
  );
  const currentStepId = _.get(
    response,
    "data.updatedApplicationObj.currentStepId",
    null
  );

  if (currentStepId && stepStatusMap) {
    await updateCurrentStepId(currentStepId);
    await updateStepStatusMap(stepStatusMap);
    await goBack();
  }

  if (stepStatusMap.BANK_ACCOUNT_VERIFICATION === StepperStateToken.COMPLETED) {
    // user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN =
    //   StepperStateToken.IN_PROGRESS;
    // user.linkedApplications[0].stepStatusMap.MANDATE_SETUP =
    //   StepperStateToken.IN_PROGRESS;
    await showPopup({
      autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
      isAutoTriggerCta: false,
      type: "SUCCESS",
      title: "Account verified successfully!",
      subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION_CURRENT.GO_NEXT,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: {
          currentStepId: currentStepId,
        },
      },
    });
  } else if (
    stepStatusMap.BANK_ACCOUNT_VERIFICATION ===
    StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    await showPopup({
      autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
      isAutoTriggerCta: false,
      type: "DEFAULT",
      iconName: IconTokens.InProgress,
      title: "Verification in progress",
      subTitle:
        "It's taking longer than usual to verify the account. We'll automatically try again in some time.",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION.NAV_STEPPER,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: {},
      },
    });
  }
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
};
export const ChangeBankGoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const GoToStepper: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER);
};
