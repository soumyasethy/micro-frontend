import {
    BorderRadiusTokens,
    ButtonProps,
    ButtonTypeTokens,
    CalendarProps,
    CalendarStateToken,
    ColorTokens,
    DropDownInputProps,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    InputTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackHeight,
    StackJustifyContent,
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
    DropDownPayload,
    SearchInputActionPayload,
    SortActionPayload,
} from '../partnerWeb_Dashboard/types'
import { ROUTE } from '../../routes'
import { TableDataBuilder } from '../partnerWeb_Dashboard/utils'
import { PartnerLeadsListType } from '../../SharedPropsService'
import { stepIdToNameMap } from '../../configs/constants'
import { EmptyStatePageBuilder } from '../emptyState'

// const qualificationInputData = [
//     { label: "Others", value: EDUCATION.OTHERS },
// ]
const qualificationInputData = Object.keys(stepIdToNameMap).map(
    (value, index) => {
        return {
            label: stepIdToNameMap[value],
            value: value,
        }
    },
)

export const LeadPageBuilder = (partnerListData: PartnerLeadsListType) => {
    const DS: Datastore = {
        leadPageRootStack: <StackProps>{
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            type: StackType.column,
            flex: 1,
            padding: {
                top: SizeTypeTokens.XL,
                left: SizeTypeTokens.XL,
            },
            widgetItems:
                partnerListData?.customerMetadataList?.length > 0
                    ? [
                          { id: 'leadCountText', type: WIDGET.TEXT },
                          { id: 'leadspace0', type: WIDGET.SPACE },
                          { id: 'topStack', type: WIDGET.STACK },
                          // { id: 'leadspace3', type: WIDGET.SPACE },
                          // { id: 'leadFilterStack', type: WIDGET.STACK },
                          // { id: 'leadDateFilterStack', type: WIDGET.STACK },
                          // { id: 'noDataMessageLeads', type: WIDGET.MESSAGE},
                          { id: 'leadspace1', type: WIDGET.SPACE },
                          { id: 'leadTable', type: WIDGET.TABLE },
                      ]
                    : [{ id: 'emptyStateStack', type: WIDGET.STACK }],
        },
        ...EmptyStatePageBuilder(),
        leadCountText: <TypographyProps>{
            label: `${
                partnerListData?.customerMetadataList.length
                    ? partnerListData?.customerMetadataList.length
                    : 0
            } Leads`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.LG,
            fontWeight: '600',
            lineHeight: 26,
        },
        leadTable: <TableProps>{
            numOfCol: partnerListData?.customerMetadataList
                ? partnerListData?.customerMetadataList.length
                : 0,
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            titleMap: {
                ...TableDataBuilder(partnerListData?.customerMetadataList)
                    .Title_MAP,
            },
            // data: {
            //     name: [{id: 'name1', type: WIDGET.TEXT}, {id: 'name2', type: WIDGET.TEXT}, {id: 'name3', type: WIDGET.TEXT}],
            //     pan: [{id: 'pan1', type: WIDGET.TEXT}, {id: 'pan2', type: WIDGET.TEXT}, {id: 'pan3', type: WIDGET.TEXT}],
            //     mobile: [{id: 'mobile1', type: WIDGET.TEXT}, {id: 'mobile2', type: WIDGET.TEXT}, {id: 'mobile3', type: WIDGET.TEXT}],
            //     email: [{id: 'email1', type: WIDGET.TEXT}, {id: 'email2', type: WIDGET.TEXT}, {id: 'email3', type: WIDGET.TEXT}],
            //  }
            titleConfig: {
                ...TableDataBuilder(partnerListData?.customerMetadataList)
                    .TITLE_CONFIG,
            },
            widgetData: {
                ...TableDataBuilder(partnerListData?.customerMetadataList).DATA,
            },
            data: partnerListData?.customerMetadataList,
            sortAction: {
                type: ACTION.ON_SORT,
                routeId: ROUTE.PARTNER_DASHBOARD,
                payload: <SortActionPayload>{
                    value: '',
                },
            },
            // selected: true,
            // allSelectedAction: {
            //     type: ACTION.ON_SELECT_ALL_LEADS,
            //     routeId: ROUTE.PARTNER_DASHBOARD,
            //     payload: {},
            // },
        },
        ...TableDataBuilder(partnerListData?.customerMetadataList).DATA_STORE,
        topStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            widgetItems: [
                { id: 'searchStackLeft', type: WIDGET.STACK },
                { id: 'searchStackRight', type: WIDGET.STACK },
            ],
        },
        searchStackLeft: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 1,
            widgetItems: [{ id: 'leadSeachInput', type: WIDGET.INPUT }],
        },
        searchStackRight: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            flex: 3,
            widgetItems: [],
        },
        leadSeachInput: <TextInputProps & WidgetProps>{
            title: 'Search',
            value: '',
            placeholder: 'Search leads',
            type: InputTypeToken.DEFAULT,
            action: {
                type: ACTION.ON_SEARCH_LEADS,
                routeId: ROUTE.PARTNER_DASHBOARD,
                payload: <SearchInputActionPayload>{
                    value: '',
                    widgetId: 'leadSeachInput',
                },
            },
        },
        leadFilterStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.MATCH_PARENT,
            bgColor: ColorTokens.Grey_Milk,
            borderConfig: {
                borderRadius: BorderRadiusTokens.BR2,
            },
            padding: {
                top: SizeTypeTokens.XL,
                bottom: SizeTypeTokens.XL,
                horizontal: SizeTypeTokens.XL,
            },
            widgetItems: [
                {
                    id: 'applicationStatusFilterInput',
                    type: WIDGET.DROPDOWN_INPUT,
                },
            ],
        },
        leadDateFilterStack: <StackProps>{
            type: StackType.column,
            width: StackWidth.MATCH_PARENT,
            bgColor: ColorTokens.Grey_Milk,
            borderConfig: {
                borderRadius: BorderRadiusTokens.BR2,
            },
            padding: {
                top: SizeTypeTokens.XL,
                bottom: SizeTypeTokens.XL,
                horizontal: SizeTypeTokens.XL,
            },
            widgetItems: [
                { id: 'leadDate1', type: WIDGET.CALENDAR_PICKER },
                { id: 'leadDate2', type: WIDGET.CALENDAR_PICKER },
                { id: 'dateFilterBtn', type: WIDGET.BUTTON },
            ],
        },
        applicationStatusFilterInput: <DropDownInputProps & WidgetProps>{
            label: 'Filter by Application Status',
            data: qualificationInputData,
            action: {
                type: ACTION.ON_FILTER_LEADS_BY_STATUS,
                payload: <DropDownPayload>{
                    value: null,
                    widgetID: 'applicationStatusFilterInput',
                },
                routeId: ROUTE.PARTNER_DASHBOARD,
            },
        },
        leadDate1: <CalendarProps & WidgetProps>{
            year: { title: 'Year', value: '', placeholder: 'YYYY' },
            month: { title: 'Month', value: '', placeholder: 'MM' },
            date: { title: 'Date', value: '', placeholder: 'DD' },
            state: CalendarStateToken.DEFAULT,
            // caption: {
            //     success: "",
            //     error: "Age should be between 18 and 65",
            //     default: "Date of birth as per PAN",
            // },
            action: {
                type: ACTION.VALIDATE_FORM_1,
                payload: <SearchInputActionPayload>{
                    value: '',
                    widgetId: 'calendarPicker',
                },
                routeId: ROUTE.PARTNER_DASHBOARD,
            },
        },
        leadDate2: <CalendarProps & WidgetProps>{
            year: { title: 'Year', value: '', placeholder: 'YYYY' },
            month: { title: 'Month', value: '', placeholder: 'MM' },
            date: { title: 'Date', value: '', placeholder: 'DD' },
            state: CalendarStateToken.DEFAULT,
            // caption: {
            //     success: "",
            //     error: "Age should be between 18 and 65",
            //     default: "Date of birth as per PAN",
            // },
            action: {
                type: ACTION.VALIDATE_FORM_2,
                payload: <SearchInputActionPayload>{
                    value: '',
                    widgetId: 'calendarPicker',
                },
                routeId: ROUTE.PARTNER_DASHBOARD,
            },
        },
        dateFilterBtn: <ButtonProps & WidgetProps>{
            label: 'Search by date',
            type: ButtonTypeTokens.LargeFilled,
            action: {
                type: ACTION.FILTER_BY_DATE,
                payload: {},
                routeId: ROUTE.PARTNER_DASHBOARD,
            },
        },
        // noDataMessageLeads: <MessageProps>{
        //     label: 'Sorry, but nothing match your search term',
        //     icon: <IconProps>{
        //         name: IconTokens.Info,
        //         size: IconSizeTokens.SM,
        //         color: ColorTokens.Grey_Charcoal,
        //     },
        //     labelColor: ColorTokens.Grey_Charcoal,
        //     bgColor: ColorTokens.Grey_Milk_1,
        // },
        leadspace0: <SpaceProps>{ size: SizeTypeTokens.XXXL },
        leadspace1: <SpaceProps>{ size: SizeTypeTokens.LG },
        leadspace3: <SpaceProps>{ size: SizeTypeTokens.XL },
    }
    return DS
}
