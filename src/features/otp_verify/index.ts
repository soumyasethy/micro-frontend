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
  ColorTokens, FontFamilyTokens,
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
import { ROUTE } from "../../routes";
import { ACTIONS, LoginAction, OTPPayload, ResendOtp } from "./types";
import { fetchUserContext, goBack, loginCognito, resendOtp } from "./actions";

export const template: (
  phone_number: number,
  session?: any,
  isWhatsAppEnabled?: boolean
) => TemplateSchema = (phone_number, session, isWhatsAppEnabled) => {
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
        fontWeight: '700'
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
        charLimit: 6,
        action: {
          type: ACTIONS.LoginWithCognito,
          routeId: ROUTE.OTP_VERIFY,
          payload: <LoginAction & OTPPayload>{
            username: `${phone_number}`,
            password: "123456",
            session: session,
            isWhatsAppEnabled,
            value: "",
            widgetId: "input",
          },
        },
        otpAction: {
          type: ACTIONS.RESEND_OTP_NUMBER,
          payload: <ResendOtp>{
            phoneNumber: `${phone_number}`,
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
  onLoad: async (_, { phone_number, session, isWhatsAppEnabled }) => {
    // const response = await cognitoCheckUserExist(phone_number);
    console.warn("*** AWS Response ***", session);
    return Promise.resolve(template(phone_number, session, isWhatsAppEnabled));
  },
  actions: {
    [ACTIONS.LoginWithCognito]: loginCognito,
    [ACTIONS.GO_BACK]: goBack,
    // [ACTIONS.GO_BACK]: fetchUserContext,
    [ACTIONS.RESEND_OTP_NUMBER]: resendOtp,
  },
};
