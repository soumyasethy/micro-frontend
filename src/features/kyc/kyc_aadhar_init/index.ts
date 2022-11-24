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
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { AadharInputPayload, ACTION, EnableDisableCTA } from "./types";
import { GoBackAction, onChangeAadhar, toggleCTA, triggerCTA } from "./actions";
import { AadharInitPayload } from "../kyc_init/types";
import { horizontalStepperRepo } from "../../../configs/utils";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_AADHAAR_VERIFICATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "topSpace", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "spaceSubTitle", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "spaceInput", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "spaceContinue", type: WIDGET.SPACE },
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      ],
    },
    datastore: <Datastore>{
      topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      header: <HeaderProps & WidgetProps>{
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        subTitle:
          "Volt Protects your financial information with Bank Grade Security",
        title: "KYC Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
          payload: {},
        },
      },
      title: <TypographyProps>{
        label: "Instant KYC",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 12,
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
        lineHeight: 24,
      },
      input: <TextInputProps>{
        title: "Enter Aadhaar number",
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
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
          payload: <EnableDisableCTA>{
            value: false,
            targetWidgetId: "continue",
          },
        },
        successAction: {
          type: ACTION.ENABLE_CTA,
          routeId: ROUTE.KYC_AADHAAR_VERIFICATION,
          payload: <EnableDisableCTA>{
            value: true,
            targetWidgetId: "continue",
          },
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
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.MD },
    },
  };
};

export const kycAadharVerifyMF: PageType<any> = {
  onLoad: async () => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.ENABLE_CTA]: toggleCTA,
    [ACTION.DISABLE_CTA]: toggleCTA,
    [ACTION.AADHAR_NUMBER]: onChangeAadhar,
    [ACTION.GO_BACK]: GoBackAction,
  },
};
