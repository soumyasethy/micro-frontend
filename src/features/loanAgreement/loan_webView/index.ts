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
    WebViewProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION
} from "./types";
import { getPolingData, GoNext } from "./actions";
import { polingDataRepo } from "./repo";
//import { goBack, verifyOTP } from "./action";


export const template: (urlData: string) => TemplateSchema = (
    urlData
  ) => ({
    layout: <Layout>{
        id: ROUTE.LOAN_REPAYMENT,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "headerStack",type: WIDGET.HEADER,position:POSITION.FIXED_TOP},
           { id: "headItem",type: WIDGET.WEB_VIEW},
           
        ],
    },
    datastore: <Datastore>{
        headerStack: <HeaderProps & WidgetProps>{
            leadIcon: "https://reactnative.dev/img/tiny_logo.png",
            title: "Repayment",
            isBackButton: true,
            type: HeaderTypeTokens.DEFAULT,
            action: {
              type: ACTION.GO_BACK,
              routeId: ROUTE.LOAN_REPAYMENT,
              payload: {},
            },
        },
        headItem: <WebViewProps>{
            uri:`${urlData}`
        },
    },
});

export const loanWebViewMF: PageType<any> = {

    onLoad: async ({}, { response,urlData}) => {
         const responseX = response ? response :  getPolingData();
        return Promise.resolve(template(urlData));
    },

    actions: {
         [ACTION.LOAN_WEBVIEW]: GoNext,
        // [ACTION.GO_BACK]: goBack,
    },
};
