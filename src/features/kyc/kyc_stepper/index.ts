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
  FontFamilyTokens,
  FontSizeTokens,
  ImageProps,
  ImageSizeTokens,
  ResizeModeToken,
  SizeTypeTokens,
  SpaceProps,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { Go_Next_Action } from "./actions";
import {
  stepperRepo,
  updateApplicationContextFromApi,
} from "../../../configs/utils";
import SharedPropsService from "../../../SharedPropsService";

export const template: (data: StepperItem[]) => TemplateSchema = (data) => ({
  layout: <Layout>{
    id: ROUTE.KYC_STEPPER,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space0", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "image", type: WIDGET.IMAGE },
      { id: "space", type: WIDGET.SPACE },
      { id: "stepper", type: WIDGET.STEPPER },
      { id: "space2", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    space0: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    title: <TypographyProps>{
      label: "Withdraw in 4 steps",
      fontFamily: FontFamilyTokens.Poppins,
      fontSize: FontSizeTokens.MD,
      fontWeight: "700",
    },
    space1: <SpaceProps>{
      size: SizeTypeTokens.XL,
    },
    image: <ImageProps>{
      size: ImageSizeTokens.FULL,
      resizeMode: ResizeModeToken.COVER,
      aspectRatio: AspectRatioToken.A2_1,
      uri: "https://volt-images.s3.ap-south-1.amazonaws.com/stepper.svg",
    },
    space: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    stepper: <StepperProps & WidgetProps>{
      type: StepperTypeTokens.VERTICAL,
      data: data,
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Start",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.MD,
      lineHeight: SizeTypeTokens.XXL,
      action: {
        type: ACTION.GO_TO_AADHAR_INIT,
        routeId: ROUTE.KYC_STEPPER,
        payload: {},
      },
    },
  },
});

export const kycStepperMF: PageType<any> = {
  onLoad: async ({ network }) => {
    let user = await SharedPropsService.getUser();
    await updateApplicationContextFromApi(
      network,
      user.linkedApplications[0].applicationId
    );
    return Promise.resolve(template(await stepperRepo()));
  },
  actions: {
    [ACTION.GO_TO_AADHAR_INIT]: Go_Next_Action,
  },
  clearPrevious: true,
};
