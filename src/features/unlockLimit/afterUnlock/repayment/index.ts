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
    AmountCardProps,
    AmountCardTypeTokens,
    AspectRatioToken,
    BorderRadiusTokens,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    IconTokens,
    ImageProps,
    ImageSizeTokens,
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../../routes";
import {
    ACTION,
} from "./types";
import { goBack, repayment } from "./actions";

export const template: TemplateSchema = {
    layout: <Layout>{
        id: ROUTE.REPAYMENT,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP,
            },
            { id: "amountItem", type: WIDGET.AMOUNTCARD },
            { id: "amountSpace", type: WIDGET.SPACE },
            { id: "headStack", type: WIDGET.TEXT },
            { id: "headSpace", type: WIDGET.SPACE },
            { id: "messageStack", type: WIDGET.TEXT },
            { id: "messageSpace", type: WIDGET.SPACE },
            { id: "bankStack", type: WIDGET.STACK },
            { id: "divider", type: WIDGET.DIVIDER },
            { id: "listItem1", type: WIDGET.LIST_ITEM },
            { id: "listItem2", type: WIDGET.LIST_ITEM },
            { id: "listSpace", type: WIDGET.SPACE },
            {
                id: "continue",
                type: WIDGET.BUTTON,
                position: POSITION.ABSOLUTE_BOTTOM
            },

        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: 'Flexi repay',
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
                routeId: ROUTE.REPAYMENT,
            },
        },

        amountItem: <AmountCardProps>{
            title: 'Outstanding amount',
            subTitle: '27,000',
            subscriptTitle: '',
            message: 'Enjoy flexible repayments. Pay partially or the complete amount in just one go.',
            warning: '',
            chipText: '',
            type: AmountCardTypeTokens.default
        },
        amountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        headStack: <TypographyProps>{
            label: "Bank account details",
            fontSize: FontSizeTokens.XXL,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Poppins,
            fontWeight: "700",
        },
        headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
        messageStack: <TypographyProps>{
            label: "Add this account as beneficiary to repay principal via NEFT/IMPS. Transfer should happen from the the same account.",
            fontSize: FontSizeTokens.XS,
            color: ColorTokens.Grey_Charcoal,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
        },
        messageSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        bankStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: "leadItem", type: WIDGET.IMAGE },
                { id: "space", type: WIDGET.SPACE },
                { id: "data", type: WIDGET.TEXT }
            ],
        },
        leadItem: <ImageProps>{
            uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
            size: ImageSizeTokens.SM,
            aspectRatio: AspectRatioToken.A1_1,
            borderRadius: BorderRadiusTokens.BR5,
            padding: SizeTypeTokens.SM,
        },
        space: <SpaceProps>{ size: SizeTypeTokens.SM },
        data: <TypographyProps>{
            label: "HDFC Bank",
            fontSize: FontSizeTokens.MD,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "700",
        },
        divider: <DividerProps>{
            size: DividerSizeTokens.SM,
            margin: {
                vertical: SizeTypeTokens.MD,
                horizontal: SizeTypeTokens.MD,
            },
            color:ColorTokens.Grey_Milk_1
        },
        listItem1: <ListItemProps>{
            title: 'IFSC',
            subTitle: 'HDFC0000675',
           // trailIconName: IconTokens.Copy,
            trailLabel: 'Copy',
            onPress: () => { },
        },
        listItem2: <ListItemProps>{
            title: 'Account number',
            subTitle: '05001 42345 38421',
           // trailIconName: IconTokens.Copy,
            trailLabel: 'Copy',
            onPress: () => { },
        },
        listSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
        continue: <ButtonProps & WidgetProps>{
            label: "Back to my account",
            labelColor: ColorTokens.Primary_100,
            type: ButtonTypeTokens.LargeOutline,
            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.REPAYMENT,
                payload: <{}>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.REPAYMENT,
            },
        },
       
    },
};

export const repaymentMF: PageType<any> = {
    onLoad: async () => Promise.resolve(template),
    actions: {
        [ACTION.REPAYMENT]: repayment,
        [ACTION.GO_BACK]: goBack,
    },
};
