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
import {
  InputPayload,
  ACTION,
  EnableDisableCTA,
  KycAdditionalDetailsPayload,
} from "./types";
import { GoBackAction, onChangeAadhar, toggleCTA, triggerCTA } from "./actions";
import { AadharInitPayload } from "../kyc_init/types";
import { horizontalStepperRepo } from "../../../configs/utils";
import { getAppHeader, RegexConfig } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";

export const template: (
  stepper: StepperItem[],
  stepResponseObject: { [key in string]: string }
) => TemplateSchema = (stepper, stepResponseObject) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_ADDITIONAL_DETAILS,
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
        label: "Additional information",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 12,
      },
      spaceSubTitle: <SpaceProps>{ size: SizeTypeTokens.MD },
      spaceInput: <SpaceProps>{ size: SizeTypeTokens.XL },
      subTitle: <TypographyProps>{
        label: "Father’s name",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        lineHeight: 24,
      },
      firstName: <TextInputProps>{
        placeholder: "First name",
        regex: RegexConfig.AADHAR,
        title: "First name",
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: 12,
        caption: { error: "Please enter first name" },
        action: {
          type: ACTION.AADHAR_NUMBER,
          payload: <InputPayload>{ value: "", widgetID: "input" },
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
      lastName: <TextInputProps>{
        placeholder: "Last name",
        regex: RegexConfig.AADHAR,
        title: "Last name",
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: 12,
        caption: { error: "Please enter last name" },
        action: {
          type: ACTION.AADHAR_NUMBER,
          payload: <InputPayload>{ value: "", widgetID: "input" },
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
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: SizeTypeTokens.XXL,
        fontWeight: "700",
        action: {
          type: ACTION.TRIGGER_CTA,
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
          payload: <KycAdditionalDetailsPayload>{ ...stepResponseObject },
        },
      },
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.MD },
    },
  };
};

export const kycAdditionalDetailsMF: PageType<any> = {
  onLoad: async ({ network }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();

    const response = await network.get(api.additionalDetails, {
      headers: await getAppHeader(),
    });
    const stepResponseObject = _.get(response, "data.stepResponseObject", {});
    return Promise.resolve(template(stepper, stepResponseObject));
  },
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    // [ACTION.ENABLE_CTA]: toggleCTA,
    // [ACTION.DISABLE_CTA]: toggleCTA,
    // [ACTION.AADHAR_NUMBER]: onChangeAadhar,
    // [ACTION.GO_BACK]: GoBackAction,
  },
};
