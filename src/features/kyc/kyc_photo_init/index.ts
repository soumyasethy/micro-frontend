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
  AspectRatioToken,
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
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
import { ACTION } from "./types";
import { CameraConfirmAction, GoBackAction } from "./actions";
import { horizontalStepperRepo } from "../../../configs/utils";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => ({
  layout: <Layout>{
    id: ROUTE.KYC_PHOTO_VERIFICATION,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "spaceTop", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "titleSpace", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "spaceTitle", type: WIDGET.SPACE },
      { id: "space1", type: WIDGET.SPACE },
      { id: "stackImage", type: WIDGET.STACK },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      {
        id: "continueSpace",
        type: WIDGET.SPACE,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps & WidgetProps>{
      title: "KYC Verification",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        data: stepper,
        type: StepperTypeTokens.HORIZONTAL,
      },
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.KYC_PHOTO_VERIFICATION,
        payload: {},
      },
    },
    spaceTop: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    continueSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    title: <TypographyProps>{
      label: "Take photo",
      fontWeight: "600",
      fontFamily: FontFamilyTokens.Poppins,
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
      lineHeight: 28,
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
    subTitle: <TypographyProps>{
      label: "We will use this to verify your identity",
      fontWeight: "400",
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 24,
    },
    spaceTitle: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    spaceImage: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    stackImage: <StackProps>{
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "image", type: WIDGET.IMAGE },
        { id: "spaceImage", type: WIDGET.SPACE },
      ],
    },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR5,
      size: ImageSizeTokens.XXXL,
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/camera_placeholder.svg",
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Open Camera",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.MD,
      lineHeight: SizeTypeTokens.XXL,
      fontWeight: "700",
      action: {
        type: ACTION.CAMERA_ACTION,
        routeId: ROUTE.KYC_PHOTO_VERIFICATION,
        payload: {},
      },
    },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
  },
});

export const cameraOpenMF: PageType<any> = {
  onLoad: async () => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.CAMERA_ACTION]: CameraConfirmAction,
    [ACTION.GO_BACK]: GoBackAction,
  },
  clearPrevious: true,
};
