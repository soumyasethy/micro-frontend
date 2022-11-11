import { ActionFunction } from "@voltmoney/types";
import { kycSummaryVerifyRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import {
  AadharInitPayload,
  NavigationNext,
  ToggleKYCVerifyCTA,
} from "../kyc_init/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import _ from "lodash";
export const verifyKycSummary: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore, showPopup, handleError }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const response = await kycSummaryVerifyRepo(applicationId);
  if (_.get(response, "updatedApplicationObj")) {
    await showPopup({
      title: "KYC done successfully!",
      subTitle: "You will be redirected to next step in few seconds",
      type: "SUCCESS",
      ctaLabel: "Proceed to verify bank account",
      primary: true,
      ctaAction: {
        type: ACTION.NAVIGATION_NEXT,
        routeId: ROUTE.KYC_SUMMARY,
        payload: <NavigationNext>{
          stepId: response.updatedApplicationObj.currentStepId,
        },
      },
    });
  } else {
    await handleError(response, {
      failed: "Verification failed!",
      ctaLabel: "Go Back",
    });
  }
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: false,
  });
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
