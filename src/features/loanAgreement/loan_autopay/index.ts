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
  BorderRadiusTokens,
  CardProps,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  MessageAlignType,
  MessageProps,
  MessageTypeTokens,
  ProgressIndicatorProps,
  ProgressIndicatorTypeTokens,
  ShimmerIconProps,
  ShimmerIconSizeTokens,
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
  StepperStateToken,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import { MandateLinkPoll, GetMandateLink, goBack } from "./actions";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";

export const template: (stepper: StepperItem[]) => TemplateSchema = (
  stepper
) => ({
  layout: <Layout>{
    id: ROUTE.LOAN_AUTOPAY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "headerSpace", type: WIDGET.SPACE },
      { id: "headerSpace1", type: WIDGET.SPACE },
      { id: "iconStack", type: WIDGET.STACK },

      { id: "iconSpace", type: WIDGET.SPACE },
      { id: "progressItem", type: WIDGET.PROGRESSINDICATOR },
      { id: "progressSpace", type: WIDGET.SPACE },
      { id: "contentStack", type: WIDGET.STACK },
      { id: "contentSpace", type: WIDGET.SPACE },
      {
        id: "secureText",
        type: WIDGET.MESSAGE,
        position: POSITION.ABSOLUTE_BOTTOM,
        padding: {
          all: 0,
          left: 0,
          right: 0,
          horizontal: 0,
        },
      },
      // {
      //   id: "bottomCard", type: WIDGET.CARD,
      //   position: POSITION.ABSOLUTE_BOTTOM,
      //   padding: {
      //         all: 0,
      //         left: 0,
      //         right: 0,
      //         horizontal:0
      //       },
      // },
      // {
      //   id: "infoStack",
      //   type: WIDGET.STACK,
      //   position: POSITION.ABSOLUTE_BOTTOM,
      //   padding: {
      //     all: 0,
      //     left: 0,
      //     right: 0,
      //   },
      // },
    ],
  },
  datastore: <Datastore>{
    headerStack: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      title: "Setup AutoPay",
      isBackButton: true,
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
      },
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.LOAN_AUTOPAY,
        payload: {},
      },
    },
    headerSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    headerSpace1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    iconStack: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "iconItem", type: WIDGET.SHIMMERICON }],
    },
    iconItem: <ShimmerIconProps>{
      icon: <IconProps>{
        name: IconTokens.FreeBook,
        size: IconSizeTokens.XXXXXXXXL,
      },
      name: "Freebook",
      size: ShimmerIconSizeTokens.XXXXXL,
      borderRadius: BorderRadiusTokens.BR0,
      padding: SizeTypeTokens.SM,
    },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    progressItem: <ProgressIndicatorProps>{
      activeIndex: 1,
      type: ProgressIndicatorTypeTokens.LINEAR,
    },
    progressSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    contentStack: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "titleItem", type: WIDGET.TEXT },
        { id: "Space0", type: WIDGET.SPACE },
        { id: "description", type: WIDGET.TEXT },
      ],
    },
    titleItem: <TypographyProps>{
      label: "Generating AutoPay link",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      lineHeight: 24,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
    },
    Space0: <SpaceProps>{ size: SizeTypeTokens.XS },
    description: <TypographyProps>{
      label: "We’re verifying your details. It may take up to 60 seconds",
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.XS,
      lineHeight: 18,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    contentSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    bottomCard: <CardProps>{
      bgColor: ColorTokens.White,
      body: {
        widgetItems: [
          { id: "secureText", type: WIDGET.MESSAGE },
          // {
          //     id: "infoStack",
          //     type: WIDGET.STACK,
          //   },
          //  { id: "bottomCard2Details", type: WIDGET.STACK }
        ],
      },
    },
    // infoStack: <StackProps>{
    //   type: StackType.row,
    //   width: StackWidth.FULL,
    //  // height: StackHeight.CONTENT,
    //   // justifyContent: StackJustifyContent.center,
    //   // alignItems: StackAlignItems.center,
    //   widgetItems: [{ id: "secureText", type: WIDGET.MESSAGE }],
    // },

    secureText: <MessageProps>{
      label: "Do not leave at this step",
      labelColor: ColorTokens.Grey_Charcoal,
      bgColor: ColorTokens.Primary_02,
      alignText: MessageAlignType.CENTER,
    },
  },
});

export const loanAutoPayMF: PageType<any> = {
  onLoad: async (utils) => {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP =
      StepperStateToken.IN_PROGRESS;
    await SharedPropsService.setUser(user);

    const stepper: StepperItem[] = await horizontalStepperRepo();
    MandateLinkPoll(
      { type: ACTION.POLL, routeId: ROUTE.LOAN_AUTOPAY, payload: {} },
      {},
      utils
    );
    return Promise.resolve(template(stepper));
  },

  actions: {
    [ACTION.POLL]: MandateLinkPoll,
    //  [ACTION.AUTOPAY]: authenticateRepayment,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
