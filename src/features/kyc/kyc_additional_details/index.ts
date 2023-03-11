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
  CardProps,
  ColorTokens,
  DropDownInputProps,
  DropDownItemProps,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  PaddingProps,
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
  TextInputTypeToken,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  DropDownPayload,
  EDUCATION,
  InputPayload,
  KycAdditionalDetailsPayload,
  MARITAL_STATUS,
  MaritalStatusPayload,
} from "./types";
import {
  GoBackAction,
  onChangeInput,
  onSelect,
  toggleCTA,
  triggerCTA,
} from "./actions";
import { horizontalStepperRepo } from "../../../configs/utils";
import { getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";

const qualificationInputData: Array<DropDownItemProps> = [
  { label: "Up to 12", value: EDUCATION.UP_TO_12 },
  { label: "Diploma", value: EDUCATION.DIPLOMA },
  { label: "Graduate", value: EDUCATION.UNDER_GRADUATE },
  { label: "Post graduate", value: EDUCATION.POST_GRADUATE },
  { label: "MBA", value: EDUCATION.MBA },
  { label: "PHD", value: EDUCATION.PHD },
  { label: "Professional", value: EDUCATION.PROFESSIONAL },
  { label: "Others", value: EDUCATION.OTHERS },
];
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
        // { id: "selectQualificationTitleSpace", type: WIDGET.SPACE },
        // { id: "qualificationTitle", type: WIDGET.TEXT },
        // { id: "selectQualificationTitleSpace2", type: WIDGET.SPACE },
        { id: "qualificationInput", type: WIDGET.DROPDOWN_INPUT },
        { id: "qualificationInputSpace", type: WIDGET.SPACE },
        // { id: "fatherNameTitle", type: WIDGET.TEXT },
        { id: "fatherInputSpace", type: WIDGET.SPACE },
        { id: "fatherNameStack", type: WIDGET.STACK },
        { id: "fathersCard", type: WIDGET.CARD },
        { id: "motherNameInputSpace", type: WIDGET.SPACE },
        // { id: "motherNameTitle", type: WIDGET.TEXT },
        { id: "motherNameSpace", type: WIDGET.SPACE },
        { id: "motherNameStack", type: WIDGET.STACK },
        { id: "mothersCard", type: WIDGET.CARD },
        { id: "space1", type: WIDGET.SPACE },
        { id: "space2", type: WIDGET.SPACE },
        { id: "keyboardSpace", type: WIDGET.SPACE },
        { id: "keyboardSpace2", type: WIDGET.SPACE },
        {
          id: "stackBottom",
          type: WIDGET.STACK,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      ],
    },
    datastore: <Datastore>{
      selectQualificationTitleSpace2: <SpaceProps>{ size: SizeTypeTokens.LG },
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
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
          payload: {},
        },
      },
      title: <TypographyProps>{
        label: "Additional information",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 20,
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
      martialStatusSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
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
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
      keyboardSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
      keyboardSpace2: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.MD },
      martialStatusStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "singleRadioStack", type: WIDGET.STACK },
          { id: "singleRadioSpace", type: WIDGET.SPACE },
          { id: "marriedRadioStack", type: WIDGET.STACK },
        ],
      },
      singleRadioSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
      marriedRadioStack: <StackProps & WidgetProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        widgetItems: [
          { id: "marriedRadio", type: WIDGET.ICON },
          { id: "marriedsingleRadioSpace0", type: WIDGET.SPACE },
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

      marriedsingleRadioSpace0: <SpaceProps>{ size: SizeTypeTokens.MD },
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
          { id: "singlesingleRadioSpace0", type: WIDGET.SPACE },
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
      singlesingleRadioSpace0: <SpaceProps>{ size: SizeTypeTokens.MD },
      singleRadioLabel: <TypographyProps>{
        label: "Single",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "500",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      qualificationTitle: <TypographyProps>{
        label: "Select qualification",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        lineHeight: 24,
      },
      selectQualificationTitleSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
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
      fatherNameTitle: <TypographyProps>{
        label: "Father’s name",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        lineHeight: 24,
      },
      fathersCard: <CardProps>{
        width: "100%",
        bgColor: ColorTokens.White,
        padding: <PaddingProps>{
          horizontal: SizeTypeTokens.NONE,
          vertical: SizeTypeTokens.Size6,
        },
        body: {
          widgetItems: [{ id: "propStack", type: WIDGET.STACK }],
        },
      },
      propStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "icon", type: WIDGET.ICON },
          { id: "space", type: WIDGET.SPACE },
          { id: "text", type: WIDGET.TEXT },
        ],
      },
      icon: <IconProps>{
        name: IconTokens.Info,
        color: ColorTokens.System_Warning,
      },
      space: <SpaceProps>{ size: SizeTypeTokens.MD },
      text: <TypographyProps>{
        label: "Enter father’s name as per your Aadhaar",
        color: ColorTokens.System_Warning,
      },
      fatherNameStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "fatherFirstNameInput", type: WIDGET.INPUT },
          { id: "fatherInputBetweenSpace", type: WIDGET.SPACE },
          { id: "fatherLastNameInput", type: WIDGET.INPUT },
        ],
      },
      fatherInputSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      fatherInputBetweenSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      fatherFirstNameInput: <TextInputProps & WidgetProps>{
        width: TextInputTypeToken.CONTENT,
        isFocus: false,
        title: "Father’s first name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{
            value: "",
            widgetID: "fatherFirstNameInput",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      fatherLastNameInput: <TextInputProps & WidgetProps>{
        width: TextInputTypeToken.CONTENT,
        isFocus: false,
        title: "Father’s last name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
        type: InputTypeToken.DEFAULT,
        state: InputStateToken.DEFAULT,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{
            value: "",
            widgetID: "fatherLastNameInput",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      mothersCard: <CardProps>{
        width: "100%",
        bgColor: ColorTokens.White,
        padding: <PaddingProps>{
          horizontal: SizeTypeTokens.NONE,
          vertical: SizeTypeTokens.Size6,
        },
        body: {
          widgetItems: [{ id: "propStack2", type: WIDGET.STACK }],
        },
      },
      propStack2: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        justifyContent: StackJustifyContent.flexStart,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "icon2", type: WIDGET.ICON },
          { id: "space3", type: WIDGET.SPACE },
          { id: "text2", type: WIDGET.TEXT },
        ],
      },
      icon2: <IconProps>{
        name: IconTokens.Info,
        color: ColorTokens.System_Warning,
      },
      space3: <SpaceProps>{ size: SizeTypeTokens.MD },
      text2: <TypographyProps>{
        label: "Enter your mother’s first name & last name",
        color: ColorTokens.System_Warning,
      },
      motherNameTitle: <TypographyProps>{
        label: "Mother’s name",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        lineHeight: 24,
      },
      motherNameSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      motherNameStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.CONTENT,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "motherFirstNameInput", type: WIDGET.INPUT },
          { id: "motherInputSpace", type: WIDGET.SPACE },
          { id: "motherLastNameInput", type: WIDGET.INPUT },
        ],
      },
      motherFirstNameInput: <TextInputProps>{
        width: TextInputTypeToken.CONTENT,
        isFocus: false,
        title: "Mother’s first name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{
            value: "",
            widgetID: "motherFirstNameInput",
          },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      motherInputSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      motherLastNameInput: <TextInputProps>{
        width: TextInputTypeToken.CONTENT,
        isFocus: false,
        title: "Mother’s last name",
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
        fontWeight: "400",
        placeholder: "",
        color: ColorTokens.Grey_Night,
        action: {
          type: ACTION.INPUT_NAME,
          payload: <InputPayload>{ value: "", widgetID: "motherLastNameInput" },
          routeId: ROUTE.KYC_ADDITIONAL_DETAILS,
        },
      },
      motherNameInputSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      stackBottom: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        type: StackType.column,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON },
          // { id: "sbSpace1", type: WIDGET.SPACE },
          // { id: "sbStack", type: WIDGET.STACK },
          // { id: "sbSpace2", type: WIDGET.SPACE },
        ],
      },
      sbSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
      sbSpace2: <SpaceProps>{ size: SizeTypeTokens.MD },
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
        label: "Your data is secure with us",
        color: ColorTokens.Secondary_100,
        fontSize: FontSizeTokens.XS,
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
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

    const stepResponseObject = _.get(response, "data.stepResponseObject", {});
    return Promise.resolve(template(stepper, stepResponseObject));
  },
  actions: {
    [ACTION.TRIGGER_CTA]: triggerCTA,
    [ACTION.STATUS_CHECK]: toggleCTA,
    [ACTION.STATUS_UNCHECK]: toggleCTA,
    [ACTION.INPUT_NAME]: onChangeInput,
    [ACTION.SELECT_QUALIFICATION]: onSelect,
    [ACTION.GO_BACK]: GoBackAction,
  },
};
