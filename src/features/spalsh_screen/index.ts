import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  IconProps,
  IconSizeTokens,
  IconTokens,
  StackAlignItems,
  StackFlexWrap,
  StackJustifyContent,
  StackProps,
  StackType,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { SplashAction } from "./actions";

const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.SPLASH_SCREEN,
    type: LAYOUTS.LIST,
    widgets: [{ id: "splashStack", type: WIDGET.STACK }],
  },
  datastore: <Datastore>{
    splashStack: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "icon", type: WIDGET.ICON }],
    },
    icon: <IconProps & WidgetProps>{
      name: IconTokens.Volt,
      size: IconSizeTokens.XXXXXXXL,
      action: {
        type: ACTION.AUTH_NAV,
        payload: {},
      },
    },
  },
};

export const splashScreenMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.AUTH_NAV]: SplashAction,
  },
  action: {
    type: ACTION.AUTH_NAV,
    payload: {},
  },
  bgColor: "#1434CB",
};
