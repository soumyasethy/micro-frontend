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
import { Action } from "./types";
import { getStarted } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.ON_BOARDING,
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
        type: Action.CONTINUE,
        payload: {},
        routeId: ROUTE.ON_BOARDING,
      },
    },
    title: <TypographyProps>{
      label: "Verify your email id",
      fontSize: FontSizeTokens.XXL,
    },
    subTitle: <TypographyProps>{
      label: "Your Volt app will only work with this email id",
    },
    input: <TextInputProps>{
      caption: "Enter your other email",
      title: "Email id",
      keyboardType: keyboardTypeToken.email,
    },
  },
};

export const onBoardingMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: { [Action.CONTINUE]: getStarted },
};
