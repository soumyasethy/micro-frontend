import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION, EnableDisableCTA, InputPayload } from "./types";
import moment from "moment";

let panNumber = "";
let fullName = "";
let mobileNumber = "";
let email = "";
let dob: string = "";

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
        routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
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
        routeId: ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO,
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

export const onChangeInput: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  switch (action.payload.widgetId) {
    case "panNumberInput": {
      panNumber = action.payload.value;
      break;
    }
    case "fullNameInput": {
      fullName = action.payload.value;
      break;
    }
    case "mobileNumberInput": {
      mobileNumber = action.payload.value;
      break;
    }
    case "emailInput": {
      email = action.payload.value;
      break;
    }
  }

  if (
    panNumber &&
    fullName &&
    mobileNumber &&
    email && dob) {
    await setDatastore(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    })
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
      type: action.payload.value
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
    });
};

export const triggerCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { network, setDatastore, navigate }
): Promise<any> => {

  if (panNumber &&
    mobileNumber &&
    email && dob) {

    await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: true });

    const accountId = (await SharedPropsService.getUser())
      .linkedPartnerAccounts[0].accountId;


  await network
  .post(
    `${partnerApi.customer}${accountId}${'/customer'}`,
    {
      email: email,
        panNumber: panNumber,
        phoneNumber: `+91${mobileNumber}`,
        dob:dob
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

     await SharedPropsService.setApplicationId(response?.data.updatedApplicationObj?.applicationId);
      // await setDatastore(action.routeId, "input", <TextInputProps>{
      //   state: InputStateToken.SUCCESS,
      // });
      // const currentStepId = await response?.data.updatedApplicationObj
      //   .currentStepId;
      // (
      //   await SharedPropsService.getUser()
      // ).linkedApplications[0].currentStepId = currentStepId;

      await navigate(ROUTE.DETAILS_CONFIRM, {
        name: response?.data.stepResponseObject?.fullName,
        targetRoute: ROUTE.DETAILS_CONFIRM,
      });
    }
  })
  .catch(async (error) => {
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeOutline,
      loading: false,
    });
    // await setDatastore(action.routeId, "input", <TextInputProps>{
    //   state: InputStateToken.ERROR,
    // });
  });


    // const response = await network.post(
    //   `${partnerApi.customer}${accountId}${'/customer'}`,
    //   {
    //     email: email,
    //     panNumber: panNumber,
    //     phoneNumber: `+91${mobileNumber}`,
    //     dob:dob
    //   },
    //   { headers: await getAppHeader() }
    // );
    // console.log(response)

    console.warn("Data Object: " + JSON.stringify({
      panNumber,
      fullName,
      mobileNumber,
      email,
      dob
    }));


    // setTimeout(async () => {
    //   await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: false });
    // }, 2000);

    // await navigate(ROUTE.PAN_CONFIRM_NAME, {
    //   name: response?.data.stepResponseObject?.fullName,
    //   panNumber: response?.data.stepResponseObject?.panNumber,
    //   targetRoute: action.payload.targetRoute,
    // });

  }
};
