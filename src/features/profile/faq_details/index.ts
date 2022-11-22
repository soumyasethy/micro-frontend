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
    AccordionProps,
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
                            left: 16, right: 16
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
                    type: ButtonTypeTokens.SmallGhost,
                   // width: ButtonWidthTypeToken.CONTENT,
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
                    labelColor:ColorTokens.Primary_100,
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
                        { id: "Card1", type: WIDGET.CARD,padding:{
                            left:0,right:0
                        } }
                    ]

                },
                Card1: <CardProps>{
                    bgColor: ColorTokens.White,
                    body: {
                        widgetItems: [
                            { id: "startDetails", type: WIDGET.ACCORDION },
                            { id: "startDetails1", type: WIDGET.ACCORDION },
                            { id: "startDetails2", type: WIDGET.ACCORDION },
                        ]
                    }
                },
                startDetails: <AccordionProps>{
                    title: 'I haven’t recieved my amount after withdraw?',
                    description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                    icon:IconTokens.DownArrow,
                    onPress: Function
                },
                startDetails1: <AccordionProps>{
                    title: 'Can I cancel the withdrawal request?',
                    description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                    icon:IconTokens.DownArrow,
                    onPress: Function
                },
                startDetails2: <AccordionProps>{
                    title: 'How much time does the verification process takes to verify my background details?',
                    description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                    icon:IconTokens.DownArrow,
                    onPress: Function
                },
               
               

              
               
            },
        };
    };

export const faqDetailsMF: PageType<any> = {
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
