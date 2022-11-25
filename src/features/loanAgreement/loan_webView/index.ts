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
  StackWidth,
  WebViewProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, GoNextType } from "./types";
import { goBack, GoNext, NavLoanAutoPay, PollMandateStatus } from "./actions";

export const template: (urlData: string) => TemplateSchema = (urlData) => ({
  layout: <Layout>{
    id: ROUTE.LOAN_REPAYMENT,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "headerStack", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
      {
        id: "webStack",
        type: WIDGET.STACK,
        padding: {
          horizontal: 4,
        },
      },
    ],
  },
  datastore: <Datastore>{
    headerStack: <HeaderProps & WidgetProps>{
      leadIcon: "https://reactnative.dev/img/tiny_logo.png",
      title: "Setup AutoPay",
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.LOAN_REPAYMENT,
        payload: {},
      },
    },
    webStack: <StackProps>{
      height: StackHeight.FULL,
      width: StackWidth.FULL,
      widgetItems: [{ id: "headItem", type: WIDGET.WEB_VIEW }],
    },
    headItem: <WebViewProps>{
      uri: `${urlData}`,
      // uri: "https://reactnative.dev/",
    },
  },
});

export const loanWebViewMF: PageType<any> = {
  onLoad: async ({ ...props }, { urlData }) => {
    PollMandateStatus(
      {
        type: ACTION.LOAN_WEBVIEW,
        routeId: ROUTE.LOAN_WEBVIEW,
        payload: <GoNextType>{ currentStepId: null },
      },
      {},
      props
    );
    return Promise.resolve(template(urlData));
  },

  actions: {
    [ACTION.LOAN_WEBVIEW]: GoNext,
    [ACTION.GO_LOAN_AUTO_PAY]: NavLoanAutoPay,
    [ACTION.GO_BACK] : goBack
  },
};
