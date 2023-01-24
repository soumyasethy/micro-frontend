import { ActionFunction } from "@voltmoney/types";
import { ACTION, ContinuePayload, InputPayload } from "./types";
import { api } from "../../../../configs/api";
import { ROUTE } from "../../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import SharedPropsService from "../../../../SharedPropsService";
import { getAppHeader } from "../../../../configs/config";
import moment from "moment";
import { EnableDisableCTA } from "../../../login/phone_number/types";

let pan: string = "";
let dob: string = "";

export const verifyPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { network, asyncStorage, setDatastore, navigate, handleError, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    label: "",
    type: ButtonTypeTokens.LargeOutline,
    loading: true,
  });

  await SharedPropsService.setUserDob(dob);

  await network
    .post(
      api.panVerify,
      {
        applicationId: `${action.payload.applicationId}`,
        panNumber: `${pan}`,
        dob: dob,
      },
      { headers: await getAppHeader() }
    )
    .then(async (response) => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        label: "Continue",
        type: ButtonTypeTokens.LargeFilled,
        loading: false,
      });
      if (response?.data.stepResponseObject?.fullName) {
        response.data.stepResponseObject.panNumber = pan;
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
        const currentStepId = await response?.data.updatedApplicationObj
          .currentStepId;
        (
          await SharedPropsService.getUser()
        ).linkedApplications[0].currentStepId = currentStepId;

        await navigate(ROUTE.PAN_CONFIRM_NAME, {
          name: response?.data.stepResponseObject?.fullName,
          panNumber: response?.data.stepResponseObject?.panNumber,
          targetRoute: action.payload.targetRoute,
          currentStepId,
        });
      }
    })
    .catch(async (error) => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        label: "Continue",
        type: ButtonTypeTokens.LargeOutline,
        loading: false,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    });
  // .finally(() => {
  //   setDatastore(action.routeId, "continue", <ButtonProps>{
  //     label: "Continue",
  //     type: ButtonTypeTokens.LargeFilled,
  //     loading: false,
  //   });
  // });
};
export const PanOnChange: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  pan = action.payload.value;
};
export const CalendarOnChange: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { ...props }
): Promise<any> => {
  dob = `${moment(action.payload.value, "DD-MM-yyyy").valueOf()}`;
  if (dob) {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.KYC_PAN_VERIFICATION,
        payload: <EnableDisableCTA>{
          value: true,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  } else {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.KYC_PAN_VERIFICATION,
        payload: <EnableDisableCTA>{
          value: false,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  }
};

export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    ButtonProps
  >{
    type:
      action.payload.value && pan && dob
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
  });
};
