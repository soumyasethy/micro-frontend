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
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    ListProps,
    ListTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    TextInputProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    OtpPayload,
} from "./types";
import { otpSend,goBack } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PORTFOLIO,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "header", type: WIDGET.HEADER,position: POSITION.FIXED_TOP},
            { id: "space0", type: WIDGET.SPACE },
            { id: "inputItem", type: WIDGET.INPUT },
            { id: "inputSpace", type: WIDGET.SPACE },
            { id: "listItem", type: WIDGET.LIST },
            { id: "listSpace", type: WIDGET.SPACE },
            {
                id: "totalItem",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: 'Select Portfolio',
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
        space0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        inputItem: <TextInputProps & WidgetProps>{
            type: InputTypeToken.SEARCH,
            state: InputStateToken.DEFAULT,
            placeholder: "",
            title: "Enter amount",
            caption: { success: "", error: "" },
            keyboardType: KeyboardTypeToken.default,
            action: {
                type: ACTION.PORTFOLIO,
                //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
                routeId: ROUTE.PORTFOLIO,
            },
        },
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        listItem: <ListProps>{
            data: [
                {
                    label: 'Axis Long Term Equity Mutual Funds',
                    info: '',
                    trailTitle: '₹4,000',
                    trailSubTitle: '/ ₹4,000',
                    action: 'edit',
                  },
                  {
                    label: 'Axis Long Term Equity Mutual Funds',
                    info: '',
                    trailTitle: '₹4,000',
                    trailSubTitle: '/ ₹4,000',
                    action: 'edit',
                  },
                  {
                    label: 'Axis Long Term Equity Mutual Funds',
                    info: '',
                    trailTitle: '₹4,000',
                    trailSubTitle: '/ ₹4,000',
                    action: 'edit',
                  },
                  {
                    label: 'Axis Long Term Equity Mutual Funds',
                    info: '',
                    trailTitle: '₹4,000',
                    trailSubTitle: '/ ₹4,000',
                    action: 'edit',
                  }],
                type: ListTypeTokens.CHECKLIST
        },
        listSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
        totalItem: <ButtonProps & WidgetProps>{
            label: "Confirm & Get OTP",
            type: ButtonTypeTokens.MediumFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.PORTFOLIO,
                payload: <OtpPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.PORTFOLIO,
            },
        },
    },
};

export const portfolioMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.PORTFOLIO]: otpSend,
        [ACTION.BACK_BUTTON]:goBack,
    },
};
