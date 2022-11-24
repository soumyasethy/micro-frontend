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
    HeaderTypeTokens,
    IconAlignmentTokens,
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
    TagProps,
    TagTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, FaqPayload, KYCPayload, WithdrawalPayload } from "./types";
import { contact, faqDetails, goBack } from "./actions";
export const template: (
) => TemplateSchema = (
    ) => {

        return {
            layout: <Layout>{
                id: ROUTE.FAQ,
                type: LAYOUTS.LIST,
                widgets: [
                    {
                        id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP
                    },
                    { id: "Card1", type: WIDGET.CARD
                    },
                      { id: "Card2", type: WIDGET.CARD
                    },
                    { id: "Card3", type: WIDGET.CARD
                     }


                ],
            },
            datastore: <Datastore>{
                header: <HeaderProps>{
                    title: "FAQ’s",
                    isBackButton: true,
                    type:HeaderTypeTokens.HEADERCTA,
                    leftCta: "Contact Us",
                    leftProps: {
                      label: 'Contact Us',
                      type: TagTypeTokens.SECONDARY,
                      labelColor: ColorTokens.Primary_100,
                      icon: {
                        name: IconTokens.Support,
                        size: IconSizeTokens.MD,
                        align: IconAlignmentTokens.left,
                        color:ColorTokens.Primary_100
                      },
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
                      leftAction: {
                        type: ACTION.CONTACT,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.FAQ,
                      },
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
                    ],
                    action: {
                        type: ACTION.FAQ,
                        payload: <FaqPayload>{
                          value: "Getting started",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
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
                    fontSize: FontSizeTokens.XS,
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
                   // width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.MD,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.FAQ,
                        payload: <FaqPayload>{
                          value: "Getting started",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
                },
                startSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
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
                            { id: "withdrawalSpace", type: WIDGET.SPACE },
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
                    ],
                    action: {
                        type: ACTION.FAQ,
                        payload: <WithdrawalPayload>{
                          value: "Withdrawal request",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
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
                    fontSize: FontSizeTokens.XS,
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
                    type: ButtonTypeTokens.SmallGhost,
                  //  width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.FAQ,
                        payload: <FaqPayload>{
                          value: "Withdrawal request",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
                },
                withdrawalSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
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
                            { id: "kycSpace", type: WIDGET.SPACE },
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
                    ],
                    action: {
                        type: ACTION.FAQ,
                        payload: <FaqPayload>{
                          value: "KYC verification",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
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
                    fontSize: FontSizeTokens.XS,
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
                    type: ButtonTypeTokens.SmallGhost,
                 //   width: ButtonWidthTypeToken.CONTENT,
                    icon: <IconProps>{
                        name: IconTokens.ChervonDownRight,
                        size: IconSizeTokens.SM,
                        color: ColorTokens.Grey_Charcoal
                    },
                    action: {
                        type: ACTION.FAQ,
                        payload: <KYCPayload>{
                          value: "KYC verification",
                          widgetId: "continue"
                        },
                        routeId: ROUTE.FAQ,
                      },
                },
                kycSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
                kycDivider: <DividerProps>{
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

export const faqMF: PageType<any> = {
    onLoad: async () => {

        return Promise.resolve(
            template()
        );
    },

    actions: {
         [ACTION.FAQ]: faqDetails,
         [ACTION.CONTACT]: contact,
        [ACTION.BACK_BUTTON]: goBack
    },
    bgColor: "#FFFFFF",
};
