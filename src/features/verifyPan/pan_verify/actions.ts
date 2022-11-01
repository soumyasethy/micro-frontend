import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { api } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

let pan: string = "";

export const verifyPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });

  const raw = JSON.stringify({
    applicationId: `${action.payload.applicationId}`,
    panNumber: `${pan}`,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  await fetch(api.panVerify, requestOptions)
    .then(async (response) => await response.json())
    .then(async (result) => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
      if (result.stepResponseObject.fullName) {
        result.stepResponseObject.panNumber = pan;
        console.warn("success pan ", result);

        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
        const currentStepId = await result.updatedApplicationObj.currentStepId;
        (
          await SharedPropsService.getUser()
        ).linkedApplications[0].currentStepId = currentStepId;

        await props.navigate(ROUTE.PAN_CONFIRM_NAME, {
          name: result.stepResponseObject.fullName,
          panNumber: result.stepResponseObject.panNumber,
          targetRoute: action.payload.targetRoute,
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
