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
    BottomTabProps,
    BottomTabStateToken,
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    CardProps,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconAlignmentTokens,
    IconSizeTokens,
    IconTokens,
    ShadowTypeTokens,
    SizeTypeTokens,
    SpaceProps,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import { ROUTE } from '../../../routes'
import {
    ACTION,
    EnhanceLimitPayload,
    manageLimitPayload,
    NavPayload,
} from './types'
import { enhanceLimit, getURL, goBack, navigation } from './actions'
import SharedPropsService from '../../../SharedPropsService'
import { api } from '../../../configs/api'
import { CreditApplicationType, getAppHeader } from '../../../configs/config'

export const template: (
    creditStatus: string,
    isAllowed: boolean,
) => TemplateSchema = (creditStatus, isAllowed) => {
    return {
        layout: <Layout>{
            id: ROUTE.MANAGE_LIMIT,
            type: LAYOUTS.LIST,
            widgets: [
                {
                    id: 'headerStack',
                    type: WIDGET.HEADER,
                    position: POSITION.ABSOLUTE_TOP,
                },
                { id: 'headSpace', type: WIDGET.SPACE },
                { id: 'title', type: WIDGET.TEXT },
                { id: 'titleSpace', type: WIDGET.SPACE },
                { id: 'subTitle', type: WIDGET.TEXT },
                { id: 'subTitleSpace', type: WIDGET.SPACE },
                { id: 'continue', type: WIDGET.BUTTON },
                ...(isAllowed
                    ? [
                          { id: 'spaceAfterContinue', type: WIDGET.SPACE },
                          { id: 'enhanceLimitCTA', type: WIDGET.BUTTON },
                          { id: 'spaceAfterEnhanceLimit', type: WIDGET.SPACE },
                          { id: 'marginCallCTA', type: WIDGET.BUTTON },
                      ]
                    : []),
                {
                    id: 'cardNav',
                    type: WIDGET.CARD,
                    position: POSITION.STICKY_BOTTOM,
                    padding: {
                        bottom: 0,
                        left: 0,
                        right: 0,
                    },
                },
            ],
        },
        datastore: <Datastore>{
            headerStack: <HeaderProps>{
                title: 'Manage Limit',
                leadIcon: 'https://reactnative.dev/img/tiny_logo.png',
                isBackButton: false,
                type: HeaderTypeTokens.DEFAULT,
            },
            headSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
            title: <TypographyProps>{
                label: 'Get holding statement Pdf',
                fontSize: FontSizeTokens.MD,
                lineHeight: 24,
                color: ColorTokens.Grey_Night,
                fontFamily: FontFamilyTokens.Poppins,
                fontWeight: '700',
            },

            titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
            subTitle: <TypographyProps>{
                label: 'This pdf will be send to your email address',
                fontSize: FontSizeTokens.SM,
                lineHeight: 24,
                color: ColorTokens.Grey_Charcoal,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: '400',
            },

            subTitleSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
            // input: <TextInputProps & WidgetProps>{
            //     type: InputTypeToken.CALENDAR,
            //     state: InputStateToken.DEFAULT,
            //     placeholder: "From",
            //     title: "",
            //     caption: { success: "", error: "" },
            //     keyboardType: KeyboardTypeToken.numberPad,
            //     action: {
            //         type: ACTION.EMAIL,
            //         //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
            //         routeId: ROUTE.TRANSACTIONS,
            //     },
            // },
            inputSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
            // toInput: <TextInputProps & WidgetProps>{
            //     type: InputTypeToken.CALENDAR,
            //     state: InputStateToken.DEFAULT,
            //     placeholder: "To",
            //     title: "",
            //     caption: { success: "", error: "" },
            //     keyboardType: KeyboardTypeToken.numberPad,
            //     action: {
            //         type: ACTION.EMAIL,
            //         //payload: <PhoneNumberPayload>{ value: "", widgetId: "input" },
            //         routeId: ROUTE.TRANSACTIONS,
            //     },
            // },
            toInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXL },
            continue: <ButtonProps & WidgetProps>{
                label: 'Email holding statement',
                labelColor:
                    creditStatus === 'PENDING_DISBURSAL_APPROVAL'
                        ? ColorTokens.Grey_Charcoal
                        : ColorTokens.White,
                fontFamily: FontFamilyTokens.Poppins,
                type:
                    creditStatus === 'PENDING_DISBURSAL_APPROVAL'
                        ? ButtonTypeTokens.LargeOutline
                        : ButtonTypeTokens.LargeFilled,
                width: ButtonWidthTypeToken.FULL,
                action: {
                    type: ACTION.EMAIL,
                    payload: <manageLimitPayload>{
                        value: '',
                        widgetId: 'continue',
                        isResend: false,
                    },
                    routeId: ROUTE.MANAGE_LIMIT,
                },
            },
            spaceAfterContinue: <SpaceProps>{ size: SizeTypeTokens.Size32 },
            enhanceLimitCTA: <ButtonProps & WidgetProps>{
                label: 'Enhance your limit',
                labelColor: ColorTokens.White,
                fontFamily: FontFamilyTokens.Poppins,
                type: ButtonTypeTokens.LargeFilled,
                width: ButtonWidthTypeToken.FULL,
                action: {
                    type: ACTION.ENHANCE_LIMIT,
                    payload: <EnhanceLimitPayload>{
                        applicationType:
                            CreditApplicationType.CREDIT_MODIFICATION_AGAINST_SECURITIES,
                    },
                    routeId: ROUTE.MANAGE_LIMIT,
                },
            },
            spaceAfterEnhanceLimit: <SpaceProps>{ size: SizeTypeTokens.Size32 },
            marginCallCTA: <ButtonProps & WidgetProps>{
                label: 'Margin call',
                labelColor: ColorTokens.White,
                fontFamily: FontFamilyTokens.Poppins,
                type: ButtonTypeTokens.LargeFilled,
                width: ButtonWidthTypeToken.FULL,
                action: {
                    type: ACTION.ENHANCE_LIMIT,
                    payload: <EnhanceLimitPayload>{
                        applicationType:
                            CreditApplicationType.CREDIT_MODIFICATION_MARGIN_CALL_AGAINST_SECURITIES,
                    },
                    routeId: ROUTE.MANAGE_LIMIT,
                },
            },
            cardNav: <CardProps>{
                shadow: ShadowTypeTokens.E6,
                padding: {
                    top: SizeTypeTokens.Size10,
                    bottom: SizeTypeTokens.MD,
                },
                bgColor: ColorTokens.White,
                body: {
                    widgetItems: [
                        {
                            id: 'bottomNav',
                            type: WIDGET.BOTTOMTAB,
                        },
                    ],
                },
            },
            bottomNav: <BottomTabProps>{
                action: {
                    type: ACTION.NAVIGATION,
                    payload: <NavPayload>{
                        // value: 'dashboard',
                    },
                    routeId: ROUTE.MANAGE_LIMIT,
                },
                data: [
                    {
                        id: '1',
                        title: 'My Account',
                        status: BottomTabStateToken.NOT_SELECTED,
                        icon: {
                            name: IconTokens.NOTSELCTEDCHART,
                            size: IconSizeTokens.XL,
                            align: IconAlignmentTokens.left,
                            color: ColorTokens.Primary_100,
                        },
                    },
                    {
                        id: '2',
                        title: 'Transactions',
                        status: BottomTabStateToken.NOT_SELECTED,
                        icon: {
                            name: IconTokens.RuppeFile,
                            size: IconSizeTokens.XL,
                            align: IconAlignmentTokens.left,
                        },
                    },
                    {
                        id: '3',
                        title: 'Manage Limit',
                        status: BottomTabStateToken.SELECTED,
                        icon: {
                            name: IconTokens.ManageLimitSelected,
                            size: IconSizeTokens.XL,
                            align: IconAlignmentTokens.left,
                        },
                    },
                    // {
                    //   id: "4",
                    //   title: "Refer & Earn",
                    //   status: BottomTabStateToken.NOT_SELECTED,
                    //   icon: {
                    //     name: IconTokens.GiftOutline,
                    //     size: IconSizeTokens.XL,
                    //     align: IconAlignmentTokens.left,
                    //   },
                    // },
                ],
            },
        },
    }
}

export const manageLimitMF: PageType<any> = {
    onLoad: async () => {
        const creditStatus = await SharedPropsService.getCreditStatus()
        const user = await SharedPropsService.getUser()
        const requestOptions = {
            method: 'GET',
            headers: await getAppHeader(),
        }

        let response = await fetch(
            `${api.isLimitModificationAllowed}${user.linkedBorrowerAccounts[0].accountHolderPAN}`,
            requestOptions,
        ).then(response => response.json())

        return Promise.resolve(template(creditStatus, response.isAllowed))
    },
    actions: {
        [ACTION.EMAIL]: getURL,
        [ACTION.NAVIGATION]: navigation,
        [ACTION.MENU]: goBack,
        [ACTION.ENHANCE_LIMIT]: enhanceLimit,
        [ACTION.MARGIN_CALL]: enhanceLimit,
    },
}
