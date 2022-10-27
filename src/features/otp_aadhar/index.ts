import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  InputStateToken,
  InputTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { AadharInputPayload, ACTION, EnableDisableCTA } from "./types";
import { onChangeAadhar, toggleCTA, triggerCTA } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "title", type: WIDGET.TEXT },
      { id: "spaceSubTitle", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "spaceInput", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
    ],
  },
  datastore: <Datastore>{
    title: <TypographyProps>{
      label: "Instant KYC",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
    },
    spaceSubTitle: <SpaceProps>{ size: SizeTypeTokens.MD },
    spaceInput: <SpaceProps>{ size: SizeTypeTokens.XL },
    subTitle: <TypographyProps>{
      label:
        "UIDAI has sent a temporary OTP to your mobile ending in *********1933(valid for 10mins).",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    input: <TextInputProps>{
      title: "Enter Aadhaar number",
      type: InputTypeToken.OTP,
      state: InputStateToken.DEFAULT,
      charLimit: 6,
      caption: { error: "Please enter a valid 12 digit number" },
      action: {
        type: ACTION.TRIGGER_CTA,
        payload: <AadharInputPayload>{ value: "", widgetID: "input" },
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
      },
      errorAction: {
        type: ACTION.DISABLE_CTA,
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CTA,
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
  },
};

export const kycAadharOTPVerifyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.ENABLE_CTA]: toggleCTA,
    [ACTION.DISABLE_CTA]: toggleCTA,
    [ACTION.AADHAR_NUMBER]: onChangeAadhar,
  },
};
