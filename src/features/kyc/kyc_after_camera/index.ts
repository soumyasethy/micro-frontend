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
  HeaderProps,
  HeaderTypeTokens,
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
import { PhotoVerifyAction, RetakePhoto } from "./actions";
import { stepperRepo } from "../../../configs/utils";

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
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    header: <HeaderProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      subTitle:
        "Volt Protects your financial information with Bank Grade Security",
      title: "Bank Verification",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        data: stepper,
        type: StepperTypeTokens.HORIZONTAL,
      },
    },
    stack: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "previewImage", type: WIDGET.IMAGE },
        { id: "retake", type: WIDGET.BUTTON },
        { id: "continue", type: WIDGET.BUTTON },
        { id: "disclaimerSpace", type: WIDGET.SPACE },
        { id: "disclaimer", type: WIDGET.TEXT },
      ],
    },
    previewImage: <ImageProps>{
      uri: `data:image/gif;base64,${photo}`,
      size: ImageSizeTokens.XXXL,
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
    continue: <ButtonProps & WidgetProps>{
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
    },
  },
});

export const kycAfterCameraMF: PageType<any> = {
  onLoad: async (_, { photo }) => {
    const stepper: StepperItem[] = await stepperRepo();
    return Promise.resolve(template(stepper, photo));
  },

  actions: {
    [ACTION.PHOTO_VERIFY]: PhotoVerifyAction,
    [ACTION.PHOTO_RETAKE]: RetakePhoto,
  },
};
