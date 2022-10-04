import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  IconTokens,
  keyboardTypeToken,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: "PAGE_NAME",
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
      // label: "back",
      type: ButtonTypeTokens.LargeElevated,
      icon: { name: IconTokens.Back },
    },
    continue: <ButtonProps>{
      label: "continue",
      type: ButtonTypeTokens.LargeElevated,
      width: ButtonWidthTypeToken.FULL,
    },
    title: <TypographyProps>{ label: "Verify your email id" },
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

export const onboardMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {},
};
