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
  StepperTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { Go_Next_Action } from "./actions";
import { User } from "../otp_verify/types";
import SharedPropsService from "../../SharedPropsService";

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
    const user: User = SharedPropsService.getUser();
    const data: StepperItem[] = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        step: "1",
        title: "KYC Verification",
        subTitle: "lorme ipsum doler smit en",
        status:
          user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION,
        message: "",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        step: "2",
        title: "bank Verification",
        subTitle: "lorme ipsum doler smit en",
        status:
          user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION,
        message: "",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        step: "3",
        title: "Mondate",
        subTitle: "lorme ipsum doler smit en",
        status: user.linkedApplications[0].stepStatusMap.MANDATE_SETUP,
        message: "Something Went Wrong",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d74",
        step: "4",
        title: "Loan Agreement",
        subTitle: "lorme ipsum doler smit en",
        status: user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN,
        message: "",
      },
    ];
    return Promise.resolve(template(data));
  },
  actions: {
    [ACTION.GO_TO_AADHAR_INIT]: Go_Next_Action,
  },
};
