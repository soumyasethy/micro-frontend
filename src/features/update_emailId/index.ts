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
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, UpdateEmailIdPayload } from "./types";
import { EnableDisableCTA } from "../phone_number/types";
import { emailOnChange, updateEmailId } from "./actions";
import { toggleCTA } from "../phone_number/actions";

export const template: TemplateSchema = {
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
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
};

export const updateEmailMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.UPDATE_EMAIL_ID]: updateEmailId,
    [ACTION.EMAIL_NUMBER_ONCHANGE]: emailOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
