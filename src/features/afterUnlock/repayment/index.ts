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
  AmountCardProps,
  AmountCardTypeTokens,
  AspectRatioToken,
  BorderRadiusTokens,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  DividerProps,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  ListItemProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, CopyToClipboardPayload } from "./types";
import { copyToClipboard, goBack, repayment } from "./actions";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";
import { getBankPNGUrl } from "../../../configs/utils";
import _ from "lodash";

export const template: (
  repaymentAmount: string,
  bankAccountNumber: string,
  bankIfscCode: string,
  bankName: string,
  bankCode: string,
  beneficiaryName: string,
  branchName: string
) => TemplateSchema = (
  repaymentAmount,
  bankAccountNumber: string,
  bankIfscCode: string,
  bankName: string,
  bankCode: string,
  beneficiaryName: string,
  branchName: string
) => ({
  layout: <Layout>{
    id: ROUTE.REPAYMENT,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      // { id: "space0", type: WIDGET.SPACE },
      { id: "amountItem", type: WIDGET.AMOUNTCARD },
      { id: "amountSpace", type: WIDGET.SPACE },
      { id: "headStack", type: WIDGET.TEXT },
      { id: "headSpace", type: WIDGET.SPACE },
      { id: "messageStack", type: WIDGET.TEXT },
      { id: "messageSpace", type: WIDGET.SPACE },
      {
        id: "bankStack",
        type: WIDGET.STACK,
      },
      { id: "dividerTopSpace", type: WIDGET.SPACE },
      { id: "divider", type: WIDGET.DIVIDER },
      {
        id: "listItem1",
        type: WIDGET.LIST_ITEM,
      },
      {
        id: "listItem2",
        type: WIDGET.LIST_ITEM,
      },
      {
        id: "listItem3",
        type: WIDGET.LIST_ITEM,
      },
      {
        id: "listItem4",
        type: WIDGET.LIST_ITEM,
      },
      { id: "listSpace", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    dividerTopSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    header: <HeaderProps>{
      title: "Flexi repay",
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      isBackButton: true,
      type: "DEFAULT",
      action: {
        type: ACTION.GO_BACK,
        payload: <{}>{
          value: "",
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.REPAYMENT,
      },
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XL },
    //<AmountCard
    //   chipText="How?"
    //   message="Recomended to use as per limit"
    //   onPress={() => {}}
    //   progressLabel="10% of total limit available"
    //   renderItem={function noRefCheck() {}}
    //   subTitle="30,000"
    //   subscriptTitle="Out Of 30,000"
    //   title="Approved Cash List"
    //   type="MESSAGE"
    //   warning="Recomended to use as per limit"
    // />
    amountItem: <AmountCardProps>{
      title: "Outstanding amount",
      subTitle: `${repaymentAmount}`.replace(
        /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
        ","
      ),
      subscriptTitle: "",
      message:
        "Enjoy flexible repayments. Pay partially or the complete amount in just one go.",
      type: AmountCardTypeTokens.MESSAGE,
    },
    amountSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    headStack: <TypographyProps>{
      label: "Bank account details",
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      lineHeight: 24,
      fontWeight: "700",
    },
    headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    messageStack: <TypographyProps>{
      label:
        "Add this account as beneficiary to repay principal via NEFT/IMPS. Transfer should happen from the the same account.",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    messageSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    bankStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "leadItem", type: WIDGET.IMAGE },
        { id: "space", type: WIDGET.SPACE },
        { id: "data", type: WIDGET.TEXT },
      ],
    },
    leadItem: <ImageProps>{
      uri: getBankPNGUrl(bankCode),
      size: ImageSizeTokens.SM,
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR5,
      padding: SizeTypeTokens.SM,
    },
    space: <SpaceProps>{ size: SizeTypeTokens.SM },
    data: <TypographyProps>{
      label: `${bankName}`,
      fontSize: FontSizeTokens.MD,
      lineHeight: 24,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
    },
    divider: <DividerProps>{
      color: ColorTokens.Grey_Milk_1,
    },

    listItem1: <ListItemProps & WidgetProps>{
      title: "IFSC",
      subTitle: `${bankIfscCode}`,
      trailLabel: <TypographyProps>{
        label: "Copy",
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.Primary_100,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
        fontWeight: "500",
      },
      trailIconName: IconTokens.Copy,
      isDivider: true,
      action: {
        type: ACTION.COPY,
        routeId: ROUTE.REPAYMENT,
        payload: <CopyToClipboardPayload>{ value: `${bankIfscCode}` },
      },
    },
    listItem2: <ListItemProps & WidgetProps>{
      title: "Account number",
      subTitle: `${bankAccountNumber}`,
      trailLabel: <TypographyProps>{
        label: "Copy",
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.Primary_100,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
        fontWeight: "500",
      },
      trailIconName: IconTokens.Copy,
      isDivider: true,
      action: {
        type: ACTION.COPY,
        routeId: ROUTE.REPAYMENT,
        payload: <CopyToClipboardPayload>{ value: `${bankAccountNumber}` },
      },
    },
    listItem3: <ListItemProps & WidgetProps>{
      title: "Beneficiary name",
      subTitle: `${beneficiaryName}`,
      trailLabel: <TypographyProps>{
        label: "Copy",
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.Primary_100,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
        fontWeight: "500",
      },
      trailIconName: IconTokens.Copy,
      isDivider: true,
      action: {
        type: ACTION.COPY,
        routeId: ROUTE.REPAYMENT,
        payload: <CopyToClipboardPayload>{ value: `${beneficiaryName}` },
      },
    },
    listItem4: <ListItemProps & WidgetProps>{
      title: "Branch name",
      subTitle: `${branchName}`,
      trailLabel: <TypographyProps>{
        label: "Copy",
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.Primary_100,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
        fontWeight: "500",
      },
      trailIconName: IconTokens.Copy,
      action: {
        type: ACTION.COPY,
        routeId: ROUTE.REPAYMENT,
        payload: <CopyToClipboardPayload>{ value: `${branchName}` },
      },
    },
    listSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Back to my account",
      labelColor: ColorTokens.Primary_100,
      type: ButtonTypeTokens.LargeSoftFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.REPAYMENT,
        payload: {
          value: "",
          widgetId: "continue",
          isResend: false,
        },
        routeId: ROUTE.REPAYMENT,
      },
    },
  },
});

export const repaymentMF: PageType<any> = {
  onLoad: async ({ network }, { repaymentAmount }) => {
    const user: User = await SharedPropsService.getUser();
    const response = await network.get(
      `${api.repaymentBankAccountDetails}${user.linkedCredits[0].creditId}`,
      {
        headers: await getAppHeader(),
      }
    );

    const bankName = _.get(response, "data.bankName", "");
    const bankCode = _.get(response, "data.bankCode", "");
    const accountNumber = _.get(response, "data.accountNumber", "");
    const ifscCode = _.get(response, "data.ifscCode", "");
    const beneficiaryName = 'Bajaj Finance Ltd';
    const branchName = 'Nariman Point, Mumbai';

    return Promise.resolve(
      template(repaymentAmount, accountNumber, ifscCode, bankName, bankCode, beneficiaryName, branchName)
    );
  },
  actions: {
    [ACTION.REPAYMENT]: repayment,
    [ACTION.GO_BACK]: goBack,
    [ACTION.COPY]: copyToClipboard,
  },
  clearPrevious: true,
};
