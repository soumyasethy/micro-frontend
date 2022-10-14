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
  FontSizeTokens,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  RadioProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, ContinuePayload, EmailPayload } from "./types";
import { saveEmailId, textOnChange } from "./actions";

export const template: TemplateSchema = {
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
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.CONTINUE,
        payload: <ContinuePayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.ENTER_EMAIL,
      },
    },
    title: <TypographyProps>{
      label: "Verify your email id",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
    },
    subTitle: <TypographyProps>{
      label: "Your Volt app will only work with this email id",
      color: ColorTokens.Grey_Charcoal,
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.MOBILE,
      state: InputStateToken.DEFAULT,
      title: "Email id",
      placeholder: "Enter mobile number",
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ENTER_EMAIL,
        payload: <EmailPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.ENTER_EMAIL,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.LG },
    space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
  },
};

export const emailMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.CONTINUE]: saveEmailId,
    [ACTION.ENTER_EMAIL]: textOnChange,
  },
};
