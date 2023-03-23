import {Datastore, Layout, LAYOUTS, ModalAlignmentEnum, PageType, TemplateSchema, WidgetProps,} from '@voltmoney/types'
import {
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    StackAlignContent,
    StackAlignItems,
    StackJustifyContent,
    StackPositionType,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WebViewProps,
    WIDGET,
} from '@voltmoney/schema'
import {ROUTE} from '../../routes'
import {ACTION} from './types'
import {onClosePopup, onLoadAction, TestAction} from './actions'
import {heightMap} from '../../configs/height'
import {onTrackCustomer} from '../partnerWeb_Dashboard/utils'
import {PartnerLeadsType,} from '../../SharedPropsService'

const user_Id = null

export const template: (
    user: PartnerLeadsType,
) => Promise<TemplateSchema> = async user => ({
    layout: <Layout>{
        id: ROUTE.VOLT_APP,
        type: LAYOUTS.MODAL,
        style: {
            height: heightMap[ROUTE.VOLT_APP],
            alignment: ModalAlignmentEnum.RIGHT,
        },
        widgets: [
            { id: 'topStack', type: WIDGET.STACK },
            { id: 'voltAppWebView', type: WIDGET.WEB_VIEW },
        ],
    },
    datastore: <Datastore>{
        topStack: <StackProps & WidgetProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: 'closeStack', type: WIDGET.STACK },
                { id: 'viewingAsStack', type: WIDGET.STACK },
            ],
        },
        closeStack: <StackProps & WidgetProps>{
            flex: 1,
            justifyContent: StackJustifyContent.center,
            alignContent: StackAlignContent.center,
            position: StackPositionType.relative,
            positionConfig: {
              right: SizeTypeTokens.SM,
            },
            widgetItems: [{ id: 'closeIcon', type: WIDGET.ICON }],
            action: {
                routeId: ROUTE.VOLT_APP,
                type: ACTION.CLOSE_POP_UP,
                payload: {},
            },
        },
        viewingAsStack: <StackProps & WidgetProps>{
            flex: 4,
            type: StackType.row,
            justifyContent: StackJustifyContent.center,
            alignContent: StackAlignContent.center,
            widgetItems: [
                user.borrowerAccountProfile.name
                    ? { id: 'viewInAsName', type: WIDGET.TEXT }
                    : { id: 'viewInAsPhoneNumber', type: WIDGET.TEXT },
            ],
        },
        closeIcon: <IconProps>{
            name: IconTokens.Cross,
            size: IconSizeTokens.XXXL,
            color: ColorTokens.Grey_Charcoal,
        },
        viewInAsName: <TypographyProps>{
            label: `Viewing as ${user.borrowerAccountProfile.name}`,
            fontWeight: '400',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 18,
        },
        viewInAsPhoneNumber: <TypographyProps>{
            label: `Viewing as ${user.borrowerAccountProfile.phoneNumber}`,
            fontWeight: '400',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            color: ColorTokens.Grey_Charcoal,
            lineHeight: 18,
        },
        voltAppWebView: <WebViewProps>{
            iframe: true,
            uri: 'https://app.staging.voltmoney.in/plj',
        },
    },
})

export const voltAppMF: PageType<any> = {
    onLoad: async ({ asyncStorage }, { user }) => {
        onTrackCustomer(user?.borrowerAccountProfile.userId)
        return Promise.resolve(template(user))
    },
    actions: {
        [ACTION.TEST_ACTION]: TestAction,
        [ACTION.ON_LOAD]: onLoadAction,
        [ACTION.CLOSE_POP_UP]: onClosePopup,
    },
    action: {
        type: ACTION.ON_LOAD,
        routeId: ROUTE.VOLT_APP,
        payload: {
            value: user_Id,
        },
    },
}
