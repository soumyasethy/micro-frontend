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
  TextInputOtpProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTIONS, AuthCASPayload } from "./types";
import { authCAS, goBack } from "./actions";
import { FetchPortfolioPayload } from "../check_limit/types";
import { fetchMyPortfolio } from "../check_limit/actions";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
} from "../../../configs/config";

export const template: (
  // applicationId: string,
  // assetRepository: string,
  // emailId: string,
  // panNumber: string,
  // phoneNumber: string
) => TemplateSchema = (
  // applicationId,
  // assetRepository,
  // emailId,
  // panNumber,
  // phoneNumber
) => {
  return {
    layout: <Layout>{
      id: ROUTE.OTP_PARTNER_PORTFOLIO,
      type: LAYOUTS.MODAL,
      widgets: [
        { id: "space0", type: WIDGET.SPACE },
        {
          id: "headerStack",
          type: WIDGET.STACK,
          padding:{
            horizontal:24,
            left:24,
            right:24
          }
        },
        // { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitleStack", type: WIDGET.STACK,padding:{
          horizontal:24,
          left:24,
          right:24
        } },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT,padding:{
          horizontal:24,
          left:24,
          right:24
        } },
      ],
    },
    datastore: <Datastore>{
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
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
          name: IconTokens.Cross,
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
          routeId: ROUTE.OTP_PARTNER_PORTFOLIO,
        },
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          { id: "subTitleSpace", type: WIDGET.SPACE },
        //  { id: "subTitle2", type: WIDGET.TEXT },
        ],
      },
      subTitle: <TypographyProps>{
        label: `A 4-digit OTP was sent on 982*****54`,
        color: ColorTokens.Grey_Charcoal,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      subTitleSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitle2: <TypographyProps>{
        label:"1234",
       // label: `${phoneNumber}`.substring(3), //.substring(3).slice(0,3) + "*****" + `${phoneNumber}`.substring(3).slice(-2)
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
        charLimit: 5,
       // charLimit: AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH,
        action: {
          type: ACTIONS.AUTH_CAS,
          routeId: ROUTE.OTP_PARTNER_PORTFOLIO,
          payload: <AuthCASPayload>{
            value: "",
            //applicationId,
            assetRepository: AssetRepositoryType.DEFAULT,
          },
        },
        otpAction: {
          type: ACTIONS.RESEND_OTP_AUTH_CAS,
          payload: <FetchPortfolioPayload>{
           // applicationId,
            assetRepository: AssetRepositoryType.DEFAULT,
            // emailId,
            // panNumber,
            // phoneNumber,
          },
          routeId: ROUTE.OTP_PARTNER_PORTFOLIO,
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.MD },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const otpVerifyAuthPartnerMF: PageType<any> = {
  onLoad: async (
    _,
    { 
      //applicationId, assetRepository, emailId, panNumber, phoneNumber
     }
  ) => {
    return Promise.resolve(
      template(
        //applicationId, assetRepository, emailId, panNumber, phoneNumber
        )
    );
  },
  actions: {
    [ACTIONS.AUTH_CAS]: authCAS,
    [ACTIONS.RESEND_OTP_AUTH_CAS]: fetchMyPortfolio,
    [ACTIONS.GO_BACK]: goBack,
  },
  clearPrevious: true,
};
