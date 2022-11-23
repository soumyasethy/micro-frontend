import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema
} from "@voltmoney/types";
import _ from "lodash";
import {
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { goBack } from "./actions";
export const template: (
) => TemplateSchema = (
    ) => {

        return {
            layout: <Layout>{
                id: ROUTE.ABOUTUS,
                type: LAYOUTS.LIST,
                widgets: [
                    {
                        id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP
                    },
                    {
                        id: "detailScreen", type: WIDGET.STACK, padding: {
                            left: 16, right: 16,
                        }
                    },
                


                ],
            },
            datastore: <Datastore>{
                header: <HeaderProps>{
                    title: 'About Us',
                    leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
                    isBackButton: true,
                    type: 'DEFAULT',
                    action: {
                        type: ACTION.BACK_BUTTON,
                        payload: <{}>{
                            value: "",
                            widgetId: "continue",
                            isResend: false,
                        },
                        routeId: ROUTE.ABOUTUS,
                    },
                },
               
                detailScreen: <StackProps>{
                    widgetItems: [
                        { id: "Card1", type: WIDGET.CARD },
                        { id: "Card2", type: WIDGET.CARD }
                    ]

                },
                Card1: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "startDetails", type: WIDGET.STACK },
                            { id: "startSpace", type: WIDGET.SPACE },
                            { id: "startDivider", type: WIDGET.DIVIDER },
                        ]
                    }
                },
                startDetails: <StackProps>{
                    type: StackType.row,
                    width: StackWidth.FULL,
                    flex: 1,
                    widgetItems: [
                        { id: "infoItems", type: WIDGET.STACK },
                        { id: "cta", type: WIDGET.STACK }
                    ]
                },
                infoItems: <StackProps>{
                    type: StackType.row,
                    width: StackWidth.FULL,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [

                        { id: "iconName", type: WIDGET.ICON },
                        { id: "infoSpace", type: WIDGET.SPACE },
                        { id: "title", type: WIDGET.TEXT }
                    ]
                },
               

                iconName: <IconProps>{
                    name: IconTokens.File,
                    color: ColorTokens.Grey_Night,
                    size: IconSizeTokens.LG
                },
                infoSpace: <SpaceProps>{
                    size: SizeTypeTokens.LG
                },

                title: <TypographyProps>{
                    label: "Terms of service",
                    color: ColorTokens.Grey_Night,
                    numberOfLines: 1,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "500",
                },
                cta: <StackProps>{
                    type: StackType.row,
                    flex: 1,
                    width: StackWidth.FULL,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "cta1", type: WIDGET.BUTTON },
                    ]
                },
                cta1: <ButtonProps>{
                    type: ButtonTypeTokens.SmallGhost,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.MD,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.PROFILE,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.MY_PROFILE,
                      },
                },
                startSpace: <SpaceProps>{
                    size: SizeTypeTokens.XL
                },
                startDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Chalk,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                Card2: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "privacyDetails", type: WIDGET.STACK },
                            { id: "privacySpaces", type: WIDGET.SPACE },
                            { id: "privacyDivider", type: WIDGET.DIVIDER },
                        ]
                    }
                },
                privacyDetails: <StackProps>{
                    type: StackType.row,
                    width: StackWidth.FULL,
                    widgetItems: [
                        { id: "privacyItems", type: WIDGET.STACK },
                        { id: "ctaprivacy", type: WIDGET.STACK }
                    ]
                },
                privacyItems: <StackProps>{
                    type: StackType.row,
                    flex: 1,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "privacyName", type: WIDGET.ICON },
                        { id: "privacySpace", type: WIDGET.SPACE },
                        { id: "titleprivacy", type: WIDGET.TEXT }
                    ]
                },
                privacyName: <IconProps>{
                    name: IconTokens.Locked,
                    color: ColorTokens.Grey_Night,
                    size: IconSizeTokens.LG
                },
                privacySpace: <SpaceProps>{
                    size: SizeTypeTokens.LG
                },
                titleprivacy: <TypographyProps>{
                    label: "privacy request",
                    color: ColorTokens.Grey_Night,
                    numberOfLines: 1,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "500",
                },
                ctaprivacy: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "cta1privacy", type: WIDGET.BUTTON },
                    ]
                },
                cta1privacy: <ButtonProps>{
                    type: ButtonTypeTokens.SmallGhost,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.ABOUT,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.MY_PROFILE,
                      },
                },
                privacySpaces: <SpaceProps>{
                    size: SizeTypeTokens.XL
                },
                privacyDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Chalk,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
             
            },
        };
    };

export const aboutUsMF: PageType<any> = {
    onLoad: async () => {
        return Promise.resolve(
            template()
        );
    },

    actions: {
        // [ACTION.ACCOUNT_DETAILS]: accountDetails,
        [ACTION.BACK_BUTTON]: goBack
    },
    bgColor: "#FFFFFF",
};
