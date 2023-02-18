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
  HeaderProps,
  HeaderTypeTokens,
  PaddingProps,
  PaddingSizeTokens,
  StackHeight,
  StackProps,
  StackType,
  StackWidth,
  WebViewProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { goBack } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PRIVACY_POLICY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "webviewStack", type: WIDGET.STACK, padding: { left: 16, right: 0 } },
    ],
  },
  datastore: <Datastore>{
    headerStack: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      title: "Privacy Policy",
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.PRIVACY_POLICY,
        payload: {},
      },
    },
    webviewStack: <StackProps>{
      type: StackType.column,
      widgetItems: [{ id: "webview", type: WIDGET.WEB_VIEW }],
    },
    webview: <WebViewProps>{
      uri: "https://staging.voltmoney.in/privacy.html",
      isOpenInNewTab: false,
    },
  },
};

export const privacyPolicyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.GO_BACK]: goBack,
  },
};
