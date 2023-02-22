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
import {BUILD_TYPE, getBuildType} from "../../SharedPropsService";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PRIVACY_POLICY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "webview", type: WIDGET.WEB_VIEW }
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
    webview: <WebViewProps>{
      uri: `${getBuildType() === BUILD_TYPE.BORROWER_PRODUCTION ? 'https://voltmoney.in/privacy/' : 'https://staging.voltmoney.in/privacy/'}`,
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
