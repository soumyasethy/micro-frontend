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
import { ACTION, OtpPledgePayload } from "./types";
import { goBack, NavigateNext, verifyOTP } from "./actions";
import { fetchUserRepo } from "./repo";
import { sendOtp } from "../pledge_confirmation/actions";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
} from "../../../configs/config";
export const template: (
  phoneNumber: string,
  assetRepository: string
) => TemplateSchema = (phoneNumber, assetRepository) => ({
  layout: <Layout>{
    id: ROUTE.PLEDGE_VERIFY,
    type: LAYOUTS.MODAL,
    widgets: [
      {
        id: "headerStack",
        type: WIDGET.STACK,
      },
      { id: "titleSpace", type: WIDGET.SPACE },
      { id: "subTitleStack", type: WIDGET.STACK },
      { id: "subTitleSpace", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "inputSpace", type: WIDGET.SPACE },
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
        routeId: ROUTE.PLEDGE_VERIFY,
      },
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    subTitleStack: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "subTitle2", type: WIDGET.TEXT },
      ],
    },
    subTitle: <TypographyProps>{
      label: `A ${
        AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH
      }-digit OTP was sent on `,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    subTitle2: <TypographyProps>{
      label: phoneNumber.substring(3),
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
    },
    subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.OTP,
      state: InputStateToken.DEFAULT,
      charLimit: AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH,
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.PLEDGE_VERIFY,
        payload: <OtpPledgePayload>{
          value: "",
          widgetId: "input",
          assetRepository,
        },
        routeId: ROUTE.PLEDGE_VERIFY,
      },
      otpAction: {
        type: ACTION.RESEND_OTP_NUMBER,
        payload: <OtpPledgePayload>{
          value: "",
          widgetId: "input",
          assetRepository,
          isResend: true,
        },
        routeId: ROUTE.OTP_VERIFY,
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

export const pledgeVerifyMF: PageType<any> = {
  onLoad: async ({}, { assetRepository }) => {
    const response = await fetchUserRepo();
    const phoneNumber = response.user.phoneNumber;
    return Promise.resolve(template(phoneNumber, assetRepository));
  },

  actions: {
    [ACTION.PLEDGE_VERIFY]: verifyOTP,
    [ACTION.RESEND_OTP_NUMBER]: sendOtp,
    [ACTION.GO_BACK]: goBack,
    [ACTION.NAV_NEXT]: NavigateNext,
  },
  clearPrevious: true,
};
