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
  ColorTokens,
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  RadioProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import {
  ACTION,
  ContinuePayload,
  PhoneNumberPayload,
  WhatsAppEnabledPayload,
} from "./types";
import { getStarted, textOnChange, whatsappToggle } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PHONE_NUMBER,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.FIXED_BOTTOM,
      },
      { id: "space0", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "space2", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "space3", type: WIDGET.SPACE },
      { id: "whatsappStack", type: WIDGET.STACK },
      { id: "space4", type: WIDGET.SPACE },
    ],
  },
  datastore: <Datastore>{
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Get OTP",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.CONTINUE,
        payload: <ContinuePayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    title: <TypographyProps>{
      label: "Verify your mobile number.",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
    },
    subTitle: <TypographyProps>{
      label: "We’ll send a verification code to this number.",
      color: ColorTokens.Grey_Charcoal,
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.PHONE_NUMBER,
        payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.LG },
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
      label: "Send OTP on Whatsapp",
      fontSize: FontSizeTokens.XXS,
      color: ColorTokens.Grey_Night,
    },
  },
};

export const phoneNumberMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CONTINUE]: getStarted,
    [ACTION.PHONE_NUMBER]: textOnChange,
    [ACTION.WHATSAPP_CHECK]: whatsappToggle,
    [ACTION.WHATSAPP_UNCHECK]: whatsappToggle,
  },
};