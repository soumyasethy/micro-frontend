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
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
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
import { authCAS } from "./actions";
import { FetchPortfolioPayload } from "../check_limit/types";
import { fetchMyPortfolio } from "../check_limit/actions";

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
      widgets: [
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitleStack", type: WIDGET.STACK },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
      ],
    },
    datastore: <Datastore>{
      back: <ButtonProps>{
        type: ButtonTypeTokens.IconGhost,
        icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
      },
      title: <TypographyProps>{
        label: "Enter OTP",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitleStack: <StackProps & WidgetProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "subTitle", type: WIDGET.TEXT },
          { id: "subTitle2", type: WIDGET.TEXT },
        ]
      },
      subTitle: <TypographyProps>{
        label: `A 6-digit OTP was sent on `,
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
      },
      subTitle2: <TypographyProps>{
        label: `${phoneNumber}`.substring(3).slice(0,3) + "*****" + `${phoneNumber}`.substring(3).slice(-2),
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
        fontWeight: "bold",
      },
      input: <TextInputProps & TextInputOtpProps & WidgetProps>{
        title: "Enter OTP",
        type: InputTypeToken.OTP,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: 6,
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
          payload: <FetchPortfolioPayload>{
            applicationId,
            assetRepository,
            emailId,
            panNumber,
            phoneNumber,
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
  onLoad: async (
    _,
    { applicationId, assetRepository, emailId, panNumber, phoneNumber }
  ) => {
    return Promise.resolve(
      template(applicationId, assetRepository, emailId, panNumber, phoneNumber)
    );
  },
  actions: {
    [ACTIONS.AUTH_CAS]: authCAS,
    [ACTIONS.RESEND_OTP_AUTH_CAS]: fetchMyPortfolio,
  },
};
