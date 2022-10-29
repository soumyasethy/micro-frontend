import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputOtpProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS, LoginAction, OTPPayload } from "./types";
import { goBack, login } from "./actions";
import { sendOtp } from "../phone_number/actions";
import { ContinuePayload } from "../phone_number/types";

export const template: (
  phone_number: number,
  isWhatsAppEnabled?: boolean
) => TemplateSchema = (phone_number, isWhatsAppEnabled) => {
  return {
    layout: <Layout>{
      id: ROUTE.OTP_VERIFY,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitleStack", type: WIDGET.STACK },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
      ],
    },
    datastore: <Datastore>{
      back: <ButtonProps>{
        type: ButtonTypeTokens.IconGhost,
        icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
      },
      title: <TypographyProps>{
        label: "Enter OTP",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          { id: "editNumber", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTIONS.GO_BACK,
          payload: {},
          routeId: ROUTE.OTP_VERIFY,
        },
      },
      subTitle: <TypographyProps>{
        label: `A 6-digit OTP was sent on ${phone_number} `,
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
      },
      editNumber: <TypographyProps>{
        label: `Edit`,
        color: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
      },
      input: <TextInputProps & TextInputOtpProps & WidgetProps>{
        title: "Enter OTP",
        type: InputTypeToken.OTP,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: 4,
        action: {
          type: ACTIONS.LoginWithCognito,
          routeId: ROUTE.OTP_VERIFY,
          payload: <LoginAction & OTPPayload>{
            username: `${phone_number}`,
            password: "123456",
            isWhatsAppEnabled,
            value: "",
            widgetId: "input",
          },
        },
        otpAction: {
          type: ACTIONS.RESEND_OTP_NUMBER,
          payload: <ContinuePayload>{
            value: `${phone_number}`,
            widgetId: "input",
            isResend: true,
          },
          routeId: ROUTE.OTP_VERIFY,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.MD },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const otpVerifyMF: PageType<any> = {
  onLoad: async (_, { phone_number, isWhatsAppEnabled }) => {
    return Promise.resolve(template(phone_number, isWhatsAppEnabled));
  },
  actions: {
    [ACTIONS.LoginWithCognito]: login,
    [ACTIONS.GO_BACK]: goBack,
    [ACTIONS.RESEND_OTP_NUMBER]: sendOtp,
  },
};
