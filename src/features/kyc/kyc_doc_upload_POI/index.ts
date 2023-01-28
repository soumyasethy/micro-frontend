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
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => {
  return {
    layout: <Layout>{
      id: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
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
        // { id: "frontSide", type: WIDGET.DOCUMENT_PICKER },
        // { id: "frontSideSpace", type: WIDGET.SPACE },
        // { id: "backSide", type: WIDGET.DOCUMENT_PICKER },
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
      // frontSideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      header: <HeaderProps & WidgetProps>{
        title: "PAN Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          data: stepper,
          type: StepperTypeTokens.HORIZONTAL,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
          payload: {},
        },
      },
      title: <TypographyProps>{
        label: "Upload your PAN Card",
        color: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        lineHeight: 12,
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
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
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
        label: "Your data is secure with us",
        color: ColorTokens.Secondary_100,
        fontSize: FontSizeTokens.XS,
      },
    },
  };
};

export const kycDocumentUploadPOIMF: PageType<any> = {
  onLoad: async ({ network, appendWidgets, removeWidgets, setDatastore }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();

    const validation = {
      isFrontDocUploaded: false,
      isBackDocUploaded: false,
    };

    let documentUploadUrlMap = {
      frontDocURL: null,
      backDocURL: null,
    };

    validation.isFrontDocUploaded = false;
    await setDatastore(ROUTE.KYC_DOCUMENT_UPLOAD_POI, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeOutline,
    }); // reset continue button

    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;

    const documentUrlResponse = await network.post(
      `${api.kycDocumentPOI}${applicationId}`,
      { documentType: "PAN" },
      { headers: await getAppHeader() }
    );

    console.log("documentUrlResponse", documentUrlResponse);
    documentUploadUrlMap = documentUrlResponse.data.stepResponseObject;
    await removeWidgets(ROUTE.KYC_DOCUMENT_UPLOAD_POI, [
      { id: "frontSide", type: WIDGET.DOCUMENT_PICKER },
      { id: "frontSideSpace", type: WIDGET.SPACE },
      { id: "backSide", type: WIDGET.DOCUMENT_PICKER },
    ]);

    const datastore: Datastore = {
      frontSide: <DocumentPickerProps & WidgetProps>{
        titleLabel: "Front side",
        ctaLabel: "Upload",
        state: DocumentPickerState.DEFAULT,
        action: {
          type: ACTION.SELECT_DOCUMENT,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
          payload: <DocumentUploadPayload>{
            value: { content: null, name: null },
            widgetID: "frontSide",
          },
        },
      },
    };

    if (documentUploadUrlMap.backDocURL !== null) {
      datastore["frontSideSpace"] = <SpaceProps>{ size: SizeTypeTokens.XXXL };
      datastore["backSide"] = <DocumentPickerProps & WidgetProps>{
        titleLabel: "Back side",
        ctaLabel: "Upload",
        state: DocumentPickerState.DEFAULT,
        action: {
          type: ACTION.SELECT_DOCUMENT,
          routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI,
          payload: <DocumentUploadPayload>{
            value: { content: null, name: null },
            widgetID: "backSide",
          },
        },
      };
    }

    await appendWidgets(
      ROUTE.KYC_DOCUMENT_UPLOAD_POI,
      datastore,
      [
        { id: "frontSide", type: WIDGET.DOCUMENT_PICKER },
        { id: "frontSideSpace", type: WIDGET.SPACE },
        { id: "backSide", type: WIDGET.DOCUMENT_PICKER },
      ],
      "dropDownSpace"
    );

    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.SELECT_DOCUMENT]: documentPickerAction,
    [ACTION.ON_PAGE_LOAD]: onPageLoad,
    [ACTION.TRIGGER_CTA]: triggerAction,
  },
  clearPrevious: true,
};
