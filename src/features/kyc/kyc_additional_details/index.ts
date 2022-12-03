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
  RadioProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  DropDownPayload,
  InputPayload,
  KycAdditionalDetailsPayload,
  MARITAL_STATUS,
  MaritalStatusPayload,
} from "./types";
import { onChangeInput, onSelect, toggleCTA, triggerCTA } from "./actions";
import {
  horizontalStepperRepo,
  qualificationInputData,
} from "../../../configs/utils";
import { getAppHeader } from "../../../configs/config";
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
        { id: "martialStatusStack", type: WIDGET.STACK },
        { id: "selectQualificationTitleSpace", type: WIDGET.SPACE },
        { id: "selectQualificationInputSpace", type: WIDGET.SPACE },
        { id: "qualificationInput", type: WIDGET.DROPDOWN_INPUT },
        { id: "qualificationInputSpace", type: WIDGET.SPACE },
        { id: "fatherInputSpace", type: WIDGET.SPACE },
        { id: "fatherNameInput", type: WIDGET.INPUT },
        { id: "motherNameInputSpace", type: WIDGET.SPACE },
        { id: "motherNameInput", type: WIDGET.INPUT },
        {
          id: "stackBottom",
          type: WIDGET.STACK,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
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
          payload: <KycAdditionalDetailsPayload>{},
        },
      },
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.MD },
      martialStatusStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "singleRadioStack", type: WIDGET.STACK },
          { id: "martialStatusSpace0", type: WIDGET.SPACE },
          { id: "marriedRadioStack", type: WIDGET.STACK },
        ],
      },
      martialStatusSpace0: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
      marriedRadioStack: <StackProps & WidgetProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "marriedRadio", type: WIDGET.ICON },
          { id: "marriedRadioSpace0", type: WIDGET.SPACE },
          { id: "marriedRadioLabel", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTION.STATUS_CHECK,
          payload: <MaritalStatusPayload>{
            value: MARITAL_STATUS.MARRIED,
            targetWidgetId: "marriedRadio",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      marriedRadio: <IconProps>{
        name: IconTokens.RadioCircleNotFilled,
        size: IconSizeTokens.XL,
      },

      marriedRadioSpace0: <SpaceProps>{ size: SizeTypeTokens.MD },
      marriedRadioLabel: <TypographyProps>{
        label: "Married",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      singleRadioStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "singleRadio", type: WIDGET.ICON },
          { id: "singleRadioSpace0", type: WIDGET.SPACE },
          { id: "singleRadioLabel", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTION.STATUS_CHECK,
          payload: <MaritalStatusPayload>{
            value: MARITAL_STATUS.SINGLE,
            targetWidgetId: "singleRadio",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      singleRadio: <IconProps>{
        name: IconTokens.RadioCircleNotFilled,
        size: IconSizeTokens.XL,
      },
      singleRadioSpace0: <SpaceProps>{ size: SizeTypeTokens.MD },
      singleRadioLabel: <TypographyProps>{
        label: "Single",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      selectQualificationTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      qualificationInput: <DropDownInputProps & WidgetProps>{
        label: "Select qualification",
        data: qualificationInputData,
        action: {
          type: ACTION.SELECT_QUALIFICATION,
          payload: <DropDownPayload>{
            value: null,
            widgetID: "qualificationInput",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      selectQualificationInputSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      qualificationInputSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      fatherNameInput: <TextInputProps & TypographyProps & WidgetProps>{
        isFocus: false,
        title: "Father's name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Enter Father's name",
        color: ColorTokens.Grey_Night,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{ value: "", widgetID: "fatherNameInput" },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      motherNameInput: <TextInputProps>{
        isFocus: false,
        title: "Mother's name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "Enter Mother's name",
        color: ColorTokens.Grey_Night,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{ value: "", widgetID: "motherNameInput" },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      motherNameInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      stackBottom: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        type: StackType.column,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON },
          { id: "sbSpace1", type: WIDGET.SPACE },
          { id: "sbStack", type: WIDGET.STACK },
          { id: "sbSpace2", type: WIDGET.SPACE },
        ],
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
        ],
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

    const response = await network.get(
      `${api.additionalDetails}${applicationId}`,
      { headers: await getAppHeader() }
    );

    console.warn("Response warn : " + response);
    const stepResponseObject = _.get(response, "data.stepResponseObject", {});
    return Promise.resolve(template(stepper, stepResponseObject));
  },
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.STATUS_CHECK]: toggleCTA,
    [ACTION.STATUS_UNCHECK]: toggleCTA,
    [ACTION.INPUT_NAME]: onChangeInput,
    [ACTION.SELECT_QUALIFICATION]: onSelect,
  },
};
