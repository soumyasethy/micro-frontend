import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  AspectRatioToken,
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ImageProps,
  ImageSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  StepperItem,
  StepperProps,
  StepperStateToken,
  StepperTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { Go_Next_Action } from "./actions";
import {stepperRepo} from "../../../configs/utils";

export const template: (data: StepperItem[]) => TemplateSchema = (data) => ({
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "image", type: WIDGET.IMAGE },
      { id: "space", type: WIDGET.SPACE },
      { id: "stepper", type: WIDGET.STEPPER },
      { id: "space2", type: WIDGET.SPACE },
      { id: "continue", type: WIDGET.BUTTON },
    ],
  },
  datastore: <Datastore>{
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A16_9,
      borderRadius: BorderRadiusTokens.BR1,
      size: ImageSizeTokens.FULL,
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    space: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    stepper: <StepperProps & WidgetProps>{
      type: StepperTypeTokens.VERTICAL,
      data: data,
    },
    continue: <ButtonProps & WidgetProps>{
      label: "start",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.GO_TO_AADHAR_INIT,
        routeId: ROUTE.KYC_STEPPER,
        payload: {},
      },
    },
  },
});

export const kycStepperMF: PageType<any> = {
  onLoad: async () => {
    return Promise.resolve(template(await stepperRepo()));
  },
  actions: {
    [ACTION.GO_TO_AADHAR_INIT]: Go_Next_Action,
  },
};