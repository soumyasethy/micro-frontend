import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
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
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, DisbursementOTPPayload } from "./types";
import { goBack, DisbursalVerifyAction, CreateDisbursementRequest } from "./action";
import SharedPropsService from "../../../SharedPropsService";
import {heightMap} from "../../../configs/height";

export const template: (
  disbursalAmount: string,
  mobileNumber: string,
  accountNumber: string
) => TemplateSchema = (
  disbursalAmount: string,
  mobileNumber: string,
  accountNumber: string
) => ({
  layout: <Layout>{
    id: ROUTE.WITHDRAWAL_OTP,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.WITHDRAWAL_OTP]
    },
    widgets: [
      {
        id: "headerStack",
        type: WIDGET.STACK,
      },
      { id: "titleSpace", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "subTitleSpace", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      // { id: "inputSpace", type: WIDGET.SPACE },
    ],
  },
  datastore: <Datastore>{
    headerStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "title", type: WIDGET.TEXT },
        { id: "leadIcon", type: WIDGET.BUTTON },
      ],
    },
    title: <TypographyProps>{
      label: "Enter OTP",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "600",
    },
    leadIcon: <ButtonProps & WidgetProps>{
      label: "",
      type: ButtonTypeTokens.SmallGhost,
      width: ButtonWidthTypeToken.CONTENT,
      stack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
      },
      icon: {
        name: IconTokens.Cancel,
        align: IconAlignmentTokens.right,
        size: IconSizeTokens.XXXXL,
      },
      action: {
        type: ACTION.GO_BACK,
        payload: <{}>{
          value: "",
          widgetId: "input",
          isResend: false,
        },
        routeId: ROUTE.WITHDRAWAL_OTP,
      },
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    subTitle: <TypographyProps>{
      label: `A 4-digit OTP was sent on ${mobileNumber.substring(
        0,
        3
      )}*****${mobileNumber.substring(
        mobileNumber.length - 2,
        mobileNumber.length
      )}`,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.OTP,
      state: InputStateToken.DEFAULT,
      charLimit: 4,
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.WITHDRAWAL_OTP,
        payload: <DisbursementOTPPayload>{
          value: "",
          disbursalAmount,
          accountNumber,
        },
        routeId: ROUTE.WITHDRAWAL_OTP,
      },
      otpAction: {
        type: ACTION.RESEND_WITHDRAWAL_OTP,
        payload: <DisbursementOTPPayload>{
          disbursalAmount
          // value: "", widgetId: "input" 
          },
        routeId: ROUTE.WITHDRAWAL_OTP,
      },
    },
    inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    message: <TypographyProps>{
      label: "Resend OTP in 14 secs",
      fontSize: FontSizeTokens.XS,
      color: ColorTokens.Grey_Charcoal,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
  },
});

export const withdrawalOtpMF: PageType<any> = {
  onLoad: async (_, { disbursalAmount, accountNumber }) => {
    const mobileNumber = (await SharedPropsService.getUser())
      .linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    return Promise.resolve(
      template(disbursalAmount, mobileNumber.replace("+91", ""), accountNumber)
    );
  },

  actions: {
    [ACTION.WITHDRAWAL_OTP]: DisbursalVerifyAction,
    [ACTION.RESEND_WITHDRAWAL_OTP]: CreateDisbursementRequest,
    [ACTION.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
