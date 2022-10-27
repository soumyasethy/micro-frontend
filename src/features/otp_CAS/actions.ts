import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import SharedPropsService from "../../SharedPropsService";
import { ROUTE } from "../../routes";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, goBack, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const headers = new Headers();
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId: action.payload.applicationId,
    otp: action.payload.value,
    assetRepository: action.payload.assetRepository,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  await fetch(api.authCAS, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
      console.log(result);
      await goBack();
      await navigate(ROUTE.KYC_STEPPER);
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
