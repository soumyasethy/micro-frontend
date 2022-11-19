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
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, ContinuePayload, EmailPayload } from "./types";
import { saveEmailId, textOnChange } from "./actions";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { toggleCTA } from "../../login/phone_number/actions";
import SharedPropsService from "../../../SharedPropsService";

export const template: (applicationId: string) => TemplateSchema = (
  applicationId
) => {
  return {
    layout: <Layout>{
      id: ROUTE.ENTER_EMAIL,
      type: LAYOUTS.LIST,
      widgets: [
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.FIXED_BOTTOM,
        },
        { id: "space0", type: WIDGET.SPACE },
        { id: "title", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "space2", type: WIDGET.SPACE },
        { id: "input", type: WIDGET.INPUT },
        { id: "space3", type: WIDGET.SPACE },
        { id: "whatsappStack", type: WIDGET.STACK },
        { id: "space4", type: WIDGET.SPACE },
      ],
    },
    datastore: <Datastore>{
      space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Continue",
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.CONTINUE,
          payload: <ContinuePayload>{
            value: "",
            widgetId: "input",
            applicationId,
          },
          routeId: ROUTE.ENTER_EMAIL,
        },
      },
      title: <TypographyProps>{
        label: "Enter your email",
        fontSize: FontSizeTokens.XL,
        color: ColorTokens.Grey_Night,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
      },
      subTitle: <TypographyProps>{
        label: "We need email linked with your investments",
        color: ColorTokens.Grey_Charcoal,
        fontSize: FontSizeTokens.SM,
        numberOfLines: 1,
      },
      input: <TextInputProps & WidgetProps>{
        regex: "^^[a-zA-Z0-9._{|}-]*@[a-zA-Z0-9]+.^[A-Za-z]+${2,}$",
        isLowerCase: true,
        clearEnabled: true,
        type: InputTypeToken.EMAIL,
        state: InputStateToken.DEFAULT,
        title: "Email",
        placeholder: "Enter email",
        keyboardType: KeyboardTypeToken.email,
        action: {
          type: ACTION.ENTER_EMAIL,
          payload: <EmailPayload>{ value: "", widgetId: "input" },
          routeId: ROUTE.ENTER_EMAIL,
        },
        caption: { success: "", error: "Enter a valid email address" },
        errorAction: {
          type: ACTION.DISABLE_CONTINUE,
          routeId: ROUTE.ENTER_EMAIL,
          payload: <EnableDisableCTA>{
            value: false,
            targetWidgetId: "continue",
          },
        },
        successAction: {
          type: ACTION.ENABLE_CONTINUE,
          routeId: ROUTE.ENTER_EMAIL,
          payload: <EnableDisableCTA>{
            value: true,
            targetWidgetId: "continue",
          },
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.SM },
      space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      space3: <SpaceProps>{ size: SizeTypeTokens.LG },
      space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    },
  };
};

export const emailMF: PageType<any> = {
  onLoad: async (_, { applicationId }) => {
    applicationId = (await SharedPropsService.getUser())
      .linkedBorrowerAccounts[0].accountId;
    return Promise.resolve(template(applicationId));
  },
  actions: {
    [ACTION.CONTINUE]: saveEmailId,
    [ACTION.ENTER_EMAIL]: textOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
