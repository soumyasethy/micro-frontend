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
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconAlignmentTokens,
    IconSizeTokens,
    IconTokens,
    StackProps,
    TagTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { contact, goBack } from "./actions";
export const template: (
    title: string
) => TemplateSchema = (title
    ) => {
        return {
            layout: <Layout>{
                id: ROUTE.FAQ,
                type: LAYOUTS.LIST,
                widgets: [
                    {
                        id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP
                    },
                    {
                        id: "detailScreen", type: WIDGET.STACK, padding: {
                            left: 16, right: 16
                        }
                    },
                ],
            },
            datastore: <Datastore>{
                header: <HeaderProps>{
                    title: "FAQ’s",
                    action: {
                        type: ACTION.BACK_BUTTON,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.FAQ_DETAILS,
                      },
                      leftAction: {
                        type: ACTION.CONTACT,
                        payload: <{}>{
                          value: "",
                          widgetId: "continue",
                          isResend: false,
                        },
                        routeId: ROUTE.FAQ_DETAILS,
                      },
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
                  },
                detailScreen: <StackProps>{
                    widgetItems: [
                        { id: "titleData", type: WIDGET.TEXT,padding:{
                            left:0,right:0
                        } },
                        { id: "Card1", type: WIDGET.CARD,padding:{
                            left:0,right:0
                        } }
                    ]

                },
                titleData: <TypographyProps>{
                    label: `${title}`,
                    color: ColorTokens.Grey_Charcoal,
                    fontSize: FontSizeTokens.XS,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "600",
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
    onLoad: async ({},{ title }) => {

        return Promise.resolve(
            template(title)
        );
    },

    actions: {
        [ACTION.BACK_BUTTON]: goBack,
        [ACTION.CONTACT]: contact
    },
    bgColor: "#FFFFFF",
    clearPrevious:true,
};
