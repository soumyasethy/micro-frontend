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
  HeaderProps,
  HeaderTypeTokens,
  ImageProps,
  ImageSizeTokens,
  ListItemProps,
  SizeTypeTokens,
  SpaceProps,
  StepperItem,
  StepperProps,
  StepperTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { fetchKycSummaryRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import { ACTION } from "./types";
import { NavToBankAction } from "./actions";
import { stepperRepo } from "../../../configs/utils";

export const template: (
  pan: string,
  address: string,
  dob: string,
  fullName: string,
  photoURL: string,
  stepper: StepperItem[]
) => TemplateSchema = (pan, address, dob, fullName, photoURL, stepper) => ({
  layout: <Layout>{
    id: ROUTE.KYC_AADHAAR_CONFIRM,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "topSpace", type: WIDGET.SPACE },
      { id: "space1", type: WIDGET.SPACE },
      { id: "image", type: WIDGET.IMAGE },
      { id: "panItem", type: WIDGET.LIST_ITEM },
      { id: "dobItem", type: WIDGET.LIST_ITEM },
      { id: "addressItem", type: WIDGET.LIST_ITEM },
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
    header: <HeaderProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      subTitle:
        "Volt Protects your financial information with Bank Grade Security",
      title: "Bank Verification",
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        type: StepperTypeTokens.HORIZONTAL,
        data: stepper,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR1,
      size: ImageSizeTokens.LG,
      uri: photoURL,
    },
    panItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle: pan,
      title: "PAN Number",
    },
    dobItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle: dob,
      title: "DOB",
    },
    addressItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle: address,
      title: "Address",
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Confirm",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.NAV_TO_BANK_ADD,
        routeId: ROUTE.KYC_AADHAAR_CONFIRM,
        payload: {},
      },
    },
  },
});

export const kycConfirmMF: PageType<any> = {
  onLoad: async (_) => {
    const response = await fetchKycSummaryRepo(
      (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId
    );
    const { address, dob, fullName, photoURL } = response;
    const pan = (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
      .accountHolderPAN;
    const stepper: StepperItem[] = await stepperRepo();
    return Promise.resolve(
      template(pan, address, dob, fullName, photoURL, stepper)
    );
  },
  actions: { [ACTION.NAV_TO_BANK_ADD]: NavToBankAction },
};
