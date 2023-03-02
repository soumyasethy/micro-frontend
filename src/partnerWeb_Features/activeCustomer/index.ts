import {
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputTypeToken,
    MessageProps,
    SizeTypeTokens,
    SpaceProps,
    StackHeight,
    StackProps,
    StackType,
    StackWidth,
    TableProps,
    TextInputProps,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import { Datastore, WidgetProps } from '@voltmoney/types'
import {
    ACTION,
    SearchInputActionPayload,
    SortActionPayload,
} from '../partnerWeb_Dashboard/types'
import { ROUTE } from '../../routes'
import { ActiveCustomerTableBuilder } from '../partnerWeb_Dashboard/utils'
import { PartnerActiveCustomerListType } from '../../SharedPropsService'
import { EmptyStatePageBuilder } from '../emptyState'
import {ActiveCustomerEmptyStatePageBuilder} from "../emptyState/indexActiveCustomer";

export const ActiveCustomerPageBuilder = (
    partnerListData: PartnerActiveCustomerListType,
) => {
    const DS: Datastore = {
        activeCustomerPageRootStack: <StackProps>{
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            type: StackType.column,
            flex: 1,
            padding: {
                left: SizeTypeTokens.XL,
                top: SizeTypeTokens.XL,
            },
            widgetItems:
                partnerListData?.customerMetadataList.length > 0
                    ? [
                          { id: 'activeCustomerCountText', type: WIDGET.TEXT },
                          { id: 'activeCustomerspace0', type: WIDGET.SPACE },
                          { id: 'activeCustomertopStack', type: WIDGET.STACK },
                          // { id: 'activeCustomerspace1', type: WIDGET.SPACE },
                          // { id: 'noDataMessageAC', type: WIDGET.MESSAGE},
                          { id: 'activeCustomerspace2', type: WIDGET.SPACE },
                          { id: 'activeCustomerTable', type: WIDGET.TABLE },
                      ]
                    : [{ id: 'emptyStateStack_ActiveCustomer', type: WIDGET.STACK }],
        },
        ...ActiveCustomerEmptyStatePageBuilder(),
        activeCustomerCountText: <TypographyProps>{
            label: `${
                partnerListData?.customerMetadataList.length
                    ? partnerListData?.customerMetadataList.length
                    : 0
            } active customers`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.LG,
            fontWeight: '600',
            lineHeight: 26,
        },
        activeCustomerTable: <TableProps & WidgetProps>{
            numOfCol: partnerListData?.customerMetadataList
                ? partnerListData?.customerMetadataList.length
                : 0,
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            titleMap: {
                ...ActiveCustomerTableBuilder(
                    partnerListData?.customerMetadataList,
                ).Title_MAP,
            },
            titleConfig: {
                ...ActiveCustomerTableBuilder(
                    partnerListData?.customerMetadataList,
                ).TITLE_CONFIG,
            },
            // data: {
            //     name: [{id: 'name1', type: WIDGET.TEXT}, {id: 'name2', type: WIDGET.TEXT}, {id: 'name3', type: WIDGET.TEXT}],
            //     pan: [{id: 'pan1', type: WIDGET.TEXT}, {id: 'pan2', type: WIDGET.TEXT}, {id: 'pan3', type: WIDGET.TEXT}],
            //     mobile: [{id: 'mobile1', type: WIDGET.TEXT}, {id: 'mobile2', type: WIDGET.TEXT}, {id: 'mobile3', type: WIDGET.TEXT}],
            //     email: [{id: 'email1', type: WIDGET.TEXT}, {id: 'email2', type: WIDGET.TEXT}, {id: 'email3', type: WIDGET.TEXT}],
            //  }
            widgetData: {
                ...ActiveCustomerTableBuilder(
                    partnerListData?.customerMetadataList,
                ).DATA,
            },
            data: partnerListData?.customerMetadataList,
            sortAction: {
                type: ACTION.ON_SORT_AC,
                routeId: ROUTE.PARTNER_DASHBOARD,
                payload: <SortActionPayload>{
                    value: '',
                },
            },
            // selected: true,
            // allSelectedAction: {
            //     type: ACTION.ON_SELECT_ALL_LEADS,
            //     routeId: ROUTE.PARTNER_DASHBOARD,
            //     payload: {
            //
            //     }
            // }
        },
        ...ActiveCustomerTableBuilder(partnerListData?.customerMetadataList)
            .DATA_STORE,
        activeCustomertopStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                { id: 'activeCustomerSearchStackLeft', type: WIDGET.STACK },
                { id: 'activeCustomerSearchStackRight', type: WIDGET.STACK },
            ],
        },
        activeCustomerSearchStackLeft: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 1,
            widgetItems: [
                { id: 'activeCustomerSeachInput', type: WIDGET.INPUT },
            ],
        },
        activeCustomerSearchStackRight: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 3,
            widgetItems: [],
        },
        activeCustomerSeachInput: <TextInputProps & WidgetProps>{
            title: 'Search',
            value: '',
            placeholder: 'Search customers',
            type: InputTypeToken.DEFAULT,
            action: {
                type: ACTION.ON_SEARCH_AC,
                routeId: ROUTE.PARTNER_DASHBOARD,
                payload: <SearchInputActionPayload>{
                    value: '',
                    widgetId: 'activeCustomerSeachInput',
                },
            },
        },
        // noDataMessageAC: <MessageProps>{
        //       label: 'Sorry, but nothing match your search term',
        //       icon: <IconProps>{
        //         name: IconTokens.Info,
        //         size: IconSizeTokens.SM,
        //         color: ColorTokens.Grey_Charcoal,
        //       },
        //       labelColor: ColorTokens.Grey_Charcoal,
        //       bgColor: ColorTokens.Grey_Milk_1,
        // },
        activeCustomerspace0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        activeCustomerspace1: <SpaceProps>{ size: SizeTypeTokens.LG },
        activeCustomerspace2: <SpaceProps>{ size: SizeTypeTokens.LG },
    }
    return DS
}
