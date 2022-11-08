import { ActionFunction } from "@voltmoney/types";
import { kycSummaryVerifyRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import { AadharInitPayload, ToggleKYCVerifyCTA } from "../kyc_init/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";

export const verifyKycSummary: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const response = await kycSummaryVerifyRepo(applicationId);
  console.warn("verifyKycSummary->", response);
  await setDatastore(ROUTE.KYC_SUMMARY, "continue", <ButtonProps>{
    loading: false,
  });
  if (response.updatedApplicationObj.currentStepId)
    await navigate(response.updatedApplicationObj.currentStepId);
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
