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
    AspectRatioToken,
    BorderRadiusTokens,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ImageProps,
    ImageSizeTokens,
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
import { modifyAmount } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.MODIFY_PLEDGED_AMOUNT,
        type: LAYOUTS.MODAL,
        widgets: [
            {
                id: "headerStack",
                type: WIDGET.STACK,
            },
            { id: "titleSpace", type: WIDGET.SPACE },
            { id: "subTitle", type: WIDGET.TEXT },
            { id: "subTitleSpace", type: WIDGET.SPACE },
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
                { id: "imageItem", type: WIDGET.IMAGE },
                { id: "trailIcon", type: WIDGET.ICON },
            ],
        },
        
        imageItem: <ImageProps>{ 
            uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
            size: ImageSizeTokens.XS,
            aspectRatio: AspectRatioToken.A1_1,
            borderRadius: BorderRadiusTokens.BR1,
            padding: SizeTypeTokens.SM,
        
        },
        trailIcon: <IconProps>{ 
            name: IconTokens.Cancel,
            size: IconSizeTokens.MD,
            color: ColorTokens.Grey_Night
        
        },
        titleSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
        subTitle: <TypographyProps>{
            label: "Axis Long Term Equity Mutual Funds",
            fontSize: FontSizeTokens.LG,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        input: <TextInputProps & WidgetProps>{
            type: InputTypeToken.DEFAULT,
            state: InputStateToken.DEFAULT,
            placeholder: "",
            title: "Enter amount",
            charLimit:30000,
            caption: { success: "", error: "" },
            keyboardType: KeyboardTypeToken.numberPad,
            action: {
                type: ACTION.MODIFY_PLEDGED_AMOUNT,
                //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
                routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
            },
        },
        inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        continue:<ButtonProps & WidgetProps>{
            label: "Update amount",
            type: ButtonTypeTokens.MediumFilled,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.MODIFY_PLEDGED_AMOUNT,
                payload: <amountPayload>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MODIFY_PLEDGED_AMOUNT,
            },
        },

    },
};

export const modifyPledgeMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.MODIFY_PLEDGED_AMOUNT]: modifyAmount,
    },
};
