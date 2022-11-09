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
    IconAlignmentTokens,
    IconTokens,
    InputStateToken,
    InputTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TextInputProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    AssetsPayload,
} from "./types";
import { selectAssets, goBack } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PLEDGE_CONFIRMATION,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
            { id: "space0", type: WIDGET.SPACE },
            { id: "inputItem", type: WIDGET.INPUT },
            { id: "inputSpace", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,

            },
            {
                id: "otpItem",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: 'Modify Limit',
            leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
            isBackButton: true,
            type: 'DEFAULT',
            action: {
                type: ACTION.BACK_BUTTON,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MODIFY_LIMIT,
            },
        },
        space0: <SpaceProps>{ size: SizeTypeTokens.XXL },
        inputItem: <TextInputProps & WidgetProps>{
            placeholder: "Search Portfolio",
            type: InputTypeToken.DEFAULT,
            title: "Enter amount",
            state: InputStateToken.DEFAULT,
            charLimit: 30000,
            caption: { success: "", error: "" },
            action: {
                type: ACTION.MODIFY_LIMIT,
                routeId: ROUTE.MODIFY_LIMIT,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                },
            },
        },
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        continue: <ButtonProps & WidgetProps>{
            label: "Select assets for pleding",
            type: ButtonTypeTokens.MediumGhost,
            width: ButtonWidthTypeToken.CONTENT,
            stack: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                justifyContent: StackJustifyContent.flexStart
            },
            icon: {
                name: IconTokens.ChervonDownRight,
                align: IconAlignmentTokens.right,
            },
            action: {
                type: ACTION.MODIFY_LIMIT,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    isResend: false,
                },
                routeId: ROUTE.MODIFY_LIMIT,
            },
        },
        otpItem: <ButtonProps & WidgetProps>{
            label: "Confirm & get OTP",
            type: ButtonTypeTokens.MediumFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.MODIFY_LIMIT,
                payload: <AssetsPayload>{
                    value: "",
                    widgetId: "input",
                    isResend: false,
                },
                routeId: ROUTE.MODIFY_LIMIT,
            },
        },
    },
};

export const modifyLimitMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.MODIFY_LIMIT]: selectAssets,
        [ACTION.BACK_BUTTON]: goBack,
    },
};
