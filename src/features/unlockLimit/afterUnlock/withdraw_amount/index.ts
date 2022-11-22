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
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  MessageProps,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../../routes";
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
import { api } from "../../../../configs/api";
import { getAppHeader } from "../../../../configs/config";
import { User } from "../../../login/otp_verify/types";
import SharedPropsService from "../../../../SharedPropsService";
import _ from "lodash";

export const template: (
  availableCreditAmount: number,
  accountNumber: string
) => TemplateSchema = (availableCreditAmount, accountNumber) => {
  return {
    layout: <Layout>{
      id: ROUTE.WITHDRAW_AMOUNT,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        // { id: "headerSpace", type: WIDGET.SPACE },
        { id: "amountItem", type: WIDGET.INPUT },
        { id: "amountMsgSpace", type: WIDGET.SPACE },
        // { id: "amountMessage", type: WIDGET.MESSAGE },
        // { id: "amountSpace", type: WIDGET.SPACE },
        { id: "interestItem", type: WIDGET.INPUT },
        { id: "interestMessage", type: WIDGET.TEXT },
        { id: "inputSpace", type: WIDGET.SPACE },
        {
          id: "continue",
          type: WIDGET.BUTTON,
        },
        { id: "messageSpace", type: WIDGET.SPACE },
        { id: "messageItem", type: WIDGET.TEXT },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Withdraw Amount",
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
      headerSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      amountItem: <TextInputProps & WidgetProps>{
        placeholder: "",
        type: InputTypeToken.DEFAULT,
        title: "Enter amount",
        state: InputStateToken.DEFAULT,
        limitLabel:
          "out of " +
          `${availableCreditAmount}`.replace(
            /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
            ","
          ),
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
        type: ButtonTypeTokens.LargeFilled,
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
      messageItem: <TypographyProps>{
        label: `Amount will be transferred to your bank account XXXX ${accountNumber.substring(
          accountNumber.length - 4,
          accountNumber.length
        )}`,
        fontSize: FontSizeTokens.XS,
        numberOfLines: 3,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
      },
    },
  };
};

export const withdraw_amountMF: PageType<any> = {
  onLoad: async ({ network }, { availableCreditAmount }) => {
    const user: User = await SharedPropsService.getUser();
    const accountId = await user.linkedBorrowerAccounts[0].accountId;
    const response = await network.get(`${api.userProfile}${accountId}`, {
      headers: await getAppHeader(),
    });
    const accountNumber = _.get(
      response,
      "data.bankDetails.accountNumber",
      null
    );
    return Promise.resolve(template(availableCreditAmount, accountNumber));
  },

  actions: {
    [ACTION.WITHDRAW_AMOUNT]: CreateDisbursementRequest,
    [ACTION.ON_AMOUNT_CHANGE]: OnAmountChange,
    [ACTION.SET_RECOMENDED_AMOUNT]: SetRecommendedAmount,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
