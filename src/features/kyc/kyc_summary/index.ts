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
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  ListItemProps,
  RadioProps,
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
import SharedPropsService from "../../../SharedPropsService";
import { ACTION } from "./types";
import {
  GoBackAction,
  NavigateNext,
  ToggleKYCSummaryCTA,
  verifyKycSummary,
} from "./actions";
import { horizontalStepperRepo } from "../../../configs/utils";
import { ToggleKYCVerifyCTA } from "../kyc_init/types";
import moment from "moment";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";
import _ from "lodash";

export const template: (
  pan: string,
  address: string,
  dob: string,
  fullName: string,
  photoURL: string,
  stepper: StepperItem[]
) => TemplateSchema = (pan, address, dob, fullName, photoURL, stepper) => ({
  layout: <Layout>{
    id: ROUTE.KYC_SUMMARY,
    type: LAYOUTS.LIST,
    widgets: [
      // { id: "topSpace", type: WIDGET.SPACE },
      { id: "space1", type: WIDGET.SPACE },
      { id: "image", type: WIDGET.IMAGE },
      { id: "panItem", type: WIDGET.LIST_ITEM },
      { id: "divider1", type: WIDGET.DIVIDER },
      { id: "dobItem", type: WIDGET.LIST_ITEM },
      { id: "divider2", type: WIDGET.DIVIDER },
      { id: "addressItem", type: WIDGET.LIST_ITEM },
      { id: "spaceAddress", type: WIDGET.SPACE },
      { id: "tcStack", type: WIDGET.STACK },
      { id: "tcSpace", type: WIDGET.SPACE },
      {
        id: "stackBottom",
        type: WIDGET.STACK,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
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
        routeId: ROUTE.KYC_SUMMARY,
        payload: {},
      },
    },
    divider1: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk,
    },
    divider2: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk,
    },
    stackBottom: <StackProps>{
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      type: StackType.column,
      widgetItems: [
        { id: "continue", type: WIDGET.BUTTON },
        // { id: "sbSpace1", type: WIDGET.SPACE },
        // { id: "sbSpace2", type: WIDGET.SPACE },
      ],
    },
    sbSpace1: <SpaceProps>{ size: SizeTypeTokens.XL },
    sbSpace2: <SpaceProps>{ size: SizeTypeTokens.MD },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR1,
      size: ImageSizeTokens.LG,
      uri: photoURL,
    },
    panItem: <ListItemProps>{
      leadIconName: IconTokens.Person,
      subTitle: fullName,
      title: "Full Name",
    },
    dobItem: <ListItemProps>{
      leadIconName: IconTokens.Calendar,
      subTitle: moment.unix(Number(dob) / 1000).format("DD-MM-yyyy"),
      title: "DOB",
    },
    addressItem: <ListItemProps>{
      leadIconName: IconTokens.Location,
      subTitle: address,
      subTitleLineHeight: 24,
      title: "Address",
    },
    spaceAddress: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    tcStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.flexStart,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [
        { type: WIDGET.RADIO, id: "tcRadio" },
        { type: WIDGET.SPACE, id: "radioTextSpace" },
        { type: WIDGET.TEXT, id: "tcText" },
      ],
    },
    tcRadio: <RadioProps & WidgetProps>{
      isChecked: true,
      size: IconSizeTokens.MD,
      actionChecked: {
        type: ACTION.TOGGLE_CTA,
        routeId: ROUTE.KYC_SUMMARY,
        payload: <ToggleKYCVerifyCTA>{ value: true },
      },
      actionUnChecked: {
        type: ACTION.TOGGLE_CTA,
        routeId: ROUTE.KYC_SUMMARY,
        payload: <ToggleKYCVerifyCTA>{ value: false },
      },
    },
    radioTextSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
    tcText: <TypographyProps>{
      label:
        "By proceeding, I confirm that my current address is same as permanent address as shown above.",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.XS,
      lineHeight: 16,
    },
    tcSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    continue: <ButtonProps & WidgetProps>{
      label: "Confirm",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      fontFamily: FontFamilyTokens.Inter,
      fontSize: FontSizeTokens.MD,
      lineHeight: SizeTypeTokens.XXL,
      fontWeight: "700",
      action: {
        type: ACTION.NAV_TO_BANK_ADD,
        routeId: ROUTE.KYC_SUMMARY,
        payload: {},
      },
    },
  },
});

export const kycSummaryMf: PageType<any> = {
  onLoad: async ({ network }) => {
    const user: User = await SharedPropsService.getUser();
    const applicationId = user.linkedApplications[0].applicationId;
    const pan = user.linkedBorrowerAccounts[0].accountHolderPAN;

    const response = await network.get(
      `${api.kycSummaryInit}${applicationId}`,
      { headers: await getAppHeader() }
    );

    const address = _.get(response, "data.stepResponseObject.address");
    const dob = _.get(response, "data.stepResponseObject.dob");
    const fullName = _.get(response, "data.stepResponseObject.fullName");
    const photoURL = _.get(response, "data.stepResponseObject.photoURL");

    const stepper: StepperItem[] = await horizontalStepperRepo();

    return Promise.resolve(
      template(pan, address, dob, fullName, photoURL, stepper)
    );
  },
  actions: {
    [ACTION.NAV_TO_BANK_ADD]: verifyKycSummary,
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.TOGGLE_CTA]: ToggleKYCSummaryCTA,
    [ACTION.NAVIGATION_NEXT]: NavigateNext,
  },
};
