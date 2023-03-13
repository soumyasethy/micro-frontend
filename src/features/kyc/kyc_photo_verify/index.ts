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
import { ACTION, PhotoVerifyPayload } from "./types";
import { GoBackAction, PhotoVerifyAction, RetakePhoto } from "./actions";
import { horizontalStepperRepo } from "../../../configs/utils";

export const template: (
  stepper: StepperItem[],
  photo: string
) => TemplateSchema = (stepper, photo) => ({
  layout: <Layout>{
    id: ROUTE.KYC_AFTER_CAMERA,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
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
    topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
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
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "previewImage", type: WIDGET.IMAGE },
        { id: "retake", type: WIDGET.BUTTON },
        { id: "space", type: WIDGET.SPACE },
      ],
    },
    stackBottom: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "continue", type: WIDGET.BUTTON },
        { id: "space2", type: WIDGET.SPACE },
      ],
    },
    previewImage: <ImageProps>{
      uri: `data:image/gif;base64,${photo}`,
      size: ImageSizeTokens.XXXXL,
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR2,
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
    continue: <ButtonProps & WidgetProps>{
      width: ButtonWidthTypeToken.FULL,
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.MD,
      lineHeight: SizeTypeTokens.XXL,
      fontWeight: "700",
      action: {
        type: ACTION.PHOTO_VERIFY,
        routeId: ROUTE.KYC_AFTER_CAMERA,
        payload: <PhotoVerifyPayload>{ base64Image: photo },
      },
    },

    space3: <SpaceProps>{ size: SizeTypeTokens.MD },
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
