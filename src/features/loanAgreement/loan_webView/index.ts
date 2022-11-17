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
    StepperItem,
    WebViewProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION
} from "./types";
import { horizontalStepperRepo } from "../../../configs/utils";
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
            uri:'https://app.voltmoney.in/'
        },
    },
});

export const loanWebViewMF: PageType<any> = {

    onLoad: async ({}, { urlData}) => {
        return Promise.resolve(template(urlData));
    },

    actions: {
        // [ACTION.REPAYMENT]: verifyOTP,
        // [ACTION.GO_BACK]: goBack,
    },
};
