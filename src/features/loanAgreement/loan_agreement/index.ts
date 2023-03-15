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
  StepperStateToken,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
import { fetchLinkRepo } from "./repo";
import {
  authenticateRepayment,
  goBack,
  NavToAutoPay,
  NavToLoanAgreement,
  openLinkInNewTab,
  PollAgreementStatusAction,
} from "./actions";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";

export const template: (
  stepper: StepperItem[],
  urlData: string
) => TemplateSchema = (stepper, urlData) => ({
  layout: <Layout>{
    id: ROUTE.LOAN_AGREEMENT,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "headerStack",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      { id: "headerSpace", type: WIDGET.SPACE },
      // { id: "contentStack",type: WIDGET.STACK},
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
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      title: "Review Agreement",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
      },
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.LOAN_AGREEMENT,
        payload: {},
      },
    },
    headerSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
    headItem: <TypographyProps>{
      label: "Review agreement",
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    contentItem: <TypographyProps>{
      label: "Verify and confirm the usage terms & charges",
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
        { id: "upsideSpace1", type: WIDGET.SPACE },
        { id: "iconcontent", type: WIDGET.SHIMMERICON },
        { id: "downsideSpace", type: WIDGET.SPACE },
        { id: "downsideSpace1", type: WIDGET.SPACE },
      ],
    },
    upsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    upsideSpace1: <SpaceProps>{ size: SizeTypeTokens.MD },
    downsideSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    downsideSpace1: <SpaceProps>{ size: SizeTypeTokens.MD },
    iconcontent: <ShimmerIconProps>{
      icon: <IconProps>{
        name: IconTokens.ContractFile,
        size: IconSizeTokens.XXXXXXXXL,
      },
      name: "Freebook",
      size: ShimmerIconSizeTokens.XXXXXL,
      borderRadius: BorderRadiusTokens.BR0,
      padding: SizeTypeTokens.SM,
    },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    btnData: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "btnItem", type: WIDGET.BUTTON },
      ],
    },
    btnItem: <ButtonProps & WidgetProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      labelColor: ColorTokens.White,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.REPAYMENT,
        payload: <{}>{
          value: urlData,
          widgetId: "input",
          isResend: false,
        },
        routeId: ROUTE.LOAN_AGREEMENT,
      },
    },
    btnSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const loanAgreementMF: PageType<any> = {
  onLoad: async () => {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN =
      StepperStateToken.IN_PROGRESS;
    await SharedPropsService.setUser(user);

    const stepper: StepperItem[] = await horizontalStepperRepo();
    const responseX = await fetchLinkRepo();
    const urlData = responseX.stepResponseObject;
    return Promise.resolve(template(stepper, urlData));
  },

  actions: {
    [ACTION.REPAYMENT]: authenticateRepayment,
    [ACTION.GO_BACK]: goBack,
    [ACTION.OPEN_TAB]: openLinkInNewTab,
    [ACTION.GO_TO_AUTOPAY]: NavToAutoPay,
    [ACTION.POLL_AGREEMENT_STATUS]: PollAgreementStatusAction,
    [ACTION.GO_TO_LOAN_AGREEMENT]: NavToLoanAgreement,
  },
};
