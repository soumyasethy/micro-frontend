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
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  ImageProps,
  ImageSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { AadharInitPayload, ACTION } from "./types";
import { AadharInitAction, GoBackAction } from "./actions";
import { stepperRepo } from "../../../configs/utils";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => ({
  layout: <Layout>{
    id: ROUTE.KYC_DIGILOCKER,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "topSpace", type: WIDGET.SPACE },
      { id: "space1", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "spaceTitle", type: WIDGET.SPACE },
      { id: "stackImage", type: WIDGET.STACK },
      { id: "spaceImage", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
      },
      { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
    ],
  },
  datastore: <Datastore>{
    topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    header: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      subTitle:
        "Volt Protects your financial information with Bank Grade Security",
      title: "KYC Verification",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
      },
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.KYC_DIGILOCKER,
        payload: {},
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    title: <TypographyProps>{
      label: "Fetch document from Digilocker",
      fontWeight: "700",
      fontFamily: FontFamilyTokens.Poppins,
      fontSize: FontSizeTokens.MD,
    },
    spaceTitle: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    spaceImage: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    stackImage: <StackProps>{
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "image", type: WIDGET.IMAGE }],
    },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR5,
      size: ImageSizeTokens.XXL,
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Authenticate Aadhaar",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.AADHAR_INIT,
        routeId: ROUTE.KYC_DIGILOCKER,
        payload: <AadharInitPayload>{
          applicationId: "",
        },
      },
    },
  },
});
export const kycDigiLockerMF: PageType<any> = {
  onLoad: async () => {
    const stepper: StepperItem[] = await stepperRepo();
    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.AADHAR_INIT]: AadharInitAction,
    [ACTION.GO_BACK]: GoBackAction,
  },
};
