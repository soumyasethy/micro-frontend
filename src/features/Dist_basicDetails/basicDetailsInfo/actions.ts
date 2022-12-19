import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { EnableDisableCTA, InputPayload } from "./types";

let panNumber = "";
let fullName = "";
let mobileNumber = "";
let email = "";

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
    email) {
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
    email) {

    await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: true });

    const accountId = (await SharedPropsService.getUser())
      .linkedPartnerAccounts[0].accountId;


    const response = await network.post(
      `${partnerApi.customer}${accountId}${'/customer'}`,
      {
        email: email,
        panNumber: panNumber,
        phoneNumber: `+91${mobileNumber}`
      },
      { headers: await getAppHeader() }
    );
    console.log(response)
    console.warn("Data Object: " + JSON.stringify({
      panNumber,
      fullName,
      mobileNumber,
      email
    }));


    setTimeout(async () => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: false });
    }, 2000);

    // await navigate(ROUTE.PAN_CONFIRM_NAME, {
    //   name: response?.data.stepResponseObject?.fullName,
    //   panNumber: response?.data.stepResponseObject?.panNumber,
    //   targetRoute: action.payload.targetRoute,
    // });

  }
};
