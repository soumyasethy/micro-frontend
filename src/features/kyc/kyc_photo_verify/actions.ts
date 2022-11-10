import { ActionFunction } from "@voltmoney/types";
import { defaultHeaders } from "../../../configs/config";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { ButtonProps } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { AlertNavProps } from "../../popup_loader/types";
import { ACTION } from "../kyc_otp/types";
import { AadharInitPayload } from "../kyc_init/types";

export const PhotoVerifyAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, handleError }
): Promise<any> => {
  console.warn("**** PhotoVerify Action Triggered ****", action);

  const raw = JSON.stringify({
    applicationId: (await SharedPropsService.getUser()).linkedApplications[0]
      .applicationId,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await fetch(api.photoVerify, requestOptions)
    .then((response) => response.json())
    .catch(async (error) => {
      console.log("error", error);
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
    });
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  await handleError(response, {
    success: "KYC done successfully!",
    failed: "Verification failed!",
    ctaLabel: "Retake",
    ctaAction: {
      type: ACTION.GO_BACK,
      routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
      payload: {},
    },
  });
  if (response.status === "SUCCESS")
    await navigate(response.updatedApplicationObj.currentStepId);
};
export const RetakePhoto: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
  await goBack();
};
