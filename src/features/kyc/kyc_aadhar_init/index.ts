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
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  InputStateToken,
  InputTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StepperProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { AadharInputPayload, ACTION, EnableDisableCTA } from "./types";
import { onChangeAadhar, toggleCTA, triggerCTA } from "./actions";
import { AadharInitPayload } from "../kyc_digilocker/types";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.KYC_AADHAAR_VERIFICATION,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "title", type: WIDGET.TEXT },
      { id: "spaceSubTitle", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "spaceInput", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "spaceContinue", type: WIDGET.SPACE },
      { id: "continue", type: WIDGET.BUTTON, position: POSITION.FIXED_BOTTOM },
      { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      subTitle:
        "Volt Protects your financial information with Bank Grade Security",
      title: "Bank Verification",
      type: HeaderTypeTokens.verification,
      stepper: <StepperProps>{},
    },
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
        "Enter 12-digit aadhar number, a OTP will be sent to your registered mobile.",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    input: <TextInputProps>{
      title: "Enter Aadhaar number",
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DEFAULT,
      charLimit: 12,
      caption: { error: "Please enter a valid 12 digit number" },
      action: {
        type: ACTION.AADHAR_NUMBER,
        payload: <AadharInputPayload>{ value: "", widgetID: "input" },
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
      },
      errorAction: {
        type: ACTION.DISABLE_CTA,
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CTA,
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    continue: <ButtonProps & WidgetProps>{
      type: ButtonTypeTokens.LargeOutline,
      label: "Proceed",
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TRIGGER_CTA,
        routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
        payload: <AadharInitPayload>{
          applicationId: "",
          aadhaarNumber: "",
        },
      },
    },
    spaceContinue: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
};

export const kycAadharVerifyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.ENABLE_CTA]: toggleCTA,
    [ACTION.DISABLE_CTA]: toggleCTA,
    [ACTION.AADHAR_NUMBER]: onChangeAadhar,
  },
};