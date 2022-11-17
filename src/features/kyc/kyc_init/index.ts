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
  StackType,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { AadharInitPayload, ACTION } from "./types";
import { AadharInitAction, GoBackAction } from "./actions";
import { horizontalStepperRepo, stepperRepo } from "../../../configs/utils";

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
      {id: 'space2', type: WIDGET.SPACE},
      {id: "tcText" , type: WIDGET.TEXT},
      {id: 'bottomStack', type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM},
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
      size: ImageSizeTokens.XXXL,
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/kyc_documents.svg",
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
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
    tcText: <TypographyProps>{
      label: "By proceeding further, I hereby authorize Volt to pull my documents from Digilocker.",
      fontWeight: "400",
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.XS,
    },
    bottomStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "image2", type: WIDGET.IMAGE }, { id: "space3", type: WIDGET.SPACE }, { id: "tcText2", type: WIDGET.TEXT }],
    },
    image2: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR0,
      size: ImageSizeTokens.XXS,
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/digilocker.svg",
    },
    space3: <SpaceProps>{ size: SizeTypeTokens.XS },
    tcText2: <TypographyProps>{
      label: "Powered by Digilocker",
    }
  },
});
export const kycDigiLockerMF: PageType<any> = {
  onLoad: async () => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper));
  },
  actions: {
    [ACTION.AADHAR_INIT]: AadharInitAction,
    [ACTION.GO_BACK]: GoBackAction,
  },
};
