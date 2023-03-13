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
  DocumentPickerProps,
  DocumentPickerState,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, DocumentUploadPayload } from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import {
  documentPickerAction,
  GoBackAction,
  onPageLoad,
  triggerAction,
} from "./actions";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "spaceSubTitle", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "spaceSecondarySubTitle", type: WIDGET.SPACE },
        { id: "secondarySubTitle", type: WIDGET.TEXT },
        { id: "subTitleSpace", type: WIDGET.SPACE },
        { id: "dropDownSpace", type: WIDGET.SPACE },
        { id: "frontSide", type: WIDGET.DOCUMENT_PICKER },
        { id: "frontSideSpace", type: WIDGET.SPACE },
        { id: "backSide", type: WIDGET.DOCUMENT_PICKER },
        {
          id: "stackBottom",
          type: WIDGET.STACK,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      dropDownSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      frontSide: <DocumentPickerProps & WidgetProps>{
        titleLabel: "Front side",
        ctaLabel: "Upload",
        state: DocumentPickerState.DEFAULT,
        action: {
          type: ACTION.SELECT_DOCUMENT,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
          payload: <DocumentUploadPayload>{
            value: { content: null, name: null },
            widgetID: "frontSide",
          },
        },
      },
      backSide: <DocumentPickerProps & WidgetProps>{
        titleLabel: "Back side",
        ctaLabel: "Upload",
        state: DocumentPickerState.DEFAULT,
        action: {
          type: ACTION.SELECT_DOCUMENT,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
          payload: <DocumentUploadPayload>{
            value: { content: null, name: null },
            widgetID: "backSide",
          },
        },
      },
      frontSideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      header: <HeaderProps & WidgetProps>{
        title: "Aadhaar Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
          payload: {},
        },
      },
      title: <TypographyProps>{
        label: "Upload your Aadhaar Card",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 20,
      },
      spaceSubTitle: <SpaceProps>{ size: SizeTypeTokens.LG },
      spaceSecondarySubTitle: <SpaceProps>{ size: SizeTypeTokens.LG },
      spaceInput: <SpaceProps>{ size: SizeTypeTokens.XL },
      subTitle: <TypographyProps>{
        label: "Supported document formats : PDF/PNG/JPEG",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        lineHeight: 18,
      },
      secondarySubTitle: <TypographyProps>{
        label: "File size < 5 MB",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        lineHeight: 18,
      },
      subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
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
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
          payload: {},
        },
      },
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.MD },
      stackBottom: <StackProps>{
        justifyContent: StackJustifyContent.center,
        alignItems: StackAlignItems.center,
        type: StackType.column,
        widgetItems: [
          { id: "continue", type: WIDGET.BUTTON },
          // { id: "sbSpace1", type: WIDGET.SPACE },
          // { id: "sbSpace2", type: WIDGET.SPACE },
        ],
      },
      sbSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
      sbSpace2: <SpaceProps>{ size: SizeTypeTokens.MD },
      sbpace3: <SpaceProps>{ size: SizeTypeTokens.MD },
    },
  };
};

export const kycDocumentUploadPOAMF: PageType<any> = {
  onLoad: async ({}) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SELECT_DOCUMENT]: documentPickerAction,
    [ACTION.ON_PAGE_LOAD]: onPageLoad,
    [ACTION.TRIGGER_CTA]: triggerAction,
  },
  clearPrevious: true,
  action: {
    type: ACTION.ON_PAGE_LOAD,
    routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA,
    payload: {},
  },
};
