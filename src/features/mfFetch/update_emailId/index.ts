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
    id: ROUTE.UPDATE_EMAIL_ID,
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
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
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
        routeId: ROUTE.UPDATE_EMAIL_ID,
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
        routeId: ROUTE.UPDATE_EMAIL_ID,
      },
      caption: { error: "Enter a valid email id" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.UPDATE_EMAIL_ID,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.UPDATE_EMAIL_ID,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
});

export const updateEmailMF: PageType<any> = {
  onLoad: async () => {
    const userType = await SharedPropsService.getUserType();
    let prevEmail = "";
    if(userType === "BORROWER"){
       prevEmail = `${
        (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
          .accountHolderEmail
      }`;
    }else{
      prevEmail = `${
        (await (await SharedPropsService.getPartnerUser()).emailId)
      }`;
    }
    
    return Promise.resolve(template(prevEmail));
  },
  actions: {
    [ACTION.UPDATE_EMAIL_ID]: updateEmailId,
    [ACTION.EMAIL_NUMBER_ONCHANGE]: emailOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
