import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { api, StoreKey } from "../../configs/api";
import { ROUTE } from "../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";

let pan: string = "";

export const verifyPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const token = await asyncStorage.get(StoreKey.accessToken);
  const headers = new Headers();
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId: `${action.payload.applicationId}`,
    panNumber: `${pan}`,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  await fetch(api.panVerify, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
      if (result.stepResponseObject.fullName) {
        console.warn("success pan ", result);
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
        const currentStepId = result.updatedApplicationObj.currentStepId;
        await props.navigate(ROUTE.PAN_CONFIRM_NAME, {
          name: result.stepResponseObject.fullName,
          panNumber: pan,
          targetRoute: action.payload.targetRouteId,
          currentStepId,
        });
      } else {
        console.warn("failed pan ", result);
        await setDatastore(action.routeId, "continue", <ButtonProps>{
          type: ButtonTypeTokens.LargeOutline,
        });
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.ERROR,
        });
      }
    })
    .catch(async (error) => {
      console.log("error", error);
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    });
};
export const textOnChange: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update pan ****", action.payload.value);
  pan = action.payload.value;
};
