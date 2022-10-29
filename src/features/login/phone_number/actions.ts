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
import { api } from "../../../configs/api";
import {
  config,
  defaultAuthHeaders,
  defaultHeaders,
} from "../../../configs/config";

let phoneNumber: string = "";
let isWhatsAppEnabled: boolean = false;

export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("action", action);
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
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  phoneNumber = phoneNumber.includes("+91") ? phoneNumber : `+91${phoneNumber}`;
  console.warn("**** using phoneNumber ****", phoneNumber);
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    loading: true,
  });

  const requestOptions = {
    method: "GET",
    headers: defaultAuthHeaders(),
  };

  await fetch(`${api.login}${phoneNumber}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      if (action.payload.isResend) return;
      console.log(result);
      if (result.status === "success") {
        await setDatastore(action.routeId, action.payload.widgetId, <
          ButtonProps
        >{
          loading: false,
        });
        await navigate(ROUTE.OTP_VERIFY, {
          phone_number: phoneNumber,
        });
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
      } else {
        await setDatastore(action.routeId, action.payload.widgetId, <
          ButtonProps
        >{
          loading: false,
        });
        await setDatastore(action.routeId, "input", <TextInputProps>{
          state: InputStateToken.ERROR,
        });
      }
    })
    .catch(async (error) => {
      console.warn("error", error);
      await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
        loading: false,
      });
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    });
};
export const textOnChange: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update phoneNumber ****", action.payload.value);
  phoneNumber = action.payload.value;
};
export const whatsappToggle: ActionFunction<WhatsAppEnabledPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** isWhatsApp Enabled ****", action.payload.value);
  isWhatsAppEnabled = action.payload.value;
};
