import {
  Action,
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
  IconProps,
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
import { goBack, NavigateNext, resendOTP, verifyOTP } from "./actions";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
} from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";
import { heightMap } from "../../../configs/height";

export const template: (
  phoneNumber: string,
  assetRepository: AssetRepositoryType,
  sendOtpForPledgeConfirmAction: Action<any>,
  emailId: string
) => TemplateSchema = (
  phoneNumber,
  assetRepository,
  sendOtpForPledgeConfirmAction,
  emailId
) => ({
  layout: <Layout>{
    id: ROUTE.PLEDGE_VERIFY,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.PLEDGE_VERIFY],
    },
    widgets: [
      {
        id: "headerStack",
        type: WIDGET.STACK,
      },
      { id: "space0", type: WIDGET.SPACE },
      { id: "title", type: WIDGET.TEXT },
      { id: "titleSpace", type: WIDGET.SPACE },
      { id: "subTitleStack", type: WIDGET.STACK },
      { id: "space1", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
    ],
  },
  datastore: <Datastore>{
    space0: <SpaceProps>{
      size: SizeTypeTokens.Size6,
    },
    headerStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "icon", type: WIDGET.ICON },
        { id: "leadIcon", type: WIDGET.BUTTON },
      ],
    },
    title: <TypographyProps>{
      label: `${AssetRepositoryMap.get(assetRepository).NAME} has sent an OTP`,
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
        payload: {
          value: "",
          widgetId: "input",
          isResend: false,
        },
        routeId: ROUTE.PLEDGE_VERIFY,
      },
    },
    icon: <IconProps & WidgetProps>{
      name:
        assetRepository === AssetRepositoryType.CAMS
          ? IconTokens.OTPEmail
          : IconTokens.SMS,
      size: IconSizeTokens.Size52,
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    subTitleStack: <StackProps & WidgetProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "subTitle", type: WIDGET.TEXT },
        // { id: "subTitleSpace", type: WIDGET.SPACE },
        { id: "subTitle2", type: WIDGET.TEXT },
      ],
    },
    subTitle: <TypographyProps>{
      label: `OTP sent to `,
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
    },
    // subTitleSpace: <SpaceProps>{
    //   size: SizeTypeTokens.SM,
    // },
    subTitle2: <TypographyProps>{
      label:
        assetRepository === AssetRepositoryType.CAMS
          ? emailId
          : phoneNumber.substring(3),
      color: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    input: <TextInputProps & WidgetProps>{
      resendTimer:
        AssetRepositoryMap.get(assetRepository).OTP_LENGTH == 5 ? 60 : 15,
      type: InputTypeToken.OTP,
      state: InputStateToken.DEFAULT,
      charLimit: AssetRepositoryMap.get(assetRepository).OTP_LENGTH,
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.PLEDGE_VERIFY,
        payload: <OtpPledgePayload>{
          value: "",
          widgetId: "input",
          assetRepository,
          sendOtpForPledgeConfirmAction,
        },
        routeId: ROUTE.PLEDGE_VERIFY,
      },
      otpAction: {
        type: ACTION.RESEND_OTP_NUMBER,
        payload: <OtpPledgePayload>{ assetRepository },
        routeId: ROUTE.PLEDGE_VERIFY,
      },
    },
  },
});

export const pledgeVerifyMF: PageType<any> = {
  onLoad: async (_, { assetRepository, sendOtpForPledgeConfirmAction }) => {
    const user: User = await SharedPropsService.getUser();
    const phoneNumber = user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const emailId = user.linkedBorrowerAccounts[0].accountHolderEmail;

    await SharedPropsService.setAssetRepositoryType(assetRepository);

    return Promise.resolve(
      template(
        phoneNumber,
        assetRepository,
        sendOtpForPledgeConfirmAction,
        emailId
      )
    );
  },

  actions: {
    [ACTION.PLEDGE_VERIFY]: verifyOTP,
    [ACTION.RESEND_OTP_NUMBER]: resendOTP,
    [ACTION.GO_BACK]: goBack,
    [ACTION.NAV_NEXT]: NavigateNext,
  },
  clearPrevious: true,
};
