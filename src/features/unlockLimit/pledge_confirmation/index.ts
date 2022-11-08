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
    HeaderProps,
    LineItemCardProps,
    SizeTypeTokens,
    SpaceProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    OtpPayload,
} from "./types";
import { sendOtp,goBack } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PLEDGE_CONFIRMATION,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "header", type: WIDGET.HEADER,position: POSITION.FIXED_TOP},
            { id: "space0", type: WIDGET.SPACE },
            { id: "lineItem", type: WIDGET.LINEITEMCARD },
            { id: "buttonSpace", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: 'Pledge Confirmation',
            leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
            isBackButton: true,
            type: 'DEFAULT',
            action:{
                type: ACTION.BACK_BUTTON,
                payload: <OtpPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.PORTFOLIO,
            }
        },
        space0: <SpaceProps>{ size: SizeTypeTokens.XXL },
        lineItem: <LineItemCardProps>{
           // type: LineItemCardTypeTokens.DEFAULT,
            data: [
                {
                    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                    title: 'Total Cash Limit',
                    amount: 30000
                },
                {
                    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                    title: 'Processing Charge 1',
                    amount: 56
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Processing Charge 2	',
                    amount: 56
                },
                {
                    id: '58694a0f-3da1-471f-bd96-145571e29d72',
                    title: 'Total Charges',
                    amount: 76
                },
            ]
        },
        buttonSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        continue: <ButtonProps & WidgetProps>{
            label: "Confirm & Get OTP",
            type: ButtonTypeTokens.MediumFilled,
            width: ButtonWidthTypeToken.FULL,
            loading: true,
            action: {
                type: ACTION.PLEDGE_CONFIRMATION,
                payload: <OtpPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.PLEDGE_CONFIRMATION,
            },
        },
    },
};

export const pledgeConfirmationMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.PLEDGE_CONFIRMATION]: sendOtp,
        [ACTION.BACK_BUTTON]: goBack,
    },
};
