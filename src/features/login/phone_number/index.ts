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
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconSizeTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  RadioProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackFlexWrap,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  ContinuePayload,
  EnableDisableCTA,
  PhoneNumberPayload,
  WhatsAppEnabledPayload,
} from "./types";
import { sendOtp, textOnChange, toggleCTA, whatsappToggle } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PHONE_NUMBER,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space0", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "space2", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "space3", type: WIDGET.SPACE },
      { id: "whatsappStack", type: WIDGET.STACK },
      { id: "space4", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        // position: POSITION.FIXED_BOTTOM,
      },
      { id: "space5", type: WIDGET.SPACE },
      { id: "stackText", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.CONTINUE,
        payload: <ContinuePayload>{
          value: "",
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    title: <TypographyProps>{
      label: "Enter your mobile number",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    subTitle: <TypographyProps>{
      label: "We’ll send an OTP to verify this number",
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.PHONE_NUMBER,
        payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
      caption: { error: "Enter a valid 10 digit mobile number" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.MD },
    space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    whatsapp_space: <SpaceProps>{ size: SizeTypeTokens.XS },
    whatsappStack: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "radio", type: WIDGET.RADIO },
        { id: "whatsapp_space", type: WIDGET.SPACE },
        { id: "whatsapp", type: WIDGET.TEXT },
      ],
    },
    radio: <RadioProps>{
      isChecked: true,
      size: IconSizeTokens.MD,
      actionChecked: {
        type: ACTION.WHATSAPP_CHECK,
        payload: <WhatsAppEnabledPayload>{ value: true, widgetId: "radio" },
        routeId: ROUTE.PHONE_NUMBER,
      },
      actionUnChecked: {
        type: ACTION.WHATSAPP_UNCHECK,
        payload: <WhatsAppEnabledPayload>{ value: false, widgetId: "radio" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    whatsapp: <TypographyProps>{
      label: "Get updates on WhatsApp",
      fontSize: FontSizeTokens.XXS,
      color: ColorTokens.Grey_Night,
    },
    space5: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    stackText: <StackProps & WidgetProps>{
      flexWrap: StackFlexWrap.wrap,
      type: StackType.column,
      alignItems: StackAlignItems.flexStart,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "stack2", type: WIDGET.STACK },
        { id: "text5", type: WIDGET.TEXT },
      ],
    },
    stack2: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      widgetItems: [
        {id: "text1", type: WIDGET.TEXT},
        {id: "text2", type: WIDGET.TEXT},
        {id: "text3", type: WIDGET.TEXT},
        {id: "text4", type: WIDGET.TEXT},
      ]
    },
    text1: <TypographyProps>{
      label: "By proceeding, I accept ",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Black,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    text2: <TypographyProps>{
      label: "T&Cs, Privacy Policy ",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Blue_700,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    text3: <TypographyProps>{
      label: "and ",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Black,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    text4: <TypographyProps>{
      label: "Authorize ",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Blue_700,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    text5: <TypographyProps>{
      label: "to obtain my cKYC & credit report.",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Black,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
  },
};

export const phoneNumberMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CONTINUE]: sendOtp,
    [ACTION.PHONE_NUMBER]: textOnChange,
    [ACTION.WHATSAPP_CHECK]: whatsappToggle,
    [ACTION.WHATSAPP_UNCHECK]: whatsappToggle,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
