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
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputStateToken,
    InputTypeToken,
    MessageProps,
    SizeTypeTokens,
    SpaceProps,
    TextInputProps,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../../routes";
import {
    ACTION,
} from "./types";
import { getOtp, goBack, } from "./action";
import { AvailableCASItem } from "../../unlock_limit/types";

export const template: (
    availableCreditAmount: number
  ) => TemplateSchema = (availableCreditAmount) => {
    return {
    layout: <Layout>{
        id: ROUTE.WITHDRAW_AMOUNT,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
            { id: "headerSpace", type: WIDGET.SPACE },
            { id: "amountItem", type: WIDGET.INPUT },
            { id: "amountMsgSpace", type: WIDGET.SPACE },
            {id: "amountMessage", type: WIDGET.MESSAGE},
            { id: "amountSpace", type: WIDGET.SPACE },
            { id: "interestItem", type: WIDGET.INPUT },
            {id: "interestMessage", type:WIDGET.TEXT },
            { id: "inputSpace", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,

            },
            { id: "messageSpace", type: WIDGET.SPACE },
            { id: "messageItem", type: WIDGET.TEXT },
            
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: 'Withdraw Amount',
            leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
            isBackButton: true,
            type: 'DEFAULT',
            action: {
                type: ACTION.GO_BACK,
                payload: <{}>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.WITHDRAW_AMOUNT,
            },
        },
        headerSpace:<SpaceProps>{ size: SizeTypeTokens.XL },
        amountItem: <TextInputProps & WidgetProps>{
            placeholder: "",
            type: InputTypeToken.DEFAULT,
            title: "Enter amount",
            state: InputStateToken.DEFAULT,
            limitLabel: "out of "+`${availableCreditAmount}`,
            caption: { success: "", error: "" },
            action: {
                type: ACTION.WITHDRAW_AMOUNT,
                routeId: ROUTE.WITHDRAW_AMOUNT,
                payload: <{}>{
                    value: "",
                    widgetId: "input",
                },
            },
        },
        amountMsgSpace:<SpaceProps>{ size: SizeTypeTokens.SM },
        amountMessage:<MessageProps>{
            label: 'Recommended to use 90% of the limit',
            actionText: 'Confirm',
            icon:<IconProps>{
                name:IconTokens.Info,
                size: IconSizeTokens.SM,
                color:ColorTokens.Grey_Charcoal
            },
            labelColor: ColorTokens.Grey_Charcoal,
            bgColor: ColorTokens.Grey_Milk_1
        },
        amountSpace:<SpaceProps>{ size: SizeTypeTokens.XXXL },
        interestItem: <TextInputProps & WidgetProps>{
            placeholder: "",
            type: InputTypeToken.DEFAULT,
            title: "Monthly Interest",
            state: InputStateToken.DEFAULT,
            caption: { success: "", error: "" },
            action: {
                type: ACTION.WITHDRAW_AMOUNT,
                routeId: ROUTE.WITHDRAW_AMOUNT,
                payload: <{}>{
                    value: "",
                    widgetId: "input",
                },
            },
        },
        interestMessage:<TypographyProps>{
            label: "Calculated as per your amount.",
            fontSize: FontSizeTokens.XS,
            color: ColorTokens.Grey_Smoke,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        inputSpace:<SpaceProps>{ size: SizeTypeTokens.XXXL },
        continue: <ButtonProps & WidgetProps>{
            label: "Confirm & get OTP",
            type: ButtonTypeTokens.LargeFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.WITHDRAW_AMOUNT,
                payload: <{}>{
                    value: "",
                    widgetId: "input",
                    isResend: false,
                },
                routeId: ROUTE.WITHDRAW_AMOUNT,
            },
        },
        messageSpace:<SpaceProps>{ size: SizeTypeTokens.XL },
        messageItem:<TypographyProps>{
            label: "Amount will be transferred to your bank account XXXX 0802",
            fontSize: FontSizeTokens.XS,
            numberOfLines:3,
            color: ColorTokens.Grey_Charcoal,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        }
    },
};
};

export const withdraw_amountMF: PageType<any> = {
    onLoad: async ({}, { availableCreditAmount}) => {
        return Promise.resolve(template(availableCreditAmount));
    },
    // onLoad: async ({}, { stepResponseObject }) => {
    //     return Promise.resolve(template(stepResponseObject as StepResponseObject));
    //   },
    actions: {
        [ACTION.WITHDRAW_AMOUNT]: getOtp,
        [ACTION.GO_BACK]: goBack,
    },
};
