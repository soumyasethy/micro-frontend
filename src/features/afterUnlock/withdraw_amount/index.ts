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
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  ImageProps,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  ResizeModeToken,
  SizeTypeTokens,
  SpaceProps,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  AmountPayload,
  CreateDisbursementRequestPayload,
} from "./types";
import {
  CreateDisbursementRequest,
  goBack,
  OnAmountChange,
  SetRecommendedAmount,
} from "./action";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { getBankIconUrl, maskBankAccountNumber } from "../../../configs/utils";

export const template: (
  availableCreditAmount: number,
  accountNumber: string,
  bankCode: string,
  processingFees: number,
  bankName: string
) => TemplateSchema = (
  availableCreditAmount,
  accountNumber,
  bankCode,
  processingFees,
  bankName
) => {
  return {
    layout: <Layout>{
      id: ROUTE.WITHDRAW_AMOUNT,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "stack", type: WIDGET.STACK },
        { id: "messageSpace", type: WIDGET.SPACE },
        { id: "amountItem", type: WIDGET.INPUT },
        { id: "amountMsgSpace", type: WIDGET.SPACE },
        // { id: "amountMessage", type: WIDGET.MESSAGE },
        // { id: "amountSpace", type: WIDGET.SPACE },
        { id: "card", type: WIDGET.CARD, position: POSITION.ABSOLUTE_BOTTOM },
        {
          id: "cardSpace",
          type: WIDGET.SPACE,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        { id: "messageSpace3", type: WIDGET.SPACE },
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
        { id: "messageSpace", type: WIDGET.SPACE },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Withdraw amount",
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
          routeId: ROUTE.WITHDRAW_AMOUNT,
        },
      },
      stack: <StackProps>{
        type: StackType.row,
        alignItems: "center",
        widgetItems: [
          { id: "text", type: WIDGET.TEXT },
          { id: "logo", type: WIDGET.IMAGE },
          { id: "text2", type: WIDGET.TEXT },
        ],
      },

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
        fontWeight: "bold",
      },
      widgetText2: <TypographyProps>{
        label: `  \u2022 ₹${processingFees} one-time processing fee will be deducted `,
        color: ColorTokens.Red_90,
      },
      widgetText3: <TypographyProps>{
        label: "  \u2022 Transfer may take up to 6 banking hours",
        color: ColorTokens.Red_90,
      },
      widgetText4: <TypographyProps>{
        label: "  \u2022 Requests post 4PM may take up to 12PM of next day",
        color: ColorTokens.Red_90,
      },

      cardSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      text: <TypographyProps>{ label: "To: " },
      logo: <ImageProps>{
        uri: getBankIconUrl(bankCode),
        width: 30,
        height: 30,
      },
      text2: <TypographyProps>{
        label: `${bankName} XXXX ${accountNumber.substring(
          accountNumber.length - 4,
          accountNumber.length
        )}`,
      },
      headerSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      amountItem: <TextInputProps & WidgetProps>{
        isFocus: true,
        onlyNumeric: true,
        placeholder: "",
        type: InputTypeToken.MULTILINE,
        title: "Enter amount",
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        caption: { success: "", error: "" },
        action: {
          type: ACTION.ON_AMOUNT_CHANGE,
          routeId: ROUTE.WITHDRAW_AMOUNT,
          payload: <AmountPayload>{
            value: "",
          },
        },
      },
      amountMsgSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
      // amountMessage: <MessageProps>{
      //   label: "Recommended to use 90% of the limit",
      //   actionText: "Confirm",
      //   icon: <IconProps>{
      //     name: IconTokens.Info,
      //     size: IconSizeTokens.SM,
      //     color: ColorTokens.Grey_Charcoal,
      //   },
      //   labelColor: ColorTokens.Grey_Charcoal,
      //   bgColor: ColorTokens.Grey_Milk_1,
      // },
      // amountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      interestItem: <TextInputProps & WidgetProps>{
        isFocus: false,
        value: `0`,
        state: InputStateToken.DISABLED,
        keyboardType: KeyboardTypeToken.decimalPad,
        placeholder: "",
        type: InputTypeToken.DEFAULT,
        title: "Monthly Interest",
        caption: { success: "", error: "" },
      },
      interestMessage: <TypographyProps>{
        label: "Calculated as per your amount.",
        fontSize: FontSizeTokens.XS,
        color: ColorTokens.Grey_Smoke,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Confirm & get OTP",
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.WITHDRAW_AMOUNT,
          payload: <CreateDisbursementRequestPayload>{
            accountNumber,
          },
          routeId: ROUTE.WITHDRAW_AMOUNT,
        },
      },
      messageSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    },
  };
};

export const withdraw_amountMF: PageType<any> = {
  onLoad: async ({ network }, { availableCreditAmount }) => {
    const user: User = await SharedPropsService.getUser();
    const accountId = user.linkedBorrowerAccounts[0].accountId;
    const processingFees = user.linkedCredits[0].processingCharges;
    const response = await network.get(`${api.userProfile}${accountId}`, {
      headers: await getAppHeader(),
    });
    const accountNumber = _.get(
      response,
      "data.bankDetails.accountNumber",
      null
    );

    const bankName = _.get(response, "data.bankDetails.bankName", null);
    const bankCode = _.get(response, "data.bankDetails.bankCode");

    SharedPropsService.setBankCode(bankCode);
    SharedPropsService.setBankName(bankName);
    return Promise.resolve(
      template(
        availableCreditAmount,
        accountNumber,
        bankCode,
        processingFees,
        bankName
      )
    );
  },

  actions: {
    [ACTION.WITHDRAW_AMOUNT]: CreateDisbursementRequest,
    [ACTION.ON_AMOUNT_CHANGE]: OnAmountChange,
    [ACTION.SET_RECOMENDED_AMOUNT]: SetRecommendedAmount,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
