import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  AspectRatioToken,
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ImageProps,
  ImageSizeTokens,
  ListItemProps,
  SizeTypeTokens,
  SpaceProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { fetchKycSummaryAction } from "./actions";
import { fetchKycSummary } from "./repo";
import SharedPropsService from "../../SharedPropsService";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.KYC_AADHAAR_CONFIRM,
    type: LAYOUTS.LIST,
    widgets: [
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
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    image: <ImageProps>{
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR1,
      size: ImageSizeTokens.LG,
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    panItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle: "BFTPB2772K",
      title: "PAN Number",
    },
    dobItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle: "19-03-1991",
      title: "DOB",
    },
    addressItem: <ListItemProps>{
      leadIconName: "fire",
      subTitle:
        "Maya puri S.O, B-50, Hari Nagar, South west Delhi, Delhi, India - 110064",
      title: "Address",
    },
    continue: <ButtonProps>{
      label: "Confirm",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
    },
  },
};

export const kycConfirmMF: PageType<any> = {
  onLoad: async (_) => {
    const response = await fetchKycSummary(
      SharedPropsService.getUser().linkedBorrowerAccounts[0].accountId
    );
    console.warn("prefetch", response);
    return Promise.resolve(template);
  },
  actions: {
    [ACTION.TEST_ACTION]: fetchKycSummaryAction,
  },
};
