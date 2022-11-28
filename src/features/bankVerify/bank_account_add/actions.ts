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
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";

let bankAccountNumber = "";
let bankIfsc = "";

export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.BANK_SEARCH_BRANCH, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
  });
};
export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  bankAccountNumber = action.payload.value;
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
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  await showPopup({
    title: "Depositing Rs 1",
    subTitle: "We’re doing this to verify your account.",
    type: "LOADING",
    iconName: IconTokens.Coin,
  });

  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
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

  if (_.get(response, "data.updatedApplicationObj.currentStepId")) {
    await goBack();
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION =
      StepperStateToken.COMPLETED;
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP =
      StepperStateToken.IN_PROGRESS;
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
  } /* else if (_.get(response, "data.stepResponseObject")) {
    await showPopup({
      autoTriggerTimerInMilliseconds: 2000,
      isAutoTriggerCta: true,
      type: "IN_PROGRESS",
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
  }*/
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
