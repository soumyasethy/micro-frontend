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
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputStateToken,
    InputTypeToken,
    KeyboardTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TextInputProps,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    amountPayload   ,
} from "./types";
import { updateAmount } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.PLEDGE_VERIFY,
        type: LAYOUTS.MODAL,
        widgets: [
            {
                id: "headerStack",
                type: WIDGET.STACK,
            },
            { id: "titleSpace", type: WIDGET.SPACE },
            { id: "input", type: WIDGET.INPUT },
            { id: "inputSpace", type: WIDGET.SPACE },
            { id: "continue", type: WIDGET.BUTTON },


        ],
    },
    datastore: <Datastore>{
        headerStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "title", type: WIDGET.TEXT },
                { id: "leadIcon", type: WIDGET.ICON },
            ],
        },
        title: <TypographyProps>{
            label: "Edit pledged amount",
            fontSize: FontSizeTokens.XL,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        leadIcon: <IconProps>{ 
            name: IconTokens.Cancel,
            size: IconSizeTokens.MD,
            color: ColorTokens.Grey_Night
        
        },
        titleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        input: <TextInputProps & WidgetProps>{
            type: InputTypeToken.DEFAULT,
            state: InputStateToken.DEFAULT,
            placeholder: "",
            title: "Enter amount",
            charLimit:30000,
            caption: { success: "", error: "" },
            keyboardType: KeyboardTypeToken.numberPad,
            action: {
                type: ACTION.PLEDGED_AMOUNT,
                //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
                routeId: ROUTE.PLEDGED_AMOUNT,
            },
        },
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        continue:<ButtonProps & WidgetProps>{
            label: "Update amount",
            type: ButtonTypeTokens.MediumFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.PLEDGED_AMOUNT,
                payload: <amountPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.PLEDGED_AMOUNT,
            },
        },

    },
};

export const pledgeAmountMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.PLEDGED_AMOUNT]: updateAmount,
    },
};
