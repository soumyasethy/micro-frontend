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
  CardProps,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  ImageProps,
  InfoProps,
  InfoStateTokens,
  InfoTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  VerificationCardButtonTypeToken,
  VerificationCardProps,
  VerificationCardTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { Done, goBack } from "./action";
import moment from "moment";
import { heightMap } from "../../../configs/height";
import { priceInWords } from "../withdraw_amount/action";
import SharedPropsService from "../../../SharedPropsService";
import { getBankIconUrl } from "../../../configs/utils";

export const template: (
  disbursalAmount: string,
  accountNumber: string,
  processingFees: number,
  bankCode: string,
  bankName: string
) => TemplateSchema = (
  disbursalAmount: string,
  accountNumber: string,
  processingFees: number,
  bankCode,
  bankName
) => ({
  layout: <Layout>{
    id: ROUTE.WITHDRAWAL_SUCCESS,
    type: LAYOUTS.LIST,
    style: {
      height: heightMap[ROUTE.WITHDRAWAL_SUCCESS],
    },

    widgets: [
      {
        id: "success",
        type: WIDGET.VERIFICATIONCARD,
        padding: {
          top: 120,
        },
      },
      { id: "amountStack", type: WIDGET.STACK },
      { id: "amountSpace", type: WIDGET.SPACE },
      { id: "amountText", type: WIDGET.TEXT },
      { id: "amountTextSpace", type: WIDGET.SPACE },
      { id: "timeStack", type: WIDGET.STACK },
      { id: "timeSpace", type: WIDGET.SPACE },
      { id: "messageStack", type: WIDGET.STACK },
      { id: "messageSpace", type: WIDGET.SPACE },
      { id: "card", type: WIDGET.CARD, position: POSITION.ABSOLUTE_BOTTOM },
      {
        id: "cardSpace",
        type: WIDGET.SPACE,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      /*    { id: "info", type: WIDGET.INFO },
        { id: "infoSpace", type: WIDGET.SPACE },*/
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    success: <VerificationCardProps>{
      label: "",
      message: "",
      type: VerificationCardTypeTokens.Success,
      buttonType: VerificationCardButtonTypeToken.FULL,
      buttonText: "",
    },
    divider: <DividerProps>{
      size: DividerSizeTokens.SM,
      margin: {
        vertical: SizeTypeTokens.SM,
        horizontal: SizeTypeTokens.SM,
      },
      color: ColorTokens.Grey_Chalk,
    },
    topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    amountStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "amount", type: WIDGET.TEXT }],
    },
    amount: <TypographyProps>{
      label: `₹${disbursalAmount}`.replace(
        /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
        ","
      ),
      fontSize: FontSizeTokens.XXXL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      lineHeight: 40,
    },
    amountSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    amountTextSpace: <SpaceProps>{ size: SizeTypeTokens.XL },

    amountText: <TypographyProps>{
      label: priceInWords(disbursalAmount) + " Only.",
      textAlign: "center",
      color: ColorTokens.Grey_Charcoal,
    },
    timeStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "time", type: WIDGET.TEXT }],
    },
    time: <TypographyProps>{
      label: `${moment(new Date()).format("MMM DD YYYY")}  •  ${moment(
        new Date()
      ).format("hh:mm A")}`,
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      lineHeight: 18,
    },
    timeSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    messageStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [
        { id: "message", type: WIDGET.TEXT },
        { id: "logo", type: WIDGET.IMAGE },
        { id: "text2", type: WIDGET.TEXT },
      ],
    },

    message: <TypographyProps>{
      label: `To: `,
      color: ColorTokens.Grey_Charcoal,
      fontWeight: "400",
    },
    logo: <ImageProps>{ uri: getBankIconUrl(bankCode), width: 30, height: 30 },
    text2: <TypographyProps>{
      label: `${bankName} XXXX ${accountNumber.substring(
        accountNumber.length - 4,
        accountNumber.length
      )}`,
      color: ColorTokens.Grey_Charcoal,
    },
    messageSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    info: <InfoProps>{
      label: "Pay as you go",
      message:
        "Just pay minimum interest amount every 30 days. The principal can be repaid at the end of the credit limit tenure. There is no fixed emi payment every month, plan the repayments according to your convenience.",
      actionText: "",
      type: InfoTypeTokens.SUCCESS,
      state: InfoStateTokens.GRADIENT,
    },
    infoSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    card: <CardProps>{
      body: {
        widgetItems: [
          { id: "widgetText", type: WIDGET.TEXT },
          { id: "widgetText2", type: WIDGET.TEXT },
          { id: "widgetText3", type: WIDGET.TEXT },
          { id: "widgetText4", type: WIDGET.TEXT },
        ],
      },
      bgColor: ColorTokens.Yellow_10,
      margin: 20,
      borderTopRightRadius: BorderRadiusTokens.BR2,
      borderTopLeftRadius: BorderRadiusTokens.BR2,
      borderBottomLeftRadius: BorderRadiusTokens.BR2,
      borderBottomRightRadius: BorderRadiusTokens.BR2,
    },
    widgetText: <TypographyProps>{
      label: " Please note",
      color: ColorTokens.Red_90,
    },
    widgetText2: <TypographyProps>{
      label: `  \u2022 ₹${processingFees} one-time processing fee will be deducted `,
      color: ColorTokens.Red_90,
    },
    widgetText3: <TypographyProps>{
      label: "  \u2022 Transfers may take up to 6 banking hours",
      color: ColorTokens.Red_90,
    },
    widgetText4: <TypographyProps>{
      label: "  \u2022 Requests post 4PM may take up to 12PM of next day",
      color: ColorTokens.Red_90,
    },
    cardSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Done",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.WITHDRAWAL_SUCCESS,
        payload: {
          value: "",
        },
        routeId: ROUTE.WITHDRAWAL_SUCCESS,
      },
    },
  },
});

export const withdrawalSuccessMF: PageType<any> = {
  onLoad: async (_, { disbursalAmount, accountNumber }) => {
    const user = await SharedPropsService.getUser();
    const bankCode = await SharedPropsService.getBankCode();
    const bankName = await SharedPropsService.getBankName();
    const processingFees = user.linkedCredits[0].processingCharges;
    return Promise.resolve(
      template(
        disbursalAmount,
        accountNumber,
        processingFees,
        bankCode,
        bankName
      )
    );
  },

  actions: {
    [ACTION.WITHDRAWAL_SUCCESS]: Done,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
