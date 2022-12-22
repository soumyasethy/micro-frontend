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
  ButtonBaseProps,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  FontFamilyTokens,
  FontSizeTokens,
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
import SharedPropsService from "../../../SharedPropsService";
import { RegexConfig } from "../../../configs/config";

export const template: (mobileNo: string) => TemplateSchema = (mobileNo) => ({
  layout: <Layout>{
    id: ROUTE.PARTNER_MOBILE_UPDATE,
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
        type: ACTION.EDIT_MOBILE_NUMBER,
        payload: <UpdateMobileNumber>{
          value: "",
          targetWidgetId: "mobileItem",
        },
        routeId: ROUTE.PARTNER_MOBILE_UPDATE,
      },
    },
    input: <TextInputProps & WidgetProps>{
      value: mobileNo,
      regex: RegexConfig.MOBILE,
      clearEnabled: true,
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Mobile Number",
      charLimit: 10,
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.numberPad,
      action: {
        type: ACTION.PHONE_NUMBER_ONCHANGE,
        payload: <UpdateMobileNumber>{ value: "", targetWidgetId: "input" },
        routeId: ROUTE.PARTNER_MOBILE_UPDATE,
      },
      caption: { error: "Enter a 10 digit mobile number" },
      errorAction: {
        type: ACTION.DISABLE_CONTINUE,
        routeId: ROUTE.PARTNER_MOBILE_UPDATE,
        payload: <EnableDisableCTA>{ value: false, targetWidgetId: "continue" },
      },
      successAction: {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.PARTNER_MOBILE_UPDATE,
        payload: <EnableDisableCTA>{ value: true, targetWidgetId: "continue" },
      },
    },
    space3: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
});

export const updatePartnerMobileNumberMF: PageType<any> = {
  onLoad: async ({},{mobileNo}) => {
  
    return Promise.resolve(template(mobileNo));
  },
  actions: {
    [ACTION.EDIT_MOBILE_NUMBER]: updateMobileNumber,
    [ACTION.PHONE_NUMBER_ONCHANGE]: phoneOnChange,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
  },
};
