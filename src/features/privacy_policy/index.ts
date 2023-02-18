import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {HeaderProps, HeaderTypeTokens, SpaceProps, WebViewProps, WIDGET,} from "@voltmoney/schema";
import {ROUTE} from "../../routes";
import {ACTION} from "./types";
import {BUILD_TYPE, getBuildType} from "../../SharedPropsService";
import {goBack} from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.PRIVACY_POLICY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
      { id: "webview", type: WIDGET.WEB_VIEW },
      { id: "space1", type: WIDGET.SPACE}
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
