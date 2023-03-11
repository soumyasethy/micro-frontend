import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from '@voltmoney/types'
import {
    ActiveStateTokens,
    AvatarSizeTokens,
    AvatarTypeTokens,
    BorderRadiusTokens,
    ButtonProps,
    ButtonTypeTokens,
    CardProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import { ROUTE } from '../../../routes'
import { ACTION, ProfileDetails, ProfilePayload } from './types'
import {
    aboutDetails,
    accountDetails,
    contactDetails,
    faqDetails,
    goBack,
    logout,
} from './actions'
import { fetchUserProfileRepo } from './repo'
import SharedPropsService from '../../../SharedPropsService'
import { ConfigTokens } from '../../../configs/config'
import { shouldShowVoltContactUs } from '../../../configs/uri-config-utils'

export const template: (
    userName: string,
    initialUserLetter: string,
    profileData: ProfileDetails,
    showContactUs: boolean,
) => TemplateSchema = (
    userName,
    initialUserLetter,
    profileData,
    showContactUs,
) => ({
    layout: <Layout>{
        id: ROUTE.MY_PROFILE,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: 'header',
                type: WIDGET.HEADER,
                position: POSITION.ABSOLUTE_TOP,
            },
            { id: 'space0', type: WIDGET.SPACE },
            {
                id: 'accountCard',
                type: WIDGET.CARD,
            },
            {
                id: 'faqCard',
                type: WIDGET.CARD,
            },
            showContactUs
                ? {
                    id: 'contactCard',
                    type: WIDGET.CARD,
                }
                : {},
            {
                id: 'bottomCard1',
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
            {
                id: 'bottomCard3',
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM,
                padding: {
                    horizontal: 0,
                    all: 0,
                },
            },
            {
                id: 'bottomCard2',
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM,
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps>{
            title: `${userName}`,
            rightItem: {
                uri: 'https://reactnative.dev/img/tiny_logo.png',
                initialLetter: `${initialUserLetter}`,
                type: AvatarTypeTokens.SINGLE,
                size: AvatarSizeTokens.LG,
                borderWidth: 1,
                borderColor: ColorTokens.Primary_100,
                borderRadius: BorderRadiusTokens.BR5,
                active: ActiveStateTokens.INACTIVE,
            },
            isBackButton: false,
            leftIcon: {
                name: IconTokens.Cross,
                size: IconSizeTokens.XL,
                color: ColorTokens.Grey_Charcoal,
            },
            type: HeaderTypeTokens.HEADERCTA,
            action: {
                type: ACTION.BACK_BUTTON,
                payload: <{}>{
                    value: '',
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        space0: <SpaceProps>{ size: SizeTypeTokens.XL },
        list1: <ListItemProps>{
            customTitle: <TypographyProps>{
                label: 'Account details',
                color: ColorTokens.Grey_Night,
                numberOfLines: 1,
                fontSize: FontSizeTokens.SM,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: '500',
            },
            leadIconName: IconTokens.Person,
            trailIconName: IconTokens.ChevronDown,
            onPress: () => {},
        },
        accountCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    // { id: "accountDetailsCTA", type: WIDGET.STACK }
                    { id: 'accountDetails', type: WIDGET.STACK },
                    { id: 'accountSpace', type: WIDGET.SPACE },
                    { id: 'accountDivider', type: WIDGET.DIVIDER },
                ],
            },
        },

        accountDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            justifyContent: StackJustifyContent.spaceBetween,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'infoItems', type: WIDGET.STACK },
                { id: 'cta', type: WIDGET.STACK },
            ],
            action: {
                type: ACTION.PROFILE,
                payload: <ProfilePayload>{
                    value: profileData,
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        infoItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'iconName', type: WIDGET.ICON },
                { id: 'infoSpace', type: WIDGET.SPACE },
                { id: 'title', type: WIDGET.TEXT },
            ],
        },
        iconName: <IconProps>{
            name: IconTokens.Person,
            color: ColorTokens.Grey_Night,
            size: IconSizeTokens.LG,
        },
        infoSpace: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        title: <TypographyProps>{
            label: 'Account details',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },
        cta: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.flexEnd,
            justifyContent: StackJustifyContent.flexEnd,
            widgetItems: [{ id: 'cta1', type: WIDGET.BUTTON }],
        },
        cta1: <ButtonProps>{
            type: ButtonTypeTokens.MediumGhost,
            // width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.MD,
                color: ColorTokens.Grey_Charcoal,
            },
            action: {
                type: ACTION.PROFILE,
                payload: <ProfilePayload>{
                    value: profileData,
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        accountSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
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
                    { id: 'faqDetails', type: WIDGET.STACK },
                    { id: 'faqsSpace', type: WIDGET.SPACE },
                    { id: 'faqDivider', type: WIDGET.DIVIDER },
                ],
            },
        },
        faqDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'faqItems', type: WIDGET.STACK },
                { id: 'ctaFaq', type: WIDGET.STACK },
            ],
            action: {
                type: ACTION.FAQ,
                payload: {},
                routeId: ROUTE.MY_PROFILE,
            },
        },
        faqItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'iconFaq', type: WIDGET.ICON },
                { id: 'faqSpace', type: WIDGET.SPACE },
                { id: 'titleFaq', type: WIDGET.TEXT },
            ],
        },
        iconFaq: <IconProps>{
            name: IconTokens.Question,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD,
        },
        faqSpace: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        titleFaq: <TypographyProps>{
            label: 'FAQ’s',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },
        ctaFaq: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.flexEnd,
            justifyContent: StackJustifyContent.flexEnd,
            widgetItems: [{ id: 'cta1Faq', type: WIDGET.BUTTON }],
        },
        cta1Faq: <ButtonProps>{
            type: ButtonTypeTokens.MediumGhost,
            //  width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.SM,
                color: ColorTokens.Grey_Night,
            },
            action: {
                type: ACTION.FAQ,
                payload: <{}>{
                    value: '',
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        faqsSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
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
                    { id: 'contactDetails', type: WIDGET.STACK },
                    { id: 'contactsSpace', type: WIDGET.SPACE },
                    { id: 'contactDivider', type: WIDGET.DIVIDER },
                ],
            },
        },
        contactDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'contactItems', type: WIDGET.STACK },
                { id: 'ctaContact', type: WIDGET.STACK },
            ],
            action: {
                type: ACTION.CONTACT_US,
                payload: <{}>{
                    value: '',
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        contactItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'contactName', type: WIDGET.ICON },
                { id: 'contactSpace', type: WIDGET.SPACE },
                { id: 'contactTitle', type: WIDGET.TEXT },
            ],
        },
        contactName: <IconProps>{
            name: IconTokens.HeadPhone,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD,
        },
        contactSpace: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        contactTitle: <TypographyProps>{
            label: 'Contact Us',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },
        ctaContact: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.flexEnd,
            justifyContent: StackJustifyContent.flexEnd,
            widgetItems: [{ id: 'cta1Contact', type: WIDGET.BUTTON }],
        },
        cta1Contact: <ButtonProps>{
            type: ButtonTypeTokens.MediumGhost,
            // width: ButtonWidthTypeToken.CONTENT,
            icon: <IconProps>{
                name: IconTokens.ChervonDownRight,
                size: IconSizeTokens.SM,
                color: ColorTokens.Grey_Night,
            },
        },
        contactsSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        contactDivider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.SM,
                horizontal: SizeTypeTokens.SM,
            },
        },

        bottomCard1: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: 'bottomCard1Details', type: WIDGET.STACK },
                    // { id: "bottomCard1sSpace", type: WIDGET.SPACE },
                    // { id: "bottomCard1Divider", type: WIDGET.DIVIDER },
                ],
            },
        },
        bottomCard1Details: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [
                { id: 'bottomCard1Items', type: WIDGET.STACK },
                { id: 'ctabottomCard1', type: WIDGET.STACK },
            ],
            action: {
                type: ACTION.ABOUT,
                payload: <{}>{
                    value: '',
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        bottomCard1Items: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'bottomCard1Name', type: WIDGET.ICON },
                { id: 'bottomCard1Space', type: WIDGET.SPACE },
                { id: 'bottomCard1Title', type: WIDGET.TEXT },
            ],
        },
        bottomCard1Name: <IconProps>{
            name: IconTokens.Volt,
            color: ColorTokens.Primary_100,
            size: IconSizeTokens.MD,
        },
        bottomCard1Space: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        bottomCard1Title: <TypographyProps>{
            label: 'About Us',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },

        // bottomCard1sSpace: <SpaceProps>{
        //   size: SizeTypeTokens.LG,
        // },
        bottomCard3: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    // { id: "bottomCard1Details", type: WIDGET.STACK },
                    // { id: "bottomCard1sSpace", type: WIDGET.SPACE },
                    { id: 'bottomCard1Divider', type: WIDGET.DIVIDER },
                ],
            },
        },
        bottomCard1Divider: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Chalk,
            margin: {
                vertical: SizeTypeTokens.SM,
                horizontal: SizeTypeTokens.NONE,
            },
        },

        bottomCard2: <CardProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [{ id: 'bottomCard2Details', type: WIDGET.STACK }],
            },
        },
        bottomCard2Details: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [{ id: 'bottomCard2Items', type: WIDGET.STACK }],
            action: {
                type: ACTION.LOGOUT,
                payload: <{}>{
                    value: '',
                    widgetId: 'continue',
                    isResend: false,
                },
                routeId: ROUTE.MY_PROFILE,
            },
        },
        bottomCard2Items: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'bottomCard2Name', type: WIDGET.ICON },
                { id: 'bottomCard2Space', type: WIDGET.SPACE },
                { id: 'bottomCard2Title', type: WIDGET.TEXT },
            ],
        },
        bottomCard2Name: <IconProps>{
            name: IconTokens.Logout,
            color: ColorTokens.Primary_100,
            size: IconSizeTokens.SM,
        },
        bottomCard2Space: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        bottomCard2Title: <TypographyProps>{
            label: 'Logout',
            color: ColorTokens.Primary_100,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            lineHeight: 24,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '600',
        },

        bottomStack: <StackProps>{
            widgetItems: [
                { id: 'aboutUsCard', type: WIDGET.CARD },
                { id: 'logoutCard', type: WIDGET.CARD },
            ],
        },
        aboutUsCard: <CardProps & WidgetProps>{
            bgColor: ColorTokens.White,
            body: {
                widgetItems: [
                    { id: 'aboutUsDetails', type: WIDGET.STACK },
                    { id: 'aboutUsSpace1', type: WIDGET.SPACE },
                    { id: 'aboutUsDivider', type: WIDGET.DIVIDER },
                ],
            },
            action: {
                type: ACTION.ABOUT,
                payload: {},
                routeId: ROUTE.MY_PROFILE,
            },
        },
        aboutUsDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            flex: 1,
            widgetItems: [
                { id: 'aboutUsItems', type: WIDGET.STACK },
                { id: 'aboutUsSpace0', type: WIDGET.SPACE },
                //  { id: "aboutUsCta", type: WIDGET.STACK }
            ],
        },
        aboutUsItems: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'aboutUsIconName', type: WIDGET.ICON },
                { id: 'aboutUsSpace', type: WIDGET.SPACE },
                { id: 'aboutUsTitle', type: WIDGET.TEXT },
            ],
            action: {
                type: ACTION.ABOUT,
                payload: {},
                routeId: ROUTE.MY_PROFILE,
            },
        },
        aboutUsIconName: <IconProps>{
            name: IconTokens.Volt,
            color: ColorTokens.Primary_100,
            size: IconSizeTokens.LG,
        },
        aboutUsSpace: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        aboutUsTitle: <TypographyProps>{
            label: 'About Us',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },
        aboutUsSpace0: <SpaceProps>{
            size: SizeTypeTokens.MD,
        },
        aboutUsSpace1: <SpaceProps>{
            size: SizeTypeTokens.XL,
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
                widgetItems: [{ id: 'logoutDetails', type: WIDGET.STACK }],
            },
        },
        logoutDetails: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [{ id: 'logoutItems', type: WIDGET.STACK }],
            action: {
                type: ACTION.LOGOUT,
                payload: {},
                routeId: ROUTE.MY_PROFILE,
            },
        },
        logoutItems: <StackProps>{
            type: StackType.row,
            flex: 1,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexStart,
            widgetItems: [
                { id: 'iconlogout', type: WIDGET.ICON },
                { id: 'logoutSpace', type: WIDGET.SPACE },
                { id: 'titlelogout', type: WIDGET.TEXT },
            ],
        },
        iconlogout: <IconProps>{
            name: IconTokens.Logout,
            color: ColorTokens.Black,
            size: IconSizeTokens.MD,
        },
        logoutSpace: <SpaceProps>{
            size: SizeTypeTokens.LG,
        },

        titlelogout: <TypographyProps>{
            label: 'Logout',
            color: ColorTokens.Grey_Night,
            numberOfLines: 1,
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: '500',
        },
    },
})

export const myProfileMF: PageType<any> = {
    onLoad: async ({}, { response }) => {
        const responseX = response ? response : await fetchUserProfileRepo()
        const userName: string = responseX.name
        const initialUserLetter: string = userName.charAt(0)
        const showContactUs = shouldShowVoltContactUs(
            await SharedPropsService.getURL(),
        )
        console.log('initialUserLetter', initialUserLetter)
        const profileData = responseX
        return Promise.resolve(
            template(userName, initialUserLetter, profileData, showContactUs),
        )
    },

    actions: {
        [ACTION.PROFILE]: accountDetails,
        [ACTION.CONTACT_US]: contactDetails,
        [ACTION.FAQ]: faqDetails,
        [ACTION.BACK_BUTTON]: goBack,
        [ACTION.LOGOUT]: logout,
        [ACTION.ABOUT]: aboutDetails,
    },
    bgColor: '#FFFFFF',
}