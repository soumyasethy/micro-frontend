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
import { checkUserType, goBack, login } from "./actions";
import { sendOtp } from "../phone_number/actions";
import { ContinuePayload } from "../phone_number/types";

export const template: (
  phone_number: number,
  isWhatsAppEnabled?: boolean,
  setIsUserLoggedIn?: (isUserLoggedIn: boolean) => void
) => TemplateSchema = (phone_number, isWhatsAppEnabled, setIsUserLoggedIn) => {
  return {
    layout: <Layout>{
      id: ROUTE.OTP_VERIFY,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "space0", type: WIDGET.SPACE },
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
        fontWeight: "600",
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          { id: "subTitle2", type: WIDGET.TEXT },
          { id: "editNumber", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTIONS.GO_BACK,
          payload: {},
          routeId: ROUTE.OTP_VERIFY,
        },
      },
      subTitle: <TypographyProps>{
        label: `We’ve sent an OTP to `,
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
      subTitle2: <TypographyProps>{
        label: `${phone_number}`.substring(3),
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
      },
      editNumber: <TypographyProps>{
        label: `   Edit`,
        color: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        paddingLeft: 6,
        paddingRight: 6,
      },
      input: <TextInputProps & TextInputOtpProps & WidgetProps>{
        isFocus: true,
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
            setIsUserLoggedIn,
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
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const otpVerifyMF: PageType<any> = {
  onLoad: async (_, { phone_number, isWhatsAppEnabled, setIsUserLoggedIn }) => {
    return Promise.resolve(
      template(phone_number, isWhatsAppEnabled, setIsUserLoggedIn)
    );
  },
  actions: {
    [ACTIONS.LoginWithCognito]: checkUserType,
    [ACTIONS.GO_BACK]: goBack,
    [ACTIONS.RESEND_OTP_NUMBER]: sendOtp,
  },
  clearPrevious: true,
};
