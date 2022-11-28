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
  DividerSizeTokens,
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
import { ACTION } from "./types";
import { goBack, repayment } from "./actions";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";

export const template: (
  repaymentAmount: string,
  bankAccountNumber: string,
  bankIfscCode: string,
  bankName: string,
  bankCode: string
) => TemplateSchema = (
  repaymentAmount,
  bankAccountNumber: string,
  bankIfscCode: string,
  bankName: string,
  bankCode: string
) => ({
  layout: <Layout>{
    id: ROUTE.REPAYMENT,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.FIXED_TOP,
      },
      { id: "amountItem", type: WIDGET.AMOUNTCARD },
      { id: "amountSpace", type: WIDGET.SPACE },
      { id: "headStack", type: WIDGET.TEXT },
      { id: "headSpace", type: WIDGET.SPACE },
      { id: "messageStack", type: WIDGET.TEXT },
      { id: "messageSpace", type: WIDGET.SPACE },
      { id: "bankStack", type: WIDGET.STACK,padding:{
        horizontal:10,left:10,right:10,all:10
      } },
      { id: "divider", type: WIDGET.DIVIDER },
    //   {id:"tryStack",type:WIDGET.STACK,padding:{
    //     horizontal:16,left:16,right:16
    // } },
      { id: "listItem1", type: WIDGET.LIST_ITEM,padding:{
        horizontal:4,left:4,right:16
    }  },
      { id: "listItem2", type: WIDGET.LIST_ITEM,padding:{
        horizontal:4,left:4,right:18
    }  },
      { id: "listSpace", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
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
    amountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    headStack: <TypographyProps>{
      label: "Bank account details",
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
    },
    headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    messageStack: <TypographyProps>{
      label:
        "Add this account as beneficiary to repay principal via NEFT/IMPS. Transfer should happen from the the same account.",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
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
      uri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${bankCode}.svg`,
      size: ImageSizeTokens.SM,
      aspectRatio: AspectRatioToken.A1_1,
      borderRadius: BorderRadiusTokens.BR5,
      padding: SizeTypeTokens.SM,
    },
    space: <SpaceProps>{ size: SizeTypeTokens.SM },
    data: <TypographyProps>{
      label: `${bankName}`,
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
    },
    divider: <DividerProps>{
      size: DividerSizeTokens.SM,
      margin: {
        vertical: SizeTypeTokens.MD,
        horizontal: SizeTypeTokens.MD,
      },
      color: ColorTokens.Grey_Milk_1,
    },
    tryStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "leadItem2", type: WIDGET.STACK },
        { id: "leadItem3", type: WIDGET.STACK },
      ],
    },
    leadItem2: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "leadItem4", type: WIDGET.TEXT },
        { id: "leadItem5", type: WIDGET.TEXT },
      ],
    },
    leadItem4: <TypographyProps>{
      label:
        "IFSC",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    leadItem5: <TypographyProps>{
      label:
        "IFSC",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    listItem1: <ListItemProps>{
      title: "IFSC",
      subTitle: `${bankIfscCode}`,
      trailLabel: "Copy",
      trailIconName: IconTokens.Copy,
      isDivider:true,
      onPress: () => {},
    },
    listItem2: <ListItemProps>{
      title: "Account number",
      subTitle: `${bankAccountNumber}`,
      trailLabel: "Copy",
      trailIconName: IconTokens.Copy,
      onPress: () => {},
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
    const { bankName, bankCode, accountNumber, ifscCode } = response.data;

    return Promise.resolve(
      template(repaymentAmount, accountNumber, ifscCode, bankName, bankCode)
    );
  },
  actions: {
    [ACTION.REPAYMENT]: repayment,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};