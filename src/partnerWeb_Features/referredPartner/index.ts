import {
    FontFamilyTokens,
    FontSizeTokens,
    InputTypeToken,
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
import {Datastore, WidgetProps} from '@voltmoney/types'
import {ACTION, SearchInputActionPayload, SortActionPayload,} from './types'
import {ROUTE} from '../../routes'
import {ReferredPartnerTableBuilder,} from '../partnerWeb_Dashboard/utils'
import {ReferredPartnerDataType,} from '../../SharedPropsService'
import {ReferredPartnerEmptyStatePageBuilder} from "../emptyState/indexReferredPartner";

export const ReferredPartnerPageBuilder = (
    referredPartnerData: ReferredPartnerDataType[],
) => {
    const DS: Datastore = {
        referredPartnerRGStack: <StackProps>{
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            type: StackType.column,
            flex: 1,
            padding: {
                left: SizeTypeTokens.XL,
                top: SizeTypeTokens.XL,
            },
            widgetItems:
                referredPartnerData?.length > 0
                    ? [
                          { id: 'referredPartnerCountText', type: WIDGET.TEXT },
                          { id: 'referredPartnerspace0', type: WIDGET.SPACE },
                          { id: 'referredPartnertopStack', type: WIDGET.STACK },
                          // { id: 'referredPartnerspace1', type: WIDGET.SPACE },
                          // { id: 'noDataMessageAC', type: WIDGET.MESSAGE},
                          { id: 'referredPartnerspace2', type: WIDGET.SPACE },
                          { id: 'referredPartnerTableStack', type: WIDGET.STACK },
                          // { id: 'referredPartnerTable', type: WIDGET.TABLE },
                      ]
                    : [{ id: 'emptyStateStack_ReferredPartner', type: WIDGET.STACK }],
        },
        ...ReferredPartnerEmptyStatePageBuilder(),
        referredPartnerCountText: <TypographyProps>{
            label: `${
                referredPartnerData?.length ? referredPartnerData?.length : 0
            } Referred partners`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.LG,
            fontWeight: '600',
            lineHeight: 26,
        },
        referredPartnerTableStack: <StackProps> {
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            widgetItems : [
                { id: 'referredPartnerTableStack1', type:WIDGET.STACK },
                { id: 'referredPartnerTableStack2', type:WIDGET.STACK },
            ]
        },
        referredPartnerTableStack1: <StackProps> {
            // width: StackWidth.MATCH_PARENT,
            // height: StackHeight.MATCH_PARENT,
            flex: 1,
            widgetItems: [
                { id: 'referredPartnerTable', type: WIDGET.TABLE },
            ]
        },
        referredPartnerTableStack2: <StackProps> {
            flex: 1,
        },
        referredPartnerTable: <TableProps & WidgetProps>{
            numOfCol: referredPartnerData ? referredPartnerData?.length : 0,
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            titleMap: {
                ...ReferredPartnerTableBuilder(referredPartnerData).Title_MAP,
            },
            titleConfig: {
                ...ReferredPartnerTableBuilder(referredPartnerData)
                    .TITLE_CONFIG,
            },
            // data: {
            //     name: [{id: 'name1', type: WIDGET.TEXT}, {id: 'name2', type: WIDGET.TEXT}, {id: 'name3', type: WIDGET.TEXT}],
            //     pan: [{id: 'pan1', type: WIDGET.TEXT}, {id: 'pan2', type: WIDGET.TEXT}, {id: 'pan3', type: WIDGET.TEXT}],
            //     mobile: [{id: 'mobile1', type: WIDGET.TEXT}, {id: 'mobile2', type: WIDGET.TEXT}, {id: 'mobile3', type: WIDGET.TEXT}],
            //     email: [{id: 'email1', type: WIDGET.TEXT}, {id: 'email2', type: WIDGET.TEXT}, {id: 'email3', type: WIDGET.TEXT}],
            //  }
            widgetData: {
                ...ReferredPartnerTableBuilder(referredPartnerData).DATA,
            },
            data: referredPartnerData,
            sortAction: {
                type: ACTION.ON_SORT_RP,
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
        ...ReferredPartnerTableBuilder(referredPartnerData).DATA_STORE,
        referredPartnertopStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                { id: 'referredPartnerSearchStackLeft', type: WIDGET.STACK },
                { id: 'referredPartnerSearchStackRight', type: WIDGET.STACK },
            ],
        },
        referredPartnerSearchStackLeft: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 1,
            widgetItems: [
                { id: 'referredPartnerSeachInput', type: WIDGET.INPUT },
            ],
        },
        referredPartnerSearchStackRight: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 3,
            widgetItems: [],
        },
        referredPartnerSeachInput: <TextInputProps & WidgetProps>{
            title: 'Search',
            value: '',
            placeholder: 'Search partners',
            type: InputTypeToken.DEFAULT,
            action: {
                type: ACTION.ON_SEARCH_RP,
                routeId: ROUTE.PARTNER_DASHBOARD,
                payload: <SearchInputActionPayload>{
                    value: '',
                    widgetId: 'referredPartnerSeachInput',
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
        referredPartnerspace0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        referredPartnerspace1: <SpaceProps>{ size: SizeTypeTokens.LG },
        referredPartnerspace2: <SpaceProps>{ size: SizeTypeTokens.LG },
    }
    return DS
}
