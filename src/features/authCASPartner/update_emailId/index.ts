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
  FontFamilyTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, UpdateEmailIdPayload } from "./types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { emailOnChange, updateEmailId } from "./actions";
import { toggleCTA } from "../../login/phone_number/actions";
import SharedPropsService from "../../../SharedPropsService";

export const template: (email: String) => TemplateSchema = (email) => ({
  layout: <Layout>{
    id: ROUTE.PARTNER_EMAIL_UPDATE,
    type: LAYOUTS.MODAL,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "space3", type: WIDGET.SPACE },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.FIXED_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Confirm",
      fontFamily: FontFamilyTokens.Poppins,
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.UPDATE_EMAIL_ID,
        payload: <UpdateEmailIdPayload>{
          value: "",
          targetWidgetId: "emailItem",
        },
        routeId: ROUTE.PARTNER_EMAIL_UPDATE,
      },
    },
    input: <TextInputProps & WidgetProps>{
      value: email,
      isLowerCase: true,
      clearEnabled: true,
      type: InputTypeToken.EMAIL,
      state: InputStateToken.DEFAULT,
      title: "Email Id",
      charLimit: 10,
      placeholder: "Enter email id",
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.EMAIL_NUMBER_ONCHANGE,
        payload: <UpdateEmailIdPayload>{ value: "", targetWidgetId: "input" },
        routeId: ROUTE.PARTNER_EMAIL_UPDATE,
      },
      caption: { error: "Enter a valid email id" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.PARTNER_EMAIL_UPDATE,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.PARTNER_EMAIL_UPDATE,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space3: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
});

export const updatePartnerEmailMF: PageType<any> = {
  onLoad: async ({},{prevEmail}) => {
    // const prevEmail = `${
    //   (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
    //     .accountHolderEmail
    // }`;
  //  const prevEmail = `an@gmail.com`;
    return Promise.resolve(template(prevEmail));
  },
  actions: {
    [ACTION.UPDATE_EMAIL_ID]: updateEmailId,
    [ACTION.EMAIL_NUMBER_ONCHANGE]: emailOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
