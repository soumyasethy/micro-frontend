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
    AspectRatioToken,
    BorderRadiusTokens,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    ImageProps,
    ImageSizeTokens,
    ShadowTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    StackProps,
    StackType,
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
                id: ROUTE.CONTACT_US,
                type: LAYOUTS.LIST,
                widgets: [
                    { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
                    { id: "info", type: WIDGET.TEXT },
                    { id: "space0", type: WIDGET.SPACE },
                    {
                        id: "whatsappCard", type: WIDGET.CARD
                    },
                    { id: "space1", type: WIDGET.SPACE },
                    {
                        id: "callCard", type: WIDGET.CARD
                    },
                    { id: "space2", type: WIDGET.SPACE },
                    {
                        id: "emailCard", type: WIDGET.CARD
                    },

                ],
            },
            datastore: <Datastore>{
                header: <HeaderProps>{
                    title: "Contact us",
                    leadIcon: "https://reactnative.dev/img/tiny_logo.png",
                    isBackButton: true,
                    type: "DEFAULT",
                    action: {
                        type: ACTION.BACK_BUTTON,
                        payload: <{}>{
                            value: "",
                            widgetId: "continue",
                            isResend: false
                        },
                        routeId: ROUTE.CONTACT_US,
                    },
                },
                info: <TypographyProps>{
                    label: "We would love to hear from you. You can get back to us via Call, Email or WhatsApp.",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "400",
                },
                space0: <SpaceProps>{ size: SizeTypeTokens.XL },
                whatsappCard: <CardProps>{
                    bgColor: ColorTokens.White,
                    borderRadius:BorderRadiusTokens.BR2,
                    shadow:ShadowTypeTokens.E2,
                    body: {
                        widgetItems: [
                            { id: "imageOrder", type: WIDGET.STACK },
                        ],
                    },
                },
                imageOrder: <StackProps>{
                    type: StackType.row,
                    widgetItems: [
                        { id: "imageItem", type: WIDGET.IMAGE },
                        { id: "space3", type: WIDGET.SPACE },
                        { id: "textItem", type: WIDGET.STACK }
                    ]
                },
                imageItem: <ImageProps>{
                    uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
                    size: ImageSizeTokens.SM,
                    aspectRatio: AspectRatioToken.A1_1,
                    borderRadius: BorderRadiusTokens.BR5,
                    padding: SizeTypeTokens.SM,
                },
                space3: <SpaceProps>{ size: SizeTypeTokens.MD },
                textItem: <StackProps>{
                    type: StackType.column,
                    widgetItems: [
                        { id: "text1", type: WIDGET.TEXT },
                        { id: "space4", type: WIDGET.SPACE },
                        { id: "text2", type: WIDGET.TEXT }
                    ]
                },
                text1: <TypographyProps>{
                    label: "WhatsApp",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "600",
                },
                space4: <SpaceProps>{ size: SizeTypeTokens.XS },
                text2: <TypographyProps>{
                    label: "Ask your queries anytime",
                    color: ColorTokens.Grey_Charcoal,
                    fontSize: FontSizeTokens.XS,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "400",
                },
                space1: <SpaceProps>{ size: SizeTypeTokens.XL },
                callCard: <CardProps>{
                    bgColor: ColorTokens.White,
                    borderRadius:BorderRadiusTokens.BR2,
                    shadow:ShadowTypeTokens.E2,
                    body: {
                        widgetItems: [
                            { id: "imageOrder1", type: WIDGET.STACK },
                        ],
                    },
                },
                imageOrder1: <StackProps>{
                    type: StackType.row,
                    widgetItems: [
                        { id: "imageItem1", type: WIDGET.IMAGE },
                        { id: "space5", type: WIDGET.SPACE },
                        { id: "textItem1", type: WIDGET.STACK }
                    ]
                },
                imageItem1: <ImageProps>{
                    uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
                    size: ImageSizeTokens.SM,
                    aspectRatio: AspectRatioToken.A1_1,
                    borderRadius: BorderRadiusTokens.BR5,
                    padding: SizeTypeTokens.SM,
                },
                space5: <SpaceProps>{ size: SizeTypeTokens.MD },
                textItem1: <StackProps>{
                    type: StackType.column,
                    widgetItems: [
                        { id: "text3", type: WIDGET.TEXT },
                        { id: "space6", type: WIDGET.SPACE },
                        { id: "text4", type: WIDGET.TEXT }
                    ]
                },
                text3: <TypographyProps>{
                    label: "Call",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "600",
                },
                space6: <SpaceProps>{ size: SizeTypeTokens.XS },
                text4: <TypographyProps>{
                    label: "Call us at (022) 62820570. We are available in working days from 9.30 AM to 6.30 PM",
                    color: ColorTokens.Grey_Charcoal,
                    fontSize: FontSizeTokens.XS,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "400",
                },
                space2: <SpaceProps>{ size: SizeTypeTokens.MD },
                emailCard: <CardProps>{
                    bgColor: ColorTokens.White,
                    borderRadius:BorderRadiusTokens.BR2,
                    shadow:ShadowTypeTokens.E2,
                    body: {
                        widgetItems: [
                            { id: "imageOrder2", type: WIDGET.STACK },
                        ],
                    },
                },
                imageOrder2: <StackProps>{
                    type: StackType.row,
                    widgetItems: [
                        { id: "imageItem2", type: WIDGET.IMAGE },
                        { id: "space7", type: WIDGET.SPACE },
                        { id: "textItem2", type: WIDGET.STACK }
                    ]
                },
                imageItem2: <ImageProps>{
                    uri: 'https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50',
                    size: ImageSizeTokens.SM,
                    aspectRatio: AspectRatioToken.A1_1,
                    borderRadius: BorderRadiusTokens.BR5,
                    padding: SizeTypeTokens.SM,
                },
                space7: <SpaceProps>{ size: SizeTypeTokens.MD },
                textItem2: <StackProps>{
                    type: StackType.column,
                    widgetItems: [
                        { id: "text5", type: WIDGET.TEXT },
                        { id: "space8", type: WIDGET.SPACE },
                        { id: "text6", type: WIDGET.TEXT }
                    ]
                },
                text5: <TypographyProps>{
                    label: "Email",
                    color: ColorTokens.Grey_Night,
                    fontSize: FontSizeTokens.SM,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "600",
                },
                space8: <SpaceProps>{ size: SizeTypeTokens.XS },
                text6: <TypographyProps>{
                    label: "Email us at help@voltmoney.in",
                    color: ColorTokens.Grey_Charcoal,
                    fontSize: FontSizeTokens.XS,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: "400",
                }
            },
        };
    };

export const contactUsMF: PageType<any> = {
    onLoad: async () => {

        return Promise.resolve(
            template()
        );
    },

    actions: {
        // [ACTION.ACCOUNT_DETAILS]: accountDetails,
        [ACTION.BACK_BUTTON]: goBack
    },
    bgColor: "#F3F5FC",
};
