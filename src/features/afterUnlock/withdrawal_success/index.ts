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
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
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

export const template: (
  disbursalAmount: string,
  accountNumber: string
) => TemplateSchema = (disbursalAmount: string, accountNumber: string) => ({
  layout: <Layout>{
    id: ROUTE.WITHDRAWAL_SUCCESS,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.WITHDRAWAL_SUCCESS],
    },
    widgets: [
      // {
      //   id: "success",
      //   type: WIDGET.VERIFICATIONCARD,
      // },
      { id: "divider", type: WIDGET.DIVIDER },
      { id: "dividerSpace", type: WIDGET.SPACE },
      { id: "amountStack", type: WIDGET.STACK },
      { id: "amountSpace", type: WIDGET.SPACE },
      { id: "timeStack", type: WIDGET.STACK },
      { id: "timeSpace", type: WIDGET.SPACE },
      { id: "messageStack", type: WIDGET.STACK },
      { id: "messageSpace", type: WIDGET.SPACE },
      { id: "info", type: WIDGET.INFO },
      { id: "infoSpace", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
      },
    ],
  },
  datastore: <Datastore>{
    success: <VerificationCardProps>{
      label: "Withdrawal request successful",
      type: VerificationCardTypeTokens.Success,
    },
    divider: <DividerProps>{
      size: DividerSizeTokens.SM,
      margin: {
        vertical: SizeTypeTokens.SM,
        horizontal: SizeTypeTokens.SM,
      },
      color: ColorTokens.Grey_Chalk,
    },
    dividerSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
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
      fontSize: FontSizeTokens.XXL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      lineHeight: 32,
    },
    amountSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
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
      widgetItems: [{ id: "message", type: WIDGET.TEXT }],
    },

    message: <TypographyProps>{
      label: `We’re processing your withdrawal request. It should be deposited in XXXX ${accountNumber.substring(
        accountNumber.length - 4,
        accountNumber.length
      )} account in next 2-3 hours.`,
      fontSize: FontSizeTokens.XXS,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
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
    return Promise.resolve(template(disbursalAmount, accountNumber));
  },
  actions: {
    [ACTION.WITHDRAWAL_SUCCESS]: Done,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
