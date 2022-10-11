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
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, ContinuePayload, PhoneNumberPayload } from "./types";
import { getStarted, textOnChange } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PHONE_NUMBER,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "back", type: WIDGET.BUTTON, position: POSITION.FIXED_TOP },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.FIXED_BOTTOM,
      },
      { id: "title", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "subTitle", type: WIDGET.TEXT },
      { id: "space2", type: WIDGET.SPACE },
      { id: "input", type: WIDGET.INPUT },
      { id: "space3", type: WIDGET.SPACE },
    ],
  },
  datastore: <Datastore>{
    back: <ButtonProps>{
      type: ButtonTypeTokens.IconGhost,
      icon: { name: IconTokens.Back, size: IconSizeTokens.XL },
    },
    continue: <ButtonProps & WidgetProps>{
      label: "continue",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.CONTINUE,
        payload: <ContinuePayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PHONE_NUMBER,
      },
    },
    title: <TypographyProps>{
      label: "Verify your mobile number.",
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
    space1: <SpaceProps>{ size: SizeTypeTokens.XS },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.XXL },
  },
};

export const phoneNumberMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CONTINUE]: getStarted,
    [ACTION.PHONE_NUMBER]: textOnChange,
  },
};
