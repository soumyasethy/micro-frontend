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
  TextInputOtpProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS, AuthCASPayload } from "./types";
import { authCAS, fetchMyPortfolio, goBack, navToFetch } from "./actions";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
} from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";
import {heightMap} from "../../../configs/height";

export const template: (
  applicationId: string,
  assetRepository: string,
  emailId: string,
  panNumber: string,
  phoneNumber: string
) => TemplateSchema = (
  applicationId,
  assetRepository,
  emailId,
  panNumber,
  phoneNumber
) => {
  return {
    layout: <Layout>{
      id: ROUTE.OTP_AUTH_CAS,
      type: LAYOUTS.MODAL,
      style: {
        height: heightMap[ROUTE.OTP_AUTH_CAS]
      },
      widgets: [
        {
          id: "headerStack",
          type: WIDGET.STACK,
        },
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        // { id: "icon", type: WIDGET.ICON },
        { id: "subTitleStack", type: WIDGET.STACK },
        { id: "space2", type: WIDGET.SPACE },
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
        label: `${AssetRepositoryMap[assetRepository].NAME} has sent an OTP`, //${AssetRepositoryMap[assetRepository].MODE_OF_COMM}
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
          type: ACTIONS.GO_BACK,
          payload: <{}>{
            value: "",
            widgetId: "input",
            isResend: false,
          },
          routeId: ROUTE.OTP_AUTH_CAS,
        },
      },
      icon: <IconProps & WidgetProps>{
        name:
          assetRepository === AssetRepositoryType.CAMS
            ? IconTokens.OTPEmail
            : IconTokens.SMS,
        size: IconSizeTokens.Size52,
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          // { id: "subTitleSpace", type: WIDGET.SPACE },
          { id: "subTitle2", type: WIDGET.TEXT },
        ],
      },
      subTitle: <TypographyProps>{
        // Check your ${AssetRepositoryMap[
        //   assetRepository
        // ].MODE_OF_COMM.toLowerCase()}:
        label: `OTP sent to `,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontSize: FontSizeTokens.SM,
        fontWeight: "500",
      },
      // subTitleSpace: <SpaceProps>{
      //   size: SizeTypeTokens.SM,
      // },
      subTitle2: <TypographyProps>{
        label:
          assetRepository === AssetRepositoryType.CAMS
            ? emailId
            : `${phoneNumber}`.substring(3),
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      input: <TextInputProps & TextInputOtpProps & WidgetProps>{
        title: "Enter OTP",
        type: InputTypeToken.OTP,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: AssetRepositoryMap[assetRepository].OTP_LENGTH,
        action: {
          type: ACTIONS.AUTH_CAS,
          routeId: ROUTE.OTP_AUTH_CAS,
          payload: <AuthCASPayload>{
            value: "",
            applicationId,
            assetRepository,
          },
        },
        otpAction: {
          type: ACTIONS.RESEND_OTP_AUTH_CAS,
          payload: <AuthCASPayload>{
            // applicationId,
            // assetRepository,
            // emailId,
            // panNumber,
            // phoneNumber,
          },
          routeId: ROUTE.OTP_AUTH_CAS,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.MD },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const otpVerifyAuthCASMF: PageType<any> = {
  onLoad: async () => {
    const user: User = await SharedPropsService.getUser();
    const applicationId = user.linkedApplications[0].applicationId;
    const emailId = user.linkedBorrowerAccounts[0].accountHolderEmail;
    const panNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber = user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const assetRepository = await SharedPropsService.getAssetRepositoryType();
    return Promise.resolve(
      template(applicationId, assetRepository, emailId, panNumber, phoneNumber)
    );
  },
  actions: {
    [ACTIONS.AUTH_CAS]: authCAS,
    [ACTIONS.RESEND_OTP_AUTH_CAS]: fetchMyPortfolio,
    [ACTIONS.GO_BACK]: goBack,
    [ACTIONS.NAV_TO_FETCH]: navToFetch,
  },
  clearPrevious: true,
};
