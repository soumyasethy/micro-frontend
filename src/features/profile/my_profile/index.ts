import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps
} from "@voltmoney/types";
import _ from "lodash";
import {
    ActiveStateTokens,
    AvatarProps,
    AvatarSizeTokens,
    AvatarTypeTokens,
    BorderRadiusTokens,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconAlignmentTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    PaddingSizeTokens,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
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
import { ACTION, ProfileDetails, ProfilePayload } from "./types";
import { aboutDetails, accountDetails, contactDetails, faqDetails, goBack, logout } from "./actions";
import { AccountPayload } from "../account_details/types";
import { fetchUserProfileRepo } from "./repo";

export const template: (
    userName: string,
    initialUserLetter: string,
    profileData: ProfileDetails
) => TemplateSchema = (
    userName, initialUserLetter, profileData
) => ({
    // export const template: (
    // ) => TemplateSchema = (
    //     ) => {

    // return {
    layout: <Layout>{
        id: ROUTE.MY_PROFILE,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "card",
                type: WIDGET.CARD,
                position: POSITION.FIXED_TOP,
                padding: {
                    // horizontal: 16,
                    // vertical:10,
                },
            },
            { id: "divider", type: WIDGET.DIVIDER },
            // {
            //     id: "header", type: WIDGET.CARD, position: POSITION.FIXED_TOP
            // },

            {
                id: "detailScreen", type: WIDGET.STACK, padding: {
                    left: 16, right: 16,
                    horizontal: 16,
                }
            },
            {
                id: "bottomStack", type: WIDGET.STACK, position: POSITION.ABSOLUTE_BOTTOM,
                padding: {
                    left: 16, right: 16
                }
            },
        ],
    },
    datastore: <Datastore>{
        card: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [{ id: "header", type: WIDGET.STACK },
                //{ id: "divider", type: WIDGET.DIVIDER }
                ]
            },
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
        },
        header: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            padding: PaddingSizeTokens.LG,
            widgetItems: [
                { id: "avatar", type: WIDGET.AVATAR },
                { id: "titles", type: WIDGET.TEXT },
                { id: "space01", type: WIDGET.SPACE },
                { id: "headerRight", type: WIDGET.STACK },
            ],
        },
        // headerLeft: <StackProps>{
        //     type: StackType.row,
        //     alignItems: StackAlignItems.center,
        //     width:StackWidth.FULL,
        //     justifyContent: StackJustifyContent.spaceBetween,
        //     padding: PaddingSizeTokens.LG,
        //     widgetItems: [
        //         { id: "avatar", type: WIDGET.AVATAR },
        //         { id: "space0", type: WIDGET.SPACE },
        //          { id: "titles", type: WIDGET.TEXT },
              
        //     ],
        // },
        headerRight: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexEnd,
            //padding: PaddingSizeTokens.LG,
            widgetItems: [
                //   { id: "contactUs", type: WIDGET.TAG },
                //   { id: "contactUsSpace", type: WIDGET.SPACE },
                { id: "leadIcon", type: WIDGET.BUTTON },
            ],
        },
        contactUs: <TagProps>{
            icon: {
                align: IconAlignmentTokens.left,
                name: IconTokens.Support,
                size: IconSizeTokens.XL,
            },
            label: "Contact us",
            labelColor: ColorTokens.Primary_100,
            type: TagTypeTokens.DEFAULT,
            bgColor: ColorTokens.Primary_05,
        },

        contactUsSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
        avatar: <AvatarProps>{
            initialLetter: `${initialUserLetter}`,
            uri: 'https://reactnative.dev/img/tiny_logo.png',
            type: AvatarTypeTokens.SINGLE,
            size: AvatarSizeTokens.MD,
            // borderWidth: 1,
            borderColor: ColorTokens.Primary_100,
            borderRadius: BorderRadiusTokens.BR5,
            active: ActiveStateTokens.INACTIVE,
        },
        titles: <TypographyProps>{
            label: `${userName}`,
            fontSize: FontSizeTokens.MD,
            numberOfLines:1,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Poppins,
            fontWeight: "700",
        },
        space01: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
        leadIcon: <ButtonProps & WidgetProps>{
            label: "",
            type: ButtonTypeTokens.SmallGhost,
            width: ButtonWidthTypeToken.CONTENT,
            stack: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                justifyContent: StackJustifyContent.flexStart,
            },
            icon: {
                name: IconTokens.Cancel,
                align: IconAlignmentTokens.right,
                size: IconSizeTokens.XXXXL,
            },
            action: {
                type: ACTION.BACK_BUTTON,
                payload: <{}>{
                    value: "",
                    widgetId: "input",
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        divider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.XS,
                horizontal: SizeTypeTokens.SM,
            },
        },
        // header: <CardProps>{
        //     bgColor: ColorTokens.White,
        //     body: {
        //         widgetItems: [
        //             { id: "profileBlock", type: WIDGET.STACK },
        //             { id: "divider", type: WIDGET.DIVIDER },
        //         ]
        //     }
        // },
        // profileBlock: <StackProps>{
        //     type: StackType.row,
        //     width: StackWidth.FULL,
        //     alignItems: StackAlignItems.center,
        //     // justifyContent: StackJustifyContent.spaceBetween,
        //     widgetItems: [
        //         { id: "profileBlock1", type: WIDGET.STACK },
        //         { id: "headerStack", type: WIDGET.STACK,padding:{left:0,right:-20} },
        //     ]
        // },
        // profileBlock1: <StackProps>{
        //     type: StackType.row,
        //     alignItems: StackAlignItems.center,
        //     width: StackWidth.FULL,
        //     justifyContent: StackJustifyContent.flexStart,
        //     widgetItems: [
        //         { id: "avatar", type: WIDGET.IMAGE },
        //         { id: "space0", type: WIDGET.SPACE },
        //         { id: "nameElement", type: WIDGET.TEXT }
        //     ]
        // },
        // avatar: <AvatarProps>{
        //     initialLetter: `${initialUserLetter}`,
        //     uri: 'https://reactnative.dev/img/tiny_logo.png',
        //     type: AvatarTypeTokens.SINGLE,
        //     size: AvatarSizeTokens.SM,
        //     borderWidth: 1,
        //     borderColor: ColorTokens.Primary_100,
        //     borderRadius: BorderRadiusTokens.BR5,
        //     active:ActiveStateTokens.INACTIVE,
        // },
        // space0: <SpaceProps>{ size: SizeTypeTokens.LG },
        // nameElement: <TypographyProps>{
        //     label: `${userName}`,
        //     color: ColorTokens.Grey_Night,
        //     fontSize: FontSizeTokens.MD,
        //     numberOfLines: 1,
        //     fontFamily: FontFamilyTokens.Inter,
        //     fontWeight: "600",
        // },
        // headerStack: <StackProps>{
        //     type: StackType.row,
        //     alignItems: StackAlignItems.flexEnd,
        //     justifyContent: StackJustifyContent.flexEnd,
        //     widgetItems: [
        //         { id: "cancelBlock", type: WIDGET.BUTTON }
        //     ]
        // },
        // cancelBlock: <ButtonProps>{
        //     type: ButtonTypeTokens.SmallGhost,
        //     //width: ButtonWidthTypeToken.CONTENT,
        //     icon: <IconProps>{
        //         name: IconTokens.Cancel,
        //         size: IconSizeTokens.MD,
        //         color: ColorTokens.Grey_Charcoal
        //     },
        //     action: {
        //         type: ACTION.BACK_BUTTON,
        //         payload: <{}>{
        //             value: "",
        //             widgetId: "continue",
        //             isResend: false,
        //         },
        //         routeId: ROUTE.MY_PROFILE,
        //     },
        // },
        // divider: <DividerProps>{
        //     size: DividerSizeTokens.SM,
        //     color: ColorTokens.Grey_Chalk,
        //     margin: {
        //         vertical: SizeTypeTokens.XS,
        //         horizontal: SizeTypeTokens.SM,
        //     },
        // },

        detailScreen: <StackProps>{
            widgetItems: [
                { id: "accountCard", type: WIDGET.CARD },
                { id: "faqCard", type: WIDGET.CARD },
                { id: "contactCard", type: WIDGET.CARD }
            ]

        },
        accountCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: "accountDetails", type: WIDGET.STACK },
                    { id: "accountSpace", type: WIDGET.SPACE },
                    { id: "accountDivider", type: WIDGET.DIVIDER },
                ]
            }
        },
        accountDetails: <StackProps>{
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
            name: IconTokens.Person,
            color: ColorTokens.Grey_Night,
            size: IconSizeTokens.LG
        },
        infoSpace: <SpaceProps>{
            size: SizeTypeTokens.LG
        },

        title: <TypographyProps>{
            label: "Account details",
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
            // width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.MD,
                color: ColorTokens.Grey_Night
            },
            action: {
                type: ACTION.PROFILE,
                payload: <ProfilePayload>{
                    value: profileData,
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        accountSpace: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        accountDivider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.SM,
                horizontal: SizeTypeTokens.SM,
            },
        },
        faqCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: "faqDetails", type: WIDGET.STACK },
                    { id: "faqsSpace", type: WIDGET.SPACE },
                    { id: "faqDivider", type: WIDGET.DIVIDER },
                ]
            }
        },
        faqDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [
                { id: "faqItems", type: WIDGET.STACK },
                { id: "ctaFaq", type: WIDGET.STACK }
            ]
        },
        faqItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: "iconFaq", type: WIDGET.ICON },
                { id: "faqSpace", type: WIDGET.SPACE },
                { id: "titleFaq", type: WIDGET.TEXT }
            ]
        },
        iconFaq: <IconProps>{
            name: IconTokens.Question,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD
        },
        faqSpace: <SpaceProps>{
            size: SizeTypeTokens.LG
        },

        titleFaq: <TypographyProps>{
            label: "FAQ’s",
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "500",
        },
        ctaFaq: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.flexEnd,
            justifyContent: StackJustifyContent.flexEnd,
            widgetItems: [
                { id: "cta1Faq", type: WIDGET.BUTTON },
            ]
        },
        cta1Faq: <ButtonProps>{
            type: ButtonTypeTokens.SmallGhost,
            //  width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.SM,
                color: ColorTokens.Grey_Night
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
        faqsSpace: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        faqDivider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.SM,
                horizontal: SizeTypeTokens.SM,
            },
        },
        contactCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: "contactDetails", type: WIDGET.STACK },
                    { id: "contactsSpace", type: WIDGET.SPACE },
                    { id: "contactDivider", type: WIDGET.DIVIDER },
                ]
            }
        },
        contactDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [
                { id: "contactItems", type: WIDGET.STACK },
                { id: "ctaContact", type: WIDGET.STACK }
            ]
        },
        contactItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: "contactName", type: WIDGET.ICON },
                { id: "contactSpace", type: WIDGET.SPACE },
                { id: "contactTitle", type: WIDGET.TEXT }
            ]
        },
        contactName: <IconProps>{
            name: IconTokens.HeadPhone,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD
        },
        contactSpace: <SpaceProps>{
            size: SizeTypeTokens.LG
        },

        contactTitle: <TypographyProps>{
            label: "Contact Us",
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "500",
        },
        ctaContact: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.flexEnd,
            justifyContent: StackJustifyContent.flexEnd,
            widgetItems: [
                { id: "cta1Contact", type: WIDGET.BUTTON },
            ]
        },
        cta1Contact: <ButtonProps>{
            type: ButtonTypeTokens.SmallGhost,
            // width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.SM,
                color: ColorTokens.Grey_Night
            },
            action: {
                type: ACTION.CONTACT_US,
                payload: <{}>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        contactsSpace: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        contactDivider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.SM,
                horizontal: SizeTypeTokens.SM,
            },
        },
        bottomStack: <StackProps>{
            widgetItems: [
                { id: "aboutUsCard", type: WIDGET.CARD },
                { id: "logoutCard", type: WIDGET.CARD },
            ]

        },
        aboutUsCard: <CardProps & WidgetProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: "aboutUsDetails", type: WIDGET.STACK },
                    { id: "aboutUsSpace1", type: WIDGET.SPACE },
                    { id: "aboutUsDivider", type: WIDGET.DIVIDER },
                ],
                
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
        aboutUsDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            flex: 1,
            widgetItems: [
                { id: "aboutUsItems", type: WIDGET.STACK },
                { id: "aboutUsSpace0", type: WIDGET.SPACE },
                //  { id: "aboutUsCta", type: WIDGET.STACK }
            ]
        },
        aboutUsItems: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: "aboutUsIconName", type: WIDGET.ICON },
                { id: "aboutUsSpace", type: WIDGET.SPACE },
                { id: "aboutUsTitle", type: WIDGET.TEXT }
            ]
        },
        aboutUsIconName: <IconProps>{
            name: IconTokens.Volt,
            color: ColorTokens.Primary_100,
            size: IconSizeTokens.LG
        },
        aboutUsSpace: <SpaceProps>{
            size: SizeTypeTokens.LG
        },

        aboutUsTitle: <TypographyProps>{
            label: "About Us",
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "500",
        },
        aboutUsSpace0: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        aboutUsSpace1: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        aboutUsDivider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.XS,
                horizontal: SizeTypeTokens.SM,
            },
        },
        logoutCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: "logoutDetails", type: WIDGET.STACK }
                ],
            },
            action: {
                type: ACTION.LOGOUT,
                payload: <{}>{
                    value: "",
                    widgetId: "continue",
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
           
        },
        logoutDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [
                { id: "logoutItems", type: WIDGET.STACK },

            ]
        },
        logoutItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: "iconlogout", type: WIDGET.ICON },
                { id: "logoutSpace", type: WIDGET.SPACE },
                { id: "titlelogout", type: WIDGET.TEXT }
            ]
        },
        iconlogout: <IconProps>{
            name: IconTokens.Logout,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD
        },
        logoutSpace: <SpaceProps>{
            size: SizeTypeTokens.LG
        },

        titlelogout: <TypographyProps>{
            label: "Logout",
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "500",
        },

    },
    //   };
});

export const myProfileMF: PageType<any> = {
    onLoad: async ({ }, { response }) => {
        const responseX = response ? response : await fetchUserProfileRepo();
        const userName: string =
            responseX.name;
        const initialUserLetter: string =
            userName.charAt(0);
        console.log("initialUserLetter", initialUserLetter)
        const profileData = responseX;
        return Promise.resolve(
            template(userName, initialUserLetter, profileData)
        );
    },

    actions: {
        [ACTION.PROFILE]: accountDetails,
        [ACTION.CONTACT_US]: contactDetails,
        [ACTION.FAQ]: faqDetails,
        [ACTION.BACK_BUTTON]: goBack,
        [ACTION.LOGOUT]: logout,
        [ACTION.ABOUT]: aboutDetails
    },
    bgColor: "#FFFFFF",
};
