import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  ContinuePayload,
  EnableDisableCTA,
  WhatsAppEnabledPayload,
} from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";

import { api, partnerApi } from "../../../configs/api";
import { getAuthHeaders, getPartnerAuthHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

let phoneNumber: string = "";
let isWhatsAppEnabled: boolean = true;

/* check userType and call required function */


/* check userType and call required function */
export const sendOtpWithUserTypeCheck: ActionFunction<any> = async (
  action,
  _datastore,  { ...props }
): Promise<any> => {
  const userType = await SharedPropsService.getUserType();
  switch (userType) {
    case "PARTNER":
      await sendPartnerOtp(action,{},props);
      break;
    case "BORROWER":
      await sendOtp(action,{},props);
      break;
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

export const sendOtp: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  phoneNumber = phoneNumber.includes("+91") ? phoneNumber : `+91${phoneNumber}`;


  if (phoneNumber.length === 13) {
    await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
      loading: true,
    });

    const urlParams = `${await SharedPropsService.getUrlParams()}`.split("?");
    const requestUrl = `${api.login}${phoneNumber}`;
    const response = await network.get(
      `${requestUrl}?enableWhatsapp=${isWhatsAppEnabled}${
        urlParams.length > 1 ? `&${urlParams[1]}` : ""
      }`,
      {
        headers: await getAuthHeaders(),
      }
    );

    if (response.status === 200) {
      await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
        loading: false,
      });
      if (action.payload.isResend == false) {
        await navigate(ROUTE.OTP_VERIFY, {
          phone_number: phoneNumber,
        });
      }
      if (action.payload.isResend == false) {
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
      }
    } else {
      await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
        loading: false,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    }
  } else {
    await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
      loading: false,
    });
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
};

export const sendPartnerOtp: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  phoneNumber = phoneNumber.includes("+91") ? phoneNumber : `+91${phoneNumber}`;


  if (phoneNumber.length === 13) {
    await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
      loading: true,
    });

    const response = await network.get(`${partnerApi.login}${phoneNumber}`, {
      headers: getPartnerAuthHeaders(),
    });
    if (response.status === 200) {
      await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
        loading: false,
      });
      await navigate(ROUTE.OTP_VERIFY, {
        phone_number: phoneNumber,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
    } else {
      await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
        loading: false,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    }
  } else {
    await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
      loading: false,
    });
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
};

export const textOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { }
): Promise<any> => {
  phoneNumber = action.payload.value;
};
export const whatsappToggle: ActionFunction<WhatsAppEnabledPayload> = async (
  action,
  _datastore,
  { }
): Promise<any> => {
  isWhatsAppEnabled = action.payload.value;
};

export const goToPrivacy: ActionFunction<{}> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.PRIVACY_POLICY);
};
