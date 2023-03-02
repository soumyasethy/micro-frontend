import {
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    SizeTypeTokens,
    SpaceProps,
    StackHeight,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import {Datastore, RouteMap, WidgetProps} from '@voltmoney/types'
import {ROUTE} from '../../routes'
import {ACTION} from '../partnerWeb_Dashboard/types'
import sharedPropsService from "../../SharedPropsService";

export const SideBarBuilderDS = async (
    routeId
) => {
    const DS: Datastore = {
        sideNav: <StackProps>{
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.FULL,
            type: StackType.column,
            padding: {
                left: SizeTypeTokens.XL,
                top: SizeTypeTokens.Size32,
            },
            borderConfig: {
                borderColor: ColorTokens.Grey_Milk,
                borderWidth: {
                    right: SizeTypeTokens.XS,
                },
            },
            widgetItems: [
                { id: 'dashboardStack', type: WIDGET.STACK },
                { id: 'spaceSB3', type: WIDGET.SPACE },
                { id: 'leadsStack', type: WIDGET.STACK },
                { id: 'spaceSB0', type: WIDGET.SPACE },
                { id: 'activeCustomerStack', type: WIDGET.STACK },
                { id: 'spaceSB5', type: WIDGET.SPACE },
                { id: 'referredPartnerStack', type: WIDGET.STACK },
            ],
        },
        referredPartnerStack: <StackProps & WidgetProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                // { id: 'referredPartnerStackIcon', type: WIDGET.ICON },
                // { id: 'spaceSB6', type: WIDGET.SPACE },
                { id: 'referredPartnerStackText', type: WIDGET.TEXT },
            ],
            action: {
                routeId: routeId,
                type: ACTION.CHANGE_TAB,
                payload: {
                    value: 'referredPartnerPage',
                    widgetId: 'renderWidgetGroup',
                    routeId: ROUTE.PARTNER_REFERRED_PARTNER
                },
            },
        },
        dashboardStackText: <TypographyProps>{
            label: 'Refer & earn',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: '400',
            lineHeight: 20,
            color: ColorTokens.Grey_Charcoal
        },
        dashboardStack: <StackProps & WidgetProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                // { id: 'dashBoardStackIcon', type: WIDGET.ICON },
                // { id: 'spaceSB4', type: WIDGET.SPACE },
                { id: 'dashboardStackText', type: WIDGET.TEXT },
            ],
            action: {
                routeId: routeId,
                type: ACTION.CHANGE_TAB,
                payload: {
                    value: 'dashboardLegacy',
                    widgetId: 'renderWidgetGroup',
                    routeId: 'dashboardLegacy'
                },
            },
        },
        referredPartnerStackText: <TypographyProps>{
            label: 'Referred Partners',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: (routeId === ROUTE.PARTNER_REFERRED_PARTNER) ? '600' : '400',
            lineHeight: 20,
            color: (routeId === ROUTE.PARTNER_REFERRED_PARTNER) ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal
        },
        dashBoardStackIcon: <IconProps>{
            name: IconTokens.Grid_View,
            color: ColorTokens.Grey_Charcoal,
        },
        referredPartnerStackIcon: <IconProps>{
            name: IconTokens.Grid_View,
            color: (await sharedPropsService.getPartnerSideBarActiveId() === 'referredPartnerPage') ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal,
        },
        leadsStack: <StackProps & WidgetProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                // { id: 'leadsStackIcon', type: WIDGET.ICON },
                // { id: 'spaceSB1', type: WIDGET.SPACE },
                { id: 'leadsStackText', type: WIDGET.TEXT },
            ],
            action: {
                routeId: routeId,
                type: ACTION.CHANGE_TAB,
                payload: {
                    value: 'leadPage',
                    widgetId: 'renderWidgetGroup',
                    routeId: ROUTE.PARTNER_LEAD
                },
            },
        },
        activeCustomerStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                { id: 'activeCustomerText', type: WIDGET.TEXT },
            ],
            action: {
                routeId: routeId,
                type: ACTION.CHANGE_TAB,
                payload: {
                    value: 'activeCustomerPage',
                    widgetId: 'renderWidgetGroup',
                    routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER
                },
            },
        },
        leadsStackIcon: <IconProps>{
            name: IconTokens.Leads,
            color: (await sharedPropsService.getPartnerSideBarActiveId() === 'leadPage') ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal ,
        },
        leadsStackText: <TypographyProps>{
            label: 'Leads         ',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight:(routeId === ROUTE.PARTNER_LEAD) ? '600' : '400',
            lineHeight: 20,
            color: (routeId === ROUTE.PARTNER_LEAD) ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal,
        },
        activeCustomerIcon: <IconProps>{
            name: IconTokens.Account,
            size: IconSizeTokens.LG,
            color: (await sharedPropsService.getPartnerSideBarActiveId() === 'activeCustomerPage') ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal,
        },
        activeCustomerText: <TypographyProps>{
            label: 'Active customers',
            fontFamily: FontFamilyTokens.Inter,
            fontSize: FontSizeTokens.SM,
            fontWeight: (routeId === ROUTE.PARTNER_ACTIVE_CUSTOMER) ? '600' : '400',
            lineHeight: 20,
            color: (routeId === ROUTE.PARTNER_ACTIVE_CUSTOMER) ? ColorTokens.Primary_100 : ColorTokens.Grey_Charcoal
        },
        spaceSB0: <SpaceProps>{
            size: SizeTypeTokens.XXXL,
        },
        spaceSB3: <SpaceProps>{
            size: SizeTypeTokens.XXXL,
        },
        spaceSB4: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        spaceSB5: <SpaceProps>{
            size: SizeTypeTokens.XXXL,
        },
        spaceSB6: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
    }
    return DS
}
