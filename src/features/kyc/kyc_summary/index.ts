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
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
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
import { kycSummaryInitRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION } from "./types";
import {
  GoBackAction,
  NavigateNext,
  ToggleKYCSummaryCTA,
  verifyKycSummary,
} from "./actions";
import { stepperRepo } from "../../../configs/utils";
import { NavigationNext, ToggleKYCVerifyCTA } from "../kyc_init/types";
import moment from "moment";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

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
      { id: "dobItem", type: WIDGET.LIST_ITEM },
      { id: "addressItem", type: WIDGET.LIST_ITEM },
      { id: "spaceAddress", type: WIDGET.SPACE },
      { id: "tcStack", type: WIDGET.STACK },
      { id: "tcSpace", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
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
        routeId: ROUTE.KYC_SUMMARY,
        payload: {},
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR1,
      size: ImageSizeTokens.XXXL,
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
    },
    tcSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    continue: <ButtonProps & WidgetProps>{
      label: "Confirm",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
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
    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;
    const response = await network.get(
      `${api.kycSummaryInit}${applicationId}`,
      { headers: await getAppHeader() }
    );

    const { address, dob, fullName, photoURL } = await response.data
      .stepResponseObject;
    const pan = (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
      .accountHolderPAN;
    const stepper: StepperItem[] = await stepperRepo();
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
