import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import { defaultHeaders } from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";
import { ACTION } from "../../kyc/kyc_otp/types";
import { ROUTE } from "../../../routes";
import _ from "lodash";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  {
    navigate,
    setDatastore,
    asyncStorage,
    handleError,
    network,
    goBack,
    ...props
  }
): Promise<any> => {
  if (action.payload.value.length !== 6) return;
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const raw = JSON.stringify({
    applicationId: action.payload.applicationId,
    otp: action.payload.value,
    assetRepository: action.payload.assetRepository,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  await fetch(api.authCAS, requestOptions)
    .then((response) => response.json())
    .then(async (response) => {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });

      await goBack();

      if (_.get(response, "updatedApplicationObj.currentStepId", false)) {
        const nextRoute = await nextStepId(
          response.updatedApplicationObj.currentStepId
        );
        nextRoute.params = { ...nextRoute.params, response };
        await navigate(nextRoute.routeId, nextRoute.params);
      } else {
        await handleError(response, {
          failed: "Verification failed!",
          ctaLabel: "Go Back",
        });
      }
    })
    .catch(async (error) => {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
      await handleError(error, {
        failed: "Verification failed!",
        ctaLabel: "Go Back",
        ctaAction: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.OTP_AUTH_CAS,
          payload: {},
        },
      });
      console.log("error", error);
    });
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
