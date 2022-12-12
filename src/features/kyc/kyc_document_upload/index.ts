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
  DropDownInputProps,
  DropDownItemProps,
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
import { ACTION, DocPayload, DropDownPayload } from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import { getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { documentPickerAction, GoBackAction } from "./actions";

export const template: (
  stepper: StepperItem[],
  stepResponseObject: { [key in string]: string }
) => TemplateSchema = (stepper) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_DOCUMENT_UPLOAD,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "topSpace", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "spaceSubTitle", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subTitleSpace", type: WIDGET.SPACE },
        { id: "dropDown", type: WIDGET.DROPDOWN_INPUT },
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
      frontSideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      header: <HeaderProps & WidgetProps>{
        title: "KYC Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD,
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
      subTitle: <TypographyProps>{
        label: "Select ID proof for upload",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        lineHeight: 24,
      },
      subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      dropDown: <DropDownInputProps & WidgetProps>{
        label: "Select ID proof for upload",
        data: <DropDownItemProps[]>[
          { label: "Aadhar Card", value: "AADHAR_CARD" },
          { label: "Driving License", value: "DRIVING_LICENSE" },
          { label: "Passport", value: "PASSPORT" },
          { label: "Voter ID Card", value: "VOTER_ID_CARD" },
        ],
        action: {
          type: ACTION.SELECT_DOC_TYPE,
          payload: <DropDownPayload>{
            value: null,
            widgetID: "dropDown",
          },
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD,
        },
      },
      frontSide: <DocumentPickerProps & WidgetProps>{
        titleLabel: "Front side",
        ctaLabel: "Upload",
        state: DocumentPickerState.DEFAULT,
        action: {
          type: ACTION.SELECT_DOCUMENT,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD,
          payload: <DocPayload>{
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
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD,
          payload: <DocPayload>{
            value: { content: null, name: null },
            widgetID: "backSide",
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
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD,
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
          { id: "sbSpace1", type: WIDGET.SPACE },
          { id: "sbStack", type: WIDGET.STACK },
          { id: "sbSpace2", type: WIDGET.SPACE },
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
        label: "Don’t worry your data is secured with Volt",
        color: ColorTokens.Secondary_100,
        fontSize: FontSizeTokens.XS,
      },
    },
  };
};

export const kycDocumentUploadMF: PageType<any> = {
  onLoad: async ({}) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    // const user = await SharedPropsService.getUser();
    // const applicationId = user.linkedApplications[0].applicationId;

    // const response = await network.get(
    //   `${api.additionalDetails}${applicationId}`,
    //   { headers: await getAppHeader() }
    // );

    const stepResponseObject = _.get({}, "data.stepResponseObject", {});
    return Promise.resolve(template(stepper, stepResponseObject));
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SELECT_DOCUMENT]: documentPickerAction,
  },
};
