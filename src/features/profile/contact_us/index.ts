import { Dimensions } from 'react-native'
import {
    Datastore,
    Layout,
    LAYOUTS,
    OpenNewTabTargetType,
    PageType,
    POSITION,
    SCREEN_SIZE,
    TemplateSchema,
} from '@voltmoney/types'
import {
    BorderRadiusTokens,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    IconTokens,
    ListItemProps,
    ShadowTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import { ROUTE } from '../../../routes'
import { ACTION } from './types'
import { goBack } from './actions'
import { DeepLinks } from '../../../configs/config'
import { getScreenType } from '../../../configs/platfom-utils'
import {
    getContactNumberForCall,
    getContactNumberForWhatsapp,
} from '../../../configs/uri-config-utils'
import SharedPropsService from '../../../SharedPropsService'

export const template: (
    whatsappNumber: string,
    callNumber: string,
    emailId: string,
    openNewTab: (url: string, openNewTabType: OpenNewTabTargetType) => void,
) => TemplateSchema = (whatsappNumber, callNumber, emailId, openNewTab) => {
    return {
        layout: <Layout>{
            id: ROUTE.CONTACT_US,
            type: LAYOUTS.LIST,
            widgets: [
                {
                    id: 'header',
                    type: WIDGET.HEADER,
                    position: POSITION.ABSOLUTE_TOP,
                },
                { id: 'topSpace', type: WIDGET.SPACE },
                { id: 'info', type: WIDGET.TEXT },
                { id: 'space0', type: WIDGET.SPACE },
                {
                    id: 'whatsappCard',
                    type: WIDGET.CARD,
                },
                { id: 'space1', type: WIDGET.SPACE },
                {
                    id: 'callCard',
                    type: WIDGET.CARD,
                },
                { id: 'space2', type: WIDGET.SPACE },
                {
                    id: 'emailCard',
                    type: WIDGET.CARD,
                },
            ],
        },
        datastore: <Datastore>{
            header: <HeaderProps>{
                title: 'Contact us',
                leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
                isBackButton: true,
                type: 'DEFAULT',
                action: {
                    type: ACTION.BACK_BUTTON,
                    payload: <{}>{
                        value: '',
                        widgetId: 'continue',
                        isResend: false,
                    },
                    routeId: ROUTE.CONTACT_US,
                },
            },
            topSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
            info: <TypographyProps>{
                label: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
                color: ColorTokens.Grey_Night,
                fontSize: FontSizeTokens.SM,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: '400',
            },
            space0: <SpaceProps>{ size: SizeTypeTokens.XL },
            whatsappCard: <CardProps>{
                bgColor: ColorTokens.White,
                borderColor: ColorTokens.Primary_05,
                borderWidth: 1,
                borderRadius: BorderRadiusTokens.BR2,
                shadow: ShadowTypeTokens.E7,
                margin: {
                  top: SizeTypeTokens.NONE,
                  bottom: SizeTypeTokens.NONE
                },
                body: {
                    widgetItems: [{ id: 'list1', type: WIDGET.LIST_ITEM }],
                },
            },
            list1: <ListItemProps>{
                customTitle: <TypographyProps>{
                    label: 'WhatsApp',
                    color: ColorTokens.Grey_Night,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '600',
                    fontSize: FontSizeTokens.SM,
                },
                customSubTitle: <TypographyProps>{
                    label: 'Ask your queries anytime',
                    color: ColorTokens.Grey_Charcoal,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '400',
                    fontSize: FontSizeTokens.XS,
                },
                isDivider: false,
                title: 'WhatsApp',
                leadIconName: IconTokens.Whatsapp,
                onPress: () => {
                    const screenType = getScreenType(
                        Dimensions.get('window').width,
                    )
                    if (
                        screenType === SCREEN_SIZE.X_SMALL ||
                        screenType === SCREEN_SIZE.SMALL
                    ) {
                        openNewTab(
                            DeepLinks.MOBILE_WHATSAPP + whatsappNumber,
                            OpenNewTabTargetType.parent,
                        )
                    } else {
                        openNewTab(
                            DeepLinks.WHATSAPP + whatsappNumber,
                            OpenNewTabTargetType.blank,
                        )
                    }
                },
            },
            space1: <SpaceProps>{ size: SizeTypeTokens.XL },
            callCard: <CardProps>{
                bgColor: ColorTokens.White,
                borderWidth: 1,
                borderColor: ColorTokens.Primary_05,
                borderRadius: BorderRadiusTokens.BR2,
                shadow: ShadowTypeTokens.E7,
                margin: {
                  top: SizeTypeTokens.NONE,
                  bottom: SizeTypeTokens.NONE
                },
                body: {
                    widgetItems: [
                        // { id: "imageOrder1", type: WIDGET.STACK },
                        { id: 'list2', type: WIDGET.LIST_ITEM },
                    ],
                },
            },
            list2: <ListItemProps>{
                customTitle: <TypographyProps>{
                    label: 'Call',
                    color: ColorTokens.Grey_Night,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '600',
                    fontSize: FontSizeTokens.SM,
                },
                customSubTitle: <TypographyProps>{
                    label: `Call us at ${callNumber}. We are available in working days from 9.30 AM to 6.30 PM`,
                    color: ColorTokens.Grey_Charcoal,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '400',
                    fontSize: FontSizeTokens.XS,
                },
                isDivider: false,
                title: 'Call',
                leadIconName: IconTokens.Phone,
                onPress: () => {
                    openNewTab(
                        DeepLinks.CALL + callNumber,
                        OpenNewTabTargetType.parent,
                    )
                },
            },

            space2: <SpaceProps>{ size: SizeTypeTokens.XL },
            emailCard: <CardProps>{
                bgColor: ColorTokens.White,
                borderRadius: BorderRadiusTokens.BR2,
                borderWidth: 1,
                borderColor: ColorTokens.Primary_05,
                shadow: ShadowTypeTokens.E7,
                margin: {
                  top: SizeTypeTokens.NONE,
                  bottom: SizeTypeTokens.NONE
                },
                body: {
                    widgetItems: [{ id: 'list3', type: WIDGET.LIST_ITEM }],
                },
            },
            list3: <ListItemProps>{
                customTitle: <TypographyProps>{
                    label: 'Email',
                    color: ColorTokens.Grey_Night,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '600',
                    fontSize: FontSizeTokens.SM,
                },
                customSubTitle: <TypographyProps>{
                    label: `Email us at ${emailId}`,
                    color: ColorTokens.Grey_Charcoal,
                    fontFamily: FontFamilyTokens.Inter,
                    fontWeight: '400',
                    fontSize: FontSizeTokens.XS,
                },
                isDivider: false,
                title: 'Email',
                subTitle: `Email us at ${emailId}`,
                leadIconName: IconTokens.Email,
                onPress: () => {
                    openNewTab(
                        DeepLinks.MAILTO + emailId,
                        OpenNewTabTargetType.parent,
                    )
                },
            },
        },
    }
}

export const contactUsMF: PageType<any> = {
    onLoad: async ({ openNewTab }) => {
        const url = await SharedPropsService.getURL()
        const whatsappDeepLinkDesktop = getContactNumberForWhatsapp(url)
        const callDeepLink = getContactNumberForCall(url)
        const emailId = 'support@voltmoney.in'
        return Promise.resolve(
            template(
                whatsappDeepLinkDesktop,
                callDeepLink,
                emailId,
                openNewTab,
            ),
        )
    },

    actions: {
        [ACTION.BACK_BUTTON]: goBack,
    },
    bgColor: '#FFFFFF',
}
