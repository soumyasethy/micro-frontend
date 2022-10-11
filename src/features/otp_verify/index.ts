import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  keyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTIONS, LoginAction, OTPPayload } from "./types";
import { loginCognito, otpOnChange, resendOtp } from "./actions";

export const template: (
  phone_number: number,
  session?: any
) => TemplateSchema = (phone_number, session) => {
  return {
    layout: <Layout>{
      id: ROUTE.OTP_VERIFY,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
        {
          id: "login",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "title", type: WIDGET.TEXT },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "resend_otp", type: WIDGET.BUTTON },
      ],
    },
    datastore: <Datastore>{
      back: <ButtonProps>{
        type: ButtonTypeTokens.IconGhost,
        icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
      },
      login: <ButtonProps & WidgetProps>{
        label: "login",
        type: ButtonTypeTokens.LargeElevated,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTIONS.LoginWithCognito,
          payload: <LoginAction>{
            username: `${phone_number}`,
            password: "123456",
            session: session,
          },
          routeId: ROUTE.OTP_VERIFY,
        },
      },
      title: <TypographyProps>{
        label: "Enter OTP",
        fontSize: FontSizeTokens.XXL,
      },
      subTitle: <TypographyProps>{
        label: `Please enter 4-digit code sent on your phone number ${phone_number} Edit`,
      },
      input: <TextInputProps & WidgetProps>{
        caption: "Enter your OTP",
        title: "Enter your OTP",
        keyboardType: keyboardTypeToken.numberPad,
        action: {
          type: ACTIONS.OTP_NUMBER,
          routeId: ROUTE.OTP_VERIFY,
          payload: <OTPPayload>{ value: "", widgetId: "input" },
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
      resend_otp: <ButtonProps & WidgetProps>{
        label: "Resend OTP",
        type: ButtonTypeTokens.LargeElevated,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTIONS.RESEND_OTP_NUMBER,
          payload: <LoginAction>{
            username: `${phone_number}`,
            password: "123456",
            session: session,
            isWhatsappEnabled: true,
          },
          routeId: ROUTE.OTP_VERIFY,
        },
      },
    },
  };
};

export const otpVerifyMF: PageType<any> = {
  onLoad: async (_, { phone_number, session }) => {
    // const response = await cognitoCheckUserExist(phone_number);
    console.warn("*** AWS Response ***", session);
    return Promise.resolve(template(phone_number, session));
  },
  actions: {
    [ACTIONS.LoginWithCognito]: loginCognito,
    [ACTIONS.OTP_NUMBER]: otpOnChange,
    [ACTIONS.RESEND_OTP_NUMBER]: resendOtp,
  },
};
