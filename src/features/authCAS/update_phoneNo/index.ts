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
import { ROUTE } from "../../../routes";
import { ACTION, UpdateMobileNumber } from "./types";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { updateMobileNumber, phoneOnChange } from "./actions";
import { toggleCTA } from "../../login/phone_number/actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.UPDATE_PHONE_NUMBER,
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
        type: ACTION.EDIT_MOBILE_NUMBER,
        payload: <UpdateMobileNumber>{
          value: "",
          targetWidgetId: "mobileItem",
        },
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
      },
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.phone,
      action: {
        type: ACTION.PHONE_NUMBER_ONCHANGE,
        payload: <UpdateMobileNumber>{ value: "", targetWidgetId: "input" },
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
      },
      caption: { error: "Enter a valid 10 digit mobile number" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.UPDATE_PHONE_NUMBER,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
};

export const updateMobileNumberMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.EDIT_MOBILE_NUMBER]: updateMobileNumber,
    [ACTION.PHONE_NUMBER_ONCHANGE]: phoneOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
