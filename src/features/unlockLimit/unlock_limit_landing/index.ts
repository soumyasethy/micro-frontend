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
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    ImageProps,
    ResizeModeToken,
    ShadowTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
    ACTION,
    LimitPayload,
} from "./types";
import { continueLimit, modifyLimit } from "./actions";
import { fetchPledgeLimitRepo } from "./repo";
import { roundDownToNearestHundred } from "../../../configs/utils";
import { image } from "./assets";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders, getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";

export const template: (
    availableCreditAmount: number
) => TemplateSchema = (
    availableCreditAmount
) => ({
    layout: <Layout>{
        id: ROUTE.UNLOCK_LIMIT_LANDING,
        type: LAYOUTS.LIST,
        widgets: [
            { id: "space0", type: WIDGET.SPACE },
            { id: "space1", type: WIDGET.SPACE },
            { id: "welcomeStack", type: WIDGET.STACK },
            { id: "space2", type: WIDGET.SPACE },
            { id: "amount", type: WIDGET.AMOUNTCARD },
            {
                id: "cardItem",
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM
            }
        ],
    },
    datastore: <Datastore>{

        space0: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
        space1: <SpaceProps>{ size: SizeTypeTokens.XXXXXL },
        welcomeStack: <StackProps>{
            type: StackType.column,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "greetingText", type: WIDGET.TEXT },
                { id: "infoText", type: WIDGET.TEXT },
            ]
        },
        greetingText: <TypographyProps>{
            label: "Congratulations!",
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        infoText: <TypographyProps>{
            label: "We have evaluated your portfolio",
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
        },
        space2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        amount: <AmountCardProps>{
            title: "Approved cash limit",
            shadow: ShadowTypeTokens.E5,
            subTitle: `${roundDownToNearestHundred(availableCreditAmount)}`.replace(
                /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                ","
            ),
            chipText: "How?",
            type: "default",
        },
        cardItem: <CardProps>{
            bgColor: ColorTokens.White,
            padding: {
            },
            body: {
                widgetItems: [
                    { id: "unlockItem", type: WIDGET.BUTTON },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "portfolioItem", type: WIDGET.BUTTON },
                    { id: "space4", type: WIDGET.SPACE },
                    { id: "imageStack", type: WIDGET.STACK },
                ],
            },
        },
        unlockItem: <ButtonProps & WidgetProps>{
            label: "Unlock limit now",
            fontFamily: FontFamilyTokens.Inter,
            fontSize: SizeTypeTokens.LG,
            type: ButtonTypeTokens.LargeFilled,

            width: ButtonWidthTypeToken.FULL,
            action: {
                type: ACTION.UNLOCK_LIMIT,
                payload: <LimitPayload>{
                    value: {},
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.UNLOCK_LIMIT_LANDING,
            },
        },
        space3: <SpaceProps>{ size: SizeTypeTokens.XL },
        portfolioItem: <ButtonProps & WidgetProps>{
            label: "Add more portfolio",
            fontFamily: FontFamilyTokens.Inter,
            type: ButtonTypeTokens.LargeOutline,
            width: ButtonWidthTypeToken.FULL,
            labelColor: ColorTokens.Primary_100,
            action: {
                type: ACTION.MODIFY_LIMIT,
                payload: <{}>{
                    value: {},
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
        },
        space4: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        imageStack: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.center,
            widgetItems: [
                { id: "image1", type: WIDGET.IMAGE },
                { id: "space5", type: WIDGET.SPACE },
                { id: "image2", type: WIDGET.IMAGE },
                { id: "space6", type: WIDGET.SPACE },
                { id: "image3", type: WIDGET.IMAGE },
                { id: "space7", type: WIDGET.SPACE },
                { id: "image4", type: WIDGET.IMAGE },
            ],
        },
        image1: <ImageProps>{
            uri: image.powered,
            height: 16,
            width: 56,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space5: <SpaceProps>{ size: SizeTypeTokens.LG },
        image2: <ImageProps>{
            uri: image.cibil,
            height: 23,
            width: 54,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space6: <SpaceProps>{ size: SizeTypeTokens.LG },
        image3: <ImageProps>{
            uri: image.circle,
            height: 21,
            width: 21,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },
        space7: <SpaceProps>{ size: SizeTypeTokens.LG },
        image4: <ImageProps>{
            uri: image.nsdl,
            height: 23,
            width: 48,
            resizeMode: ResizeModeToken.CONTAIN,
            padding: SizeTypeTokens.NONE,
        },

    },
});

export const unlockLimitLandingMF: PageType<any> = {
    onLoad: async ({ network }, { response }) => {
        const responseX = response ? response.data : await fetchPledgeLimitRepo();
        const availableCreditAmount: number =
            responseX.stepResponseObject.availableCreditAmount || 0;
        return Promise.resolve(
            template(availableCreditAmount)
        );
    },

    actions: {
        [ACTION.UNLOCK_LIMIT]: continueLimit
    },
};
