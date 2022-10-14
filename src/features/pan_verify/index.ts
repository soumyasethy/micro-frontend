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
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
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
import { ACTION, ContinuePayload, PanPayload } from "./types";
import { textOnChange, verifyPan } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PAN_VERIFY,
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
      {
        id: "disclaimerStack",
        type: WIDGET.STACK,
        position: POSITION.FAB,
      },
    ],
  },
  datastore: <Datastore>{
    space0: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    continue: <ButtonProps & WidgetProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.VERIFY_PAN,
        payload: <ContinuePayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PAN_VERIFY,
      },
    },
    title: <TypographyProps>{
      label: "Verify PAN",
      fontSize: FontSizeTokens.XL,
      color: ColorTokens.Grey_Night,
    },
    subTitle: <TypographyProps>{
      label: "PAN is used to check your approved limit",
      color: ColorTokens.Grey_Charcoal,
    },
    input: <TextInputProps & WidgetProps>{
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DEFAULT,
      charLimit: 10,
      title: "PAN Number",
      placeholder: "Enter PAN number",
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ENTER_PAN,
        payload: <PanPayload>{ value: "", widgetId: "input" },
        routeId: ROUTE.PAN_VERIFY,
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space3: <SpaceProps>{ size: SizeTypeTokens.LG },
    space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    disclaimerStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        {
          id: "disclaimerIcon",
          type: WIDGET.ICON,
        },

        { id: "disclaimerSpace", type: WIDGET.SPACE },
        {
          id: "disclaimerText",
          type: WIDGET.TEXT,
        },
      ],
    },
    disclaimerText: <TypographyProps>{
      fontSize: FontSizeTokens.XXS,
      label: "Don’t worry your data is secured with Volt",
      color: ColorTokens.System_Happy,
    },
    disclaimerSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    disclaimerIcon: <IconProps>{
      name: IconTokens.Secure,
      size: IconSizeTokens.XXS,
      color: ColorTokens.System_Happy,
    },
  },
};

export const panVerifyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.VERIFY_PAN]: verifyPan,
    [ACTION.ENTER_PAN]: textOnChange,
  },
};
