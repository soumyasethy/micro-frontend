import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import moment from "moment";
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
  StackJustifyContent,
  StackProps,
  StackType,
  TermsTextProps,
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

import { checkUserType, goToPrivacy, sendOtp, textOnChange, toggleCTA, whatsappToggle } from "./actions";
import { RegexConfig } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

export const template: (mobileNumber?: string) => TemplateSchema = (
  mobileNumber
) => ({
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
      },
      { id: "space5", type: WIDGET.SPACE },
      {
        id: "tc_text",
        type: WIDGET.TERMS_TEXT,
      },
      //{id:"dateItem",type:WIDGET.TEXT},
    ],
  },
  datastore: <Datastore>{
    tc_text: <TermsTextProps>{
      html: ` <p style='color:#667085;font-size:10px;font-weight: 400;line-height: 16px;'>
      By proceeding, I accept <span style='color:#1434CB;'>T&Cs, Privacy Policy </span> and<span style="color:#1434CB"; > Authorize</span> to obtain my KYC & bureau information.
      </p>`,
      action: {
        type: ACTION.PRIVACY,
        payload: <{}>{
          value: "",
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    continue: <ButtonProps & WidgetProps>{
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Poppins,
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
      fontWeight: "600",
    },
    subTitle: <TypographyProps>{
      label: "We’ll send an OTP to verify this number",
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    dateItem: <TypographyProps>{

      //label: `Last fetched on ${Object.values(camsFetches)}`,
      //label: "Last fetched on ",
      label: "Last fetched on " + `${moment(1672820952, "DD-MMM-YYYY")}`.substring(0, 10),
      //label: "Last fetched on " +`${moment(Object.values(camsFetches), "MMMM D")}`.substring(0,10),
      fontSize: FontSizeTokens.XS,
      fontWeight: '400',
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
      fontFamily: FontFamilyTokens.Inter
  },
    input: <TextInputProps & WidgetProps>{
      onlyNumeric: true,
      value: mobileNumber ? `${mobileNumber}` : "",
      isFocus: true,
      regex: RegexConfig.MOBILE,
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      keyboardType: KeyboardTypeToken.numberPad,
      placeholder: "Enter mobile number",
      action: {
        type: ACTION.PHONE_NUMBER,
        payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
      caption: { error: "Enter a 10 digit mobile number" },
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
    space2: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    space3: <SpaceProps>{ size: SizeTypeTokens.LG },
    space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    whatsapp_space: <SpaceProps>{ size: SizeTypeTokens.SM },
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
      color: ColorTokens.Primary_100,
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
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      fontSize: FontSizeTokens.XXS,
      color: ColorTokens.Grey_Night,
    },
    space5: <SpaceProps>{ size: SizeTypeTokens.Size32 },
  },
});

export const phoneNumberMF: PageType<any> = {

  onLoad: async (_, { mobileNumber }) => {
    const usertype = await SharedPropsService.getUserType();
    return Promise.resolve(template(mobileNumber));
   // const  date = moment(1672820952).format("DD-MM-YYYY");
   // const date = new Date(1672820952);
   
    // const  dates = moment(date).format("DD-MM-YYYY");
    // console.log("date",dates);
    
  },
  actions: {
    [ACTION.CONTINUE]: checkUserType,
    [ACTION.PHONE_NUMBER]: textOnChange,
    [ACTION.WHATSAPP_CHECK]: whatsappToggle,
    [ACTION.WHATSAPP_UNCHECK]: whatsappToggle,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
    [ACTION.PRIVACY]: goToPrivacy,
  },
};
