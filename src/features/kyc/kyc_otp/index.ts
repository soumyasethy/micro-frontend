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
import { horizontalStepperRepo, stepperRepo } from "../../../configs/utils";
import SharedPropsService from "../../../SharedPropsService";

export const template: (
  stepper: StepperItem[],
  mobileNumber: string
) => TemplateSchema = (stepper, mobileNumber) => ({
  layout: <Layout>{
    id: ROUTE.KYC_AADHAAR_VERIFICATION_OTP,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "topSpace", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "spaceSubTitle", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "spaceInput", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
    ],
  },
  datastore: <Datastore>{
    topSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    header: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      subTitle:
        "Volt Protects your financial information with Bank Grade Security",
      title: "KYC Verification",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
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
      lineHeight: 24,
      fontWeight: "700",
    },
    spaceSubTitle: <SpaceProps>{ size: SizeTypeTokens.MD },
    spaceInput: <SpaceProps>{ size: SizeTypeTokens.XL },
    subTitle: <TypographyProps>{
      label: `UIDAI has sent a temporary OTP to your mobile ending in ******${mobileNumber}(valid for 10mins).`,
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      lineHeight: 24,
    },
    input: <TextInputProps>{
      title: "Enter Aadhaar number",
      type: InputTypeToken.OTP,
      state: InputStateToken.DEFAULT,
      charLimit: 6,
      keyboardType: KeyboardTypeToken.numberPad,
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
});

export const kycAadharOTPVerifyMF: PageType<any> = {
  onLoad: async () => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    const mobileNumber = (await SharedPropsService.getUser())
      .linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    return Promise.resolve(template(stepper, mobileNumber));
  },
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.ENABLE_CTA]: toggleCTA,
    [ACTION.DISABLE_CTA]: toggleCTA,
    [ACTION.AADHAR_NUMBER]: onChangeAadhar,
    [ACTION.GO_BACK]: GoBackAction,
  },
  clearPrevious: true,
};
