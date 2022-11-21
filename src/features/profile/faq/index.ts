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
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackHeight,
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
                id: ROUTE.FAQ,
                type: LAYOUTS.LIST,
                widgets: [
                    {
                        id: "header", type: WIDGET.CARD, position: POSITION.FIXED_TOP
                    },
                    {
                        id: "detailScreen", type: WIDGET.STACK, padding: {
                            left: 10, right: 0
                        }
                    },
                    // {
                    //     id: "detailScreen", type: WIDGET.STACK, padding: {
                    //         horizontal: 24,
                    //         vertical: 0
                    //     }
                    // },
                


                ],
            },
            datastore: <Datastore>{
                header: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "profileBlock", type: WIDGET.STACK },
                            { id: "divider", type: WIDGET.DIVIDER },
                        ]
                    }
                },
                profileBlock: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.spaceBetween,
                    widgetItems: [
                        { id: "profileBlock1", type: WIDGET.STACK },
                        { id: "headerStack", type: WIDGET.STACK },
                    ]
                },
                profileBlock1: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "icon", type: WIDGET.BUTTON },
                        { id: "space0", type: WIDGET.SPACE },
                        { id: "nameElement", type: WIDGET.TEXT }
                    ]
                },
                icon: <ButtonProps>{
                    type: ButtonTypeTokens.MediumGhost,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChevronDown,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.BACK_BUTTON,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.FAQ,
                      },
                },
                space0: <SpaceProps>{ size: SizeTypeTokens.LG },
                nameElement: <TypographyProps>{
                    label: "FAQ’s",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.MD,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "600",
                },
                headerStack: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "contactBlock", type: WIDGET.BUTTON }
                    ]
                },
                contactBlock: <ButtonProps>{
                    label:"Contact us",
                    type: ButtonTypeTokens.MediumOutline,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.HeadPhone,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    }
                },
                divider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Chalk,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                detailScreen: <StackProps>{
                    widgetItems: [
                        { id: "Card1", type: WIDGET.CARD },
                        { id: "Card2", type: WIDGET.CARD },
                        { id: "Card3", type: WIDGET.CARD }
                    ]

                },
                Card1: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "startDetails", type: WIDGET.STACK },
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
                        { id: "title", type: WIDGET.TEXT }
                    ]
                },
               

                title: <TypographyProps>{
                    label: "Getting started",
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
                    type: ButtonTypeTokens.MediumGhost,
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
                            { id: "withdrawalDetails", type: WIDGET.STACK },
                            { id: "withdrawalDivider", type: WIDGET.DIVIDER },
                        ]
                    }
                },
                withdrawalDetails: <StackProps>{
                    type: StackType.row,
                    width: StackWidth.FULL,
                    widgetItems: [
                        { id: "withdrawalItems", type: WIDGET.STACK },
                        { id: "ctaWithdrawal", type: WIDGET.STACK }
                    ]
                },
                withdrawalItems: <StackProps>{
                    type: StackType.row,
                    flex: 1,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "titleWithdrawal", type: WIDGET.TEXT }
                    ]
                },

                titleWithdrawal: <TypographyProps>{
                    label: "Withdrawal request",
                    color: ColorTokens.Grey_Night,
                    numberOfLines: 1,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "500",
                },
                ctaWithdrawal: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "cta1Withdrawal", type: WIDGET.BUTTON },
                    ]
                },
                cta1Withdrawal: <ButtonProps>{
                    type: ButtonTypeTokens.MediumGhost,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.FAQ,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.MY_PROFILE,
                      },
                },
                withdrawalDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Chalk,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                Card3: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "kycDetails", type: WIDGET.STACK },
                            { id: "kycDivider", type: WIDGET.DIVIDER },
                        ]
                    }
                },
                kycDetails: <StackProps>{
                    type: StackType.row,
                    width: StackWidth.FULL,
                    widgetItems: [
                        { id: "kycItems", type: WIDGET.STACK },
                        { id: "ctakyc", type: WIDGET.STACK }
                    ]
                },
                kycItems: <StackProps>{
                    type: StackType.row,
                    flex: 1,
                    alignItems: StackAlignItems.center,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "kycTitle", type: WIDGET.TEXT }
                    ]
                },

                kycTitle: <TypographyProps>{
                    label: "KYC verification",
                    color: ColorTokens.Grey_Night,
                    numberOfLines: 1,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "500",
                },
                ctakyc: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "cta1kyc", type: WIDGET.BUTTON },
                    ]
                },
                cta1kyc: <ButtonProps>{
                    type: ButtonTypeTokens.MediumGhost,
                    width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.SM,
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
                kycDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Chalk,
                    margin: {
                        vertical: SizeTypeTokens.SM,
                        horizontal: SizeTypeTokens.SM,
                    },
                },
                // detailScreen: <StackProps>{
                //     type: StackType.column,
                //     bgColor: ColorTokens.Grey_Milk,
                //     flex: 1,
                //     width: StackWidth.FULL,
                //     height: StackHeight.FULL,
                //     alignItems: StackAlignItems.center,
                //     widgetItems: [
                //         { id: "accountDetails", type: WIDGET.STACK },
                //         { id: "accountSpace1", type: WIDGET.SPACE },
                //         { id: "accountDivider", type: WIDGET.DIVIDER },
                //         { id: "accountSpace2", type: WIDGET.SPACE },
                //         { id: "faqDetails", type: WIDGET.STACK },
                //         { id: "faqSpace1", type: WIDGET.SPACE },
                //         { id: "faqDivider", type: WIDGET.DIVIDER },
                //         { id: "faqSpace2", type: WIDGET.SPACE },
                //         { id: "contactDetails", type: WIDGET.STACK },
                //         { id: "contactSpace1", type: WIDGET.SPACE },
                //         { id: "contactDivider", type: WIDGET.DIVIDER },
                //         { id: "contactSpace2", type: WIDGET.SPACE },
                //     ]

                // },
                // accountDetails: <StackProps>{
                //     type: StackType.row,
                //     width: StackWidth.FULL,
                //     widgetItems: [
                //         { id: "infoItems", type: WIDGET.STACK },
                //         { id: "cta", type: WIDGET.STACK }
                //     ]
                // },
                // infoItems: <StackProps>{
                //     type: StackType.row,
                //     flex: 1,
                //     alignItems: StackAlignItems.center,
                //     justifyContent: StackJustifyContent.flexStart,
                //     widgetItems: [
                        
                //         { id: "title", type: WIDGET.TEXT }
                //     ]
                // },
               

                // title: <TypographyProps>{
                //     label: "Getting started",
                //     color: ColorTokens.Grey_Night,
                //     numberOfLines: 1,
                //     fontSize: FontSizeTokens.SM,
                //     fontFamily: FontFamilyTokens.Inter,
                //     fontWeight: "500",
                // },
                // cta: <StackProps>{
                //     type: StackType.row,
                //     alignItems: StackAlignItems.flexEnd,
                //     justifyContent: StackJustifyContent.flexEnd,
                //     widgetItems: [
                //         { id: "cta1", type: WIDGET.BUTTON },
                //     ]
                // },
                // cta1: <ButtonProps>{
                //     type: ButtonTypeTokens.MediumGhost,
                //     width: ButtonWidthTypeToken.CONTENT,
                //     icon: <IconProps>{
                //         name: IconTokens.ChervonDownRight,
                //         size: IconSizeTokens.MD,
                //         color: ColorTokens.Grey_Charcoal
                //     }
                // },
                // accountSpace1:<SpaceProps>{size:SizeTypeTokens.XL},
                // accountDivider: <DividerProps>{
                //     size: DividerSizeTokens.SM,
                //     color: ColorTokens.Grey_Chalk,
                //     margin: {
                //         vertical: SizeTypeTokens.SM,
                //         horizontal: SizeTypeTokens.SM,
                //     },
                // },
                // accountSpace2:<SpaceProps>{size:SizeTypeTokens.XL},
                // faqDetails: <StackProps>{
                //     type: StackType.row,
                //     width: StackWidth.FULL,
                //     widgetItems: [
                //         { id: "faqItems", type: WIDGET.STACK },
                //         { id: "ctaFaq", type: WIDGET.STACK }
                //     ]
                // },
                // faqItems: <StackProps>{
                //     type: StackType.row,
                //     flex: 1,
                //     alignItems: StackAlignItems.center,
                //     justifyContent: StackJustifyContent.flexStart,
                //     widgetItems: [
                       
                //         { id: "titleFaq", type: WIDGET.TEXT }
                //     ]
                // },
               

                // titleFaq: <TypographyProps>{
                //     label: "Withdrawal request",
                //     color: ColorTokens.Grey_Night,
                //     numberOfLines: 1,
                //     fontSize: FontSizeTokens.SM,
                //     fontFamily: FontFamilyTokens.Inter,
                //     fontWeight: "500",
                // },
                // ctaFaq: <StackProps>{
                //     type: StackType.row,
                //     alignItems: StackAlignItems.flexEnd,
                //     justifyContent: StackJustifyContent.flexEnd,
                //     widgetItems: [
                //         { id: "cta1Faq", type: WIDGET.BUTTON },
                //     ]
                // },
                // cta1Faq: <ButtonProps>{
                //     type: ButtonTypeTokens.MediumGhost,
                //     width: ButtonWidthTypeToken.CONTENT,
                //     icon: <IconProps>{
                //         name: IconTokens.ChervonDownRight,
                //         size: IconSizeTokens.SM,
                //         color: ColorTokens.Grey_Charcoal
                //     }
                // },
                // faqSpace1:<SpaceProps>{size:SizeTypeTokens.XL},
                // faqDivider: <DividerProps>{
                //     size: DividerSizeTokens.SM,
                //     color: ColorTokens.Grey_Chalk,
                //     margin: {
                //         vertical: SizeTypeTokens.SM,
                //         horizontal: SizeTypeTokens.SM,
                //     },
                // },
                // faqSpace2:<SpaceProps>{size:SizeTypeTokens.XL},
                // contactDetails: <StackProps>{
                //     type: StackType.row,
                //     width: StackWidth.FULL,
                //     widgetItems: [
                //         { id: "contactItems", type: WIDGET.STACK },
                //         { id: "ctaContact", type: WIDGET.STACK }
                //     ]
                // },
                // contactItems: <StackProps>{
                //     type: StackType.row,
                //     flex: 1,
                //     alignItems: StackAlignItems.center,
                //     justifyContent: StackJustifyContent.flexStart,
                //     widgetItems: [
                       
                //         { id: "contactTitle", type: WIDGET.TEXT }
                //     ]
                // },
                

                // contactTitle: <TypographyProps>{
                //     label: "KYC verification",
                //     color: ColorTokens.Grey_Night,
                //     numberOfLines: 1,
                //     fontSize: FontSizeTokens.SM,
                //     fontFamily: FontFamilyTokens.Inter,
                //     fontWeight: "500",
                // },
                // ctaContact: <StackProps>{
                //     type: StackType.row,
                //     alignItems: StackAlignItems.flexEnd,
                //     justifyContent: StackJustifyContent.flexEnd,
                //     widgetItems: [
                //         { id: "cta1Contact", type: WIDGET.BUTTON },
                //     ]
                // },
                // cta1Contact: <ButtonProps>{
                //     type: ButtonTypeTokens.MediumGhost,
                //     width: ButtonWidthTypeToken.CONTENT,
                //     icon: <IconProps>{
                //         name: IconTokens.ChervonDownRight,
                //         size: IconSizeTokens.SM,
                //         color: ColorTokens.Grey_Charcoal
                //     }
                // },
                // contactSpace1:<SpaceProps>{size:SizeTypeTokens.XL},
                // contactDivider: <DividerProps>{
                //     size: DividerSizeTokens.SM,
                //     color: ColorTokens.Grey_Chalk,
                //     margin: {
                //         vertical: SizeTypeTokens.SM,
                //         horizontal: SizeTypeTokens.SM,
                //     },
                // },
                // contactSpace2:<SpaceProps>{size:SizeTypeTokens.XL},
               
            },
        };
    };

export const faqMF: PageType<any> = {
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
