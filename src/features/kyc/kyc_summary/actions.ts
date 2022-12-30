import { ActionFunction } from "@voltmoney/types";
import SharedPropsService from "../../../SharedPropsService";
import {
  AadharInitPayload,
  NavigationNext,
  ToggleKYCVerifyCTA,
} from "../kyc_init/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  StepperStateToken,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import _ from "lodash";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";
import { AnalyticsEventTracker } from "../../../configs/constants";
export const verifyKycSummary: ActionFunction<any> = async (
  action,
  _datastore,
  { network, setDatastore, showPopup, analytics }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const response = await network.get(
    `${api.kycSummaryVerify}${applicationId}`,
    { headers: await getAppHeader() }
  );
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: false,
  });
  if (_.get(response, "data.updatedApplicationObj.currentStepId", false)) {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY =
      StepperStateToken.COMPLETED;
    user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION =
      StepperStateToken.COMPLETED;
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION =
      StepperStateToken.COMPLETED;
    user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION =
      StepperStateToken.IN_PROGRESS;
    await SharedPropsService.setUser(user);

    analytics(AnalyticsEventTracker.borrower_kyc_complete["Event Name"], {
      ...AnalyticsEventTracker.borrower_kyc_complete,
    });

    await showPopup({
      autoTriggerTimerInMilliseconds: APP_CONFIG.AUTO_REDIRECT,
      isAutoTriggerCta: true,
      title: "KYC done successfully!",
      subTitle: "You will be redirected to next step in few seconds",
      type: "SUCCESS",
      ctaLabel: "Continue",
      primary: true,
      ctaAction: {
        type: ACTION.NAVIGATION_NEXT,
        routeId: ROUTE.KYC_SUMMARY,
        payload: <NavigationNext>{
          stepId: _.get(response, "data.updatedApplicationObj.currentStepId"),
        },
      },
    });
  }
};

export const NavigateNext: ActionFunction<NavigationNext> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  if (action.payload.stepId) await navigate(action.payload.stepId);
};

export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};

export const ToggleKYCSummaryCTA: ActionFunction<ToggleKYCVerifyCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    type: action.payload.value
      ? ButtonTypeTokens.LargeFilled
      : ButtonTypeTokens.LargeOutline,
  });
};
