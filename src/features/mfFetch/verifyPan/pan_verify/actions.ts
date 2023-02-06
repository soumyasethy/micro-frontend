import { ActionFunction } from "@voltmoney/types";
import { ACTION, ContinuePayload, InputPayload } from "./types";
import { api } from "../../../../configs/api";
import { ROUTE } from "../../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens, CalendarProps, CalendarStateToken,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import SharedPropsService from "../../../../SharedPropsService";
import {getAppHeader, RegexConfig} from "../../../../configs/config";
import moment from "moment";
import { EnableDisableCTA } from "../../../login/phone_number/types";
import { User } from "../../../login/otp_verify/types";

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

        const userContextResponse = await network.post(
          api.userContext,
          {
            onboardingPartnerCode: await SharedPropsService.getPartnerRefCode(),
          },
          { headers: await getAppHeader() }
        );
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);
        action?.payload?.setIsUserLoggedIn(user);

        // const user = await SharedPropsService.getUser();
        // await SharedPropsService.setUser(user);
        // action?.payload?.setIsUserLoggedIn(user);

        await navigate(ROUTE.PAN_CONFIRM_NAME, {
          name: response?.data.stepResponseObject?.fullName,
          panNumber: response?.data.stepResponseObject?.panNumber,
          targetRoute: action.payload.targetRoute,
          currentStepId,
          setIsUserLoggedIn: action?.payload?.setIsUserLoggedIn,
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

//returns whether validation is successful or not
export const ValidateForm: ActionFunction<InputPayload> = async (
    action,
    _datastore,
    { ...props }
): Promise<any> => {
  let isDobComplete = false;
  //1. Store the action value, 2. Validate individual and take action, 3. Take action on form
  switch (action.payload.widgetId) {
    case "input": {
      pan = action.payload.value;
      break;
    }
    case "calendarPicker": {
      if(action.payload.value && action.payload.value.length == 10) {
        isDobComplete = true;
      }

      dob = `${moment(action.payload.value, "DD-MM-yyyy").valueOf()}`;
      break;
    }
  }

  let currentDate = Date.now();
  let minDate = (currentDate - 65 * 31557600000);
  let maxDate = (currentDate - 18 * 31557600000);

  const panRegex = new RegExp(RegexConfig.PAN);
  let isDobValid:Boolean = (parseInt(dob) >= minDate && parseInt(dob) <= maxDate);
  let isPanValid:Boolean = panRegex.test(pan);

  if (isDobValid) {
    let dobInddMMyyyy = moment.unix(Number(dob) / 1000).format("DD-MM-yyyy");
    await SharedPropsService.setUserDob(dobInddMMyyyy);
    await props.setDatastore(action.routeId, "calendarPicker", {
      state: CalendarStateToken.DEFAULT
    });
  } else if(isDobComplete) {
    //If dob is not valid but is complete in terms of format dd-MM-yyyy then throw error
    await props.setDatastore(action.routeId, "calendarPicker", {
      state: CalendarStateToken.ERROR
    });
  }

  let isValid = isDobValid && isPanValid;

  await toggleCTA({
    type: ACTION.ENABLE_CONTINUE,
    routeId: ROUTE.KYC_PAN_VERIFICATION,
    payload: <EnableDisableCTA>{
      value: isValid,
      targetWidgetId: "continue",
    },
  }, {}, props);
}

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
