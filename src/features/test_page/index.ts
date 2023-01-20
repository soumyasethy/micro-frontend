import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.TEST_PAGE,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "button", type: WIDGET.BUTTON },
      { id: "stack", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    stack: <StackProps>{
      widgetItems: [
        { id: "button", type: WIDGET.BUTTON },
        { id: "space1", type: WIDGET.SPACE },
        { id: "divider", type: WIDGET.DIVIDER },
        { id: "space1", type: WIDGET.SPACE },
        { id: "button", type: WIDGET.BUTTON },
      ],
    },
    divider: <DividerProps>{
      size: DividerSizeTokens.LG,
      type: "solid",
      color: ColorTokens.Primary_100,
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    button: <ButtonProps & WidgetProps>{
      label: "hello world",
      loading: false,
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TEST_ACTION,
        routeId: ROUTE.TEST_PAGE,
        payload: { hello: "world" },
      },
    },
  },
};

export const testPageMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
