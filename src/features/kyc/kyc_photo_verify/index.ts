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
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  ImageProps,
  ImageSizeTokens,
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
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { GoBackAction, PhotoVerifyAction, RetakePhoto } from "./actions";
import { horizontalStepperRepo, stepperRepo } from "../../../configs/utils";

export const template: (
  stepper: StepperItem[],
  photo: string
) => TemplateSchema = (stepper, photo) => ({
  layout: <Layout>{
    id: ROUTE.KYC_AFTER_CAMERA,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      { id: "space1", type: WIDGET.SPACE },
      { id: "topSpace", type: WIDGET.SPACE },
      { id: "stack", type: WIDGET.STACK },
      {
        id: "stackBottom",
        type: WIDGET.STACK,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
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
        routeId: ROUTE.KYC_AFTER_CAMERA,
        payload: {},
      },
    },
    stack: <StackProps>{
      height: StackHeight.FULL,
      width: StackWidth.FULL,
      type: StackType.column,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "previewImage", type: WIDGET.IMAGE },
        { id: "retake", type: WIDGET.BUTTON },
        { id: "space", type: WIDGET.SPACE },
      ],
    },
    stackBottom: <StackProps>{
      height: StackHeight.FULL,
      width: StackWidth.FULL,
      type: StackType.column,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "continue", type: WIDGET.BUTTON },
        { id: "space2", type: WIDGET.SPACE },
        { id: "disclaimerSpace", type: WIDGET.SPACE },
        {
          id: "disclaimer",
          type: WIDGET.TEXT,
        },
      ],
    },
    previewImage: <ImageProps>{
      uri: `data:image/gif;base64,${photo}`,
      size: ImageSizeTokens.XXXL,
      aspectRatio: AspectRatioToken.A1_1,
    },
    retake: <ButtonProps & WidgetProps>{
      label: "Retake",
      type: ButtonTypeTokens.LargeGhost,
      action: {
        type: ACTION.PHOTO_RETAKE,
        routeId: ROUTE.KYC_AFTER_CAMERA,
        payload: {},
      },
    },
    space: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.LG },
    continue: <ButtonProps & WidgetProps>{
      width: ButtonWidthTypeToken.FULL,
      label: "Continue to verify Aadhar",
      type: ButtonTypeTokens.LargeFilled,
      action: {
        type: ACTION.PHOTO_VERIFY,
        routeId: ROUTE.KYC_AFTER_CAMERA,
        payload: {},
      },
    },
    disclaimerSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    disclaimer: <TypographyProps>{
      label: "Don’t worry your data is secured with Volt",
      color: ColorTokens.Secondary_100,
      fontSize: FontSizeTokens.XS,
    },
  },
});

export const kycAfterCameraMF: PageType<any> = {
  onLoad: async (_, { photo }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper, photo));
  },

  actions: {
    [ACTION.PHOTO_VERIFY]: PhotoVerifyAction,
    [ACTION.PHOTO_RETAKE]: RetakePhoto,
    [ACTION.GO_BACK]: GoBackAction,
  },
  clearPrevious: true,
};
