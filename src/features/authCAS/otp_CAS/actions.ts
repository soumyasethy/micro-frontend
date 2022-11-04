import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import { defaultHeaders } from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, goBack, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 5) return;
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
      console.log(response);
      await goBack();
      const nextRoute = await nextStepId(
        response.updatedApplicationObj.currentStepId
      );
      await navigate(nextRoute.routeId, nextRoute.params);
    })
    .catch(async (error) => {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
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
