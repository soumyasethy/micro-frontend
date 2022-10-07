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
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  keyboardTypeToken,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../index";
import { ACTION, ContinuePayload, PhoneNumberPayload } from "./types";
import { getStarted, textOnChange } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PHONE_NUMBER,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
      { id: "continue", type: WIDGET.BUTTON, position: POSITION.FIXED_BOTTOM },
      { id: "title", type: WIDGET.TEXT },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "input", type: WIDGET.INPUT },
    ],
  },
  datastore: <Datastore>{
    back: <ButtonProps>{
      type: ButtonTypeTokens.IconGhost,
      icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
    },
    continue: <ButtonProps & WidgetProps>{
      label: "continue",
      type: ButtonTypeTokens.LargeElevated,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.CONTINUE,
        payload: <ContinuePayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    title: <TypographyProps>{
      label: "Verify your mobile number",
      fontSize: FontSizeTokens.XXL,
    },
    subTitle: <TypographyProps>{
      label: "We’ll send a verification code to this number.",
    },
    input: <TextInputProps & WidgetProps>{
      caption: "+91 |Enter mobile number",
      title: "Mobile Number",
      keyboardType: keyboardTypeToken.email,
      action: {
        type: ACTION.PHONE_NUMBER,
        payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
  },
};

export const phoneNumberMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CONTINUE]: getStarted,
    [ACTION.PHONE_NUMBER]: textOnChange,
  },
};
