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
  DropDownInputProps,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  RadioProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackHeight,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TextInputProps,
  TextInputTypeToken,
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
import { horizontalStepperRepo, qualificationInputData } from "../../../configs/utils";
import { getAppHeader, RegexConfig } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";

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
        { id: "martialStatusTitle", type: WIDGET.TEXT },
        { id: "martialStatusSpace", type: WIDGET.SPACE },
        { id: "martialStatusStack", type: WIDGET.STACK},
        { id: "selectQualificationTitleSpace", type: WIDGET.SPACE },
        { id: "selectQualificationInputSpace", type: WIDGET.SPACE },
        { id: "qualificationInput", type: WIDGET.DROPDOWN_INPUT},
        { id: "qualificationInputSpace", type: WIDGET.SPACE },
        { id: "fatherInputSpace", type: WIDGET.SPACE },
        { id: "fatherNameInput", type: WIDGET.INPUT},
        { id: "motherNameInputSpace", type: WIDGET.SPACE },
        { id: "motherNameInput", type: WIDGET.INPUT},
        { id: "stackBottom", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM},
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      ],
    },
    datastore: <Datastore>{
      topSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
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
      spaceSubTitle: <SpaceProps>{ size: SizeTypeTokens.XL },
      spaceInput: <SpaceProps>{ size: SizeTypeTokens.XL },
      martialStatusTitle: <TypographyProps>{
        label: "Marital status",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        lineHeight: 24,
      },
      martialStatusSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
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
        label: "Confirm",
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
      martialStatusStack: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "singleRadioStack", type: WIDGET.STACK},
          //{ id: "martialStatusSpace0", type: WIDGET.SPACE},
          { id: "marriedRadioStack", type: WIDGET.STACK}
        ]
      },
      martialStatusSpace0: <SpaceProps>{ size: SizeTypeTokens.XXXXXL},
      marriedRadioStack: <StackProps> {
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "marriedRadio", type: WIDGET.RADIO },
          { id: "marriedRadioSpace0", type: WIDGET.SPACE },
          { id: "marriedRadioLabel", type: WIDGET.TEXT }
        ]
      },
      marriedRadio: <RadioProps> {
        size: IconSizeTokens.XL,
        isChecked: false,
        checkedIconName: IconTokens.RadioCircleFilled,
        notCheckedIconName: IconTokens.RadioCircleNotFilled
      },
      marriedRadioSpace0: <SpaceProps> { size: SizeTypeTokens.MD },
      marriedRadioLabel: <TypographyProps> {
        label: "Married",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night
      },
      singleRadioStack:  <StackProps> {
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "singleRadio", type: WIDGET.RADIO },
          { id: "singleRadioSpace0", type: WIDGET.SPACE },
          { id: "singleRadioLabel", type: WIDGET.TEXT }
        ]
      },
      singleRadio: <RadioProps> {
        size: IconSizeTokens.XL,
        isChecked: false,
        checkedIconName: IconTokens.RadioCircleFilled,
        notCheckedIconName: IconTokens.RadioCircleNotFilled
      },
      singleRadioSpace0: <SpaceProps> { size: SizeTypeTokens.MD },
      singleRadioLabel: <TypographyProps> {
        label: "Single",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night
      },
      selectQualificationTitleSpace: <SpaceProps> { size: SizeTypeTokens.XL },
      qualificationInput: <DropDownInputProps> {
       label: "Select qualification",
       data: qualificationInputData,
       onSelect: ()=>{}
      },
      selectQualificationInputSpace: <SpaceProps> { size: SizeTypeTokens.LG },
      qualificationInputSpace: <SpaceProps> { size: SizeTypeTokens.XL },
      fatherNameInput: <TextInputProps & TypographyProps> {
        title: "Father's name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
      },
      motherNameInput: <TextInputProps> {
        title: "Mother's name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
      },
      motherNameInputSpace: <SpaceProps> { size: SizeTypeTokens.XXXL},
      stackBottom: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        type: StackType.column,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON },
          { id: "sbSpace1", type: WIDGET.SPACE },
          { id: "sbStack", type: WIDGET.STACK },
          { id: "sbSpace2", type: WIDGET.SPACE },
        ]
      },
      sbSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
      sbspace2: <SpaceProps>{ size: SizeTypeTokens.MD },
      sbStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "image2", type: WIDGET.ICON },
          { id: "sbpace3", type: WIDGET.SPACE },
          { id: "disclaimer", type: WIDGET.TEXT },
        ]
      },
      image2: <IconProps>{
        name: IconTokens.Secure,
        size: IconSizeTokens.MD,
        color: ColorTokens.Secondary_100,
      },
      sbpace3: <SpaceProps>{ size: SizeTypeTokens.MD },
      disclaimer: <TypographyProps>{
        label: "Don’t worry your data is secured with Volt",
        color: ColorTokens.Secondary_100,
        fontSize: FontSizeTokens.XS,
      },
    },
  };
};

export const kycAdditionalDetailsMF: PageType<any> = {
  onLoad: async ({ network }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    const user = await SharedPropsService.getUser();
    const applicationId = user.linkedApplications[0].applicationId;

    const response = await network.get(`${api.additionalDetails}${applicationId}`,
    { headers: await getAppHeader() });
    
    console.warn("Response warn : " + response);
    const stepResponseObject = _.get(response, "data.stepResponseObject", {});
    return Promise.resolve(template(stepper, stepResponseObject));
  },
  actions: {
    //[ACTION.TRIGGER_CTA]: triggerCTA,
    // [ACTION.ENABLE_CTA]: toggleCTA,
    // [ACTION.DISABLE_CTA]: toggleCTA,
    // [ACTION.AADHAR_NUMBER]: onChangeAadhar,
    // [ACTION.GO_BACK]: GoBackAction,
  },
};
