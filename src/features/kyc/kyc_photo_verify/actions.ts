import { ActionFunction } from "@voltmoney/types";
import { defaultHeaders } from "../../../configs/config";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { ButtonProps } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "../kyc_otp/types";
import { AadharInitPayload, NavigationNext } from "../kyc_init/types";

export const PhotoVerifyAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, handleError, showPopup }
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
  if (response.status === "SUCCESS")
    await navigate(response.updatedApplicationObj.currentStepId);
  else {
    await showPopup({
      title: "Verification failed!",
      subTitle: "We couldn't verify the account. Retake your photo & try again",
      type: "FAILED",
      ctaLabel: "Retake",
      primary: true,
      ctaAction: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.KYC_AFTER_CAMERA,
        payload: {},
      },
    });
  }
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
