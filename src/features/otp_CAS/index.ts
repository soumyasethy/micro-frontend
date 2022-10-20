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
  TextInputOtpProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTIONS, AuthCASPayload } from "./types";
import { authCAS, resendOtp } from "./actions";
import { ACTION, FetchPortfolioPayload } from "../check_limit/types";
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
        { id: "subTitle", type: WIDGET.TEXT },
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
      subTitle: <TypographyProps>{
        label: `A 4-digit OTP was sent on ${phoneNumber} `,
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
      },
      input: <TextInputProps & TextInputOtpProps & WidgetProps>{
        title: "Enter OTP",
        type: InputTypeToken.OTP,
        state: InputStateToken.DEFAULT,
        keyboardType: KeyboardTypeToken.numberPad,
        charLimit: 4,
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
