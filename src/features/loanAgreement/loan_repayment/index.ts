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
  ShimmerIconProps,
  ShimmerIconSizeTokens,
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
import { ACTION, LimitPayload } from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import {
  authenticateRepayment,
  goBack,
  AutoPayPoll,
  openLinkInNewTab,
  PollMandateStatus,
  NavLoanAgreement,
  NavLoanRepayment,
} from "./actions";

export const template: (
  stepper: StepperItem[],
  url: string
) => TemplateSchema = (stepper, url) => ({
  layout: <Layout>{
    id: ROUTE.LOAN_REPAYMENT,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "headerSpace", type: WIDGET.SPACE },
      { id: "headItem", type: WIDGET.TEXT },
      { id: "headSpace", type: WIDGET.SPACE },
      { id: "contentItem", type: WIDGET.TEXT },
      { id: "contentSpace", type: WIDGET.SPACE },
      { id: "iconStack", type: WIDGET.STACK },
      { id: "iconSpace", type: WIDGET.SPACE },
      { id: "btnData", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM },
    ],
  },
  datastore: <Datastore>{
    headerStack: <HeaderProps & WidgetProps>{
      // leadIcon: `${url}`,
      title: "Setup AutoPay",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
      },
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.LOAN_REPAYMENT,
        payload: {},
      },
    },
    headerSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
    headItem: <TypographyProps>{
      label: "Link bank account for AutoPay",
      fontSize: FontSizeTokens.MD,
      lineHeight: 24,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    contentItem: <TypographyProps>{
      label:
        "Hassle-free repayment of interest charges at the start of every month.",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    contentSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    iconStack: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "upsideSpace", type: WIDGET.SPACE },
        { id: "iconcontent", type: WIDGET.SHIMMERICON },
        { id: "downsideSpace", type: WIDGET.SPACE },
      ],
    },
    upsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    iconcontent: <ShimmerIconProps>{
      icon: <IconProps>{
        name: IconTokens.Group74508,
        size: IconSizeTokens.XXXXXXXXL,
      },
      name: "Group74508",
      size: ShimmerIconSizeTokens.XXXXXL,
      borderRadius: BorderRadiusTokens.BR0,
      padding: SizeTypeTokens.SM,
    },
    downsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    btnData: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "btnItem", type: WIDGET.BUTTON },
        { id: "btnSpace", type: WIDGET.SPACE },
        { id: "disclaimerStack", type: WIDGET.STACK },
      ],
    },
    btnItem: <ButtonProps & WidgetProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      labelColor: ColorTokens.White,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.REPAYMENT,
        payload: <LimitPayload>{ value: url },
        routeId: ROUTE.LOAN_REPAYMENT,
      },
    },
    btnSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    disclaimerStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "secureIcon", type: WIDGET.ICON },
        { id: "secureSpace", type: WIDGET.SPACE },
        { id: "secureText", type: WIDGET.TEXT },
      ],
    },
    secureIcon: <IconProps>{
      name: IconTokens.SafeGuard,
      size: IconSizeTokens.XS,
    },
    secureSpace: <SpaceProps>{
      size: SizeTypeTokens.LG,
    },
    secureText: <TypographyProps>{
      label: "AutoPay is safe & secure",
      color: ColorTokens.Secondary_100,
      fontSize: FontSizeTokens.XXS,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
    },
  },
});

export const loanRepaymentMF: PageType<any> = {
  onLoad: async ({}, { url }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
    return Promise.resolve(template(stepper, url));
  },

  actions: {
    [ACTION.REPAYMENT]: authenticateRepayment,
    [ACTION.GO_BACK]: goBack,
    [ACTION.LINK_POLL]: AutoPayPoll,
    [ACTION.OPEN_TAB]: openLinkInNewTab,
    [ACTION.POLL_MANDATE_STATUS]: PollMandateStatus,
    [ACTION.GO_LOAN_AGREEMENT]: NavLoanAgreement,
    [ACTION.GO_LOAN_REPAYMENT]: NavLoanRepayment,
  },
};
