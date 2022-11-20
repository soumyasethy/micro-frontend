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
  StackHeight,
  StackProps,
  StackType,
  WebViewProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import {
  AgreementStatusAction,
  GoNextSuccess,
  GoBack,
  GoNextFailed,
} from "./actions";
import { polingDataRepo } from "./repo";
//import { goBack, verifyOTP } from "./action";

export const template: (urlData: string) => TemplateSchema = (urlData) => ({
  layout: <Layout>{
    id: ROUTE.AGREEMENT_WEBVIEW,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      { id: "webStack", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    headerStack: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      title: "Loan agreement",
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.AGREEMENT_WEBVIEW,
        payload: {},
      },
    },
    webStack: <StackProps>{
      type: StackType.column,
      flex: 1,
      height: StackHeight.FULL,
      widgetItems: [{ id: "headItem", type: WIDGET.WEB_VIEW }],
    },
    headItem: <WebViewProps>{
      uri: `${urlData}`,
    },
  },
});

export const agreementWebViewMF: PageType<any> = {
  onLoad: async ({ ...props }, { response, urlData }) => {
    await AgreementStatusAction(
      {
        type: ACTION.GO_NEXT_SUCCESS,
        routeId: ROUTE.AGREEMENT_WEBVIEW,
        payload: {},
      },
      {},
      props
    );
    return Promise.resolve(template(urlData));
  },

  actions: {
    [ACTION.POLL_AGREEMENT_STATUS]: AgreementStatusAction,
    [ACTION.GO_NEXT_SUCCESS]: GoNextSuccess,
    [ACTION.GO_NEXT_FAILED]: GoNextFailed,
    [ACTION.GO_BACK]: GoBack,
  },
};
