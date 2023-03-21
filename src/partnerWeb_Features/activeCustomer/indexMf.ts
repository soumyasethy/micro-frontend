import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
    FontFamilyTokens,
    FontSizeTokens,
    InputTypeToken,
    SizeTypeTokens,
    SpaceProps,
    StackHeight,
    StackProps,
    StackType,
    StackWidth, TableProps, TextInputProps,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../routes";
import {ACTION} from "./types";
import {
    onSearchActiveCustomer,
    onSortActiveCustomer,
    onLoadActiveCustomer, onChangeTab
} from "./actions";
import {SideBarBuilderDS} from "../sideNavBar";
import sharedPropsService from "../../SharedPropsService";
import SharedPropsService, {PartnerActiveCustomerListType} from "../../SharedPropsService";
import {partnerApi} from "../../configs/api";
import {getAppHeader} from "../../configs/config";
import {CreditApplicationState, PARTNER_CACHE_EXPIRE_TIME} from "../../configs/constants";
import {ActiveCustomerEmptyStatePageBuilder} from "../emptyState/indexActiveCustomer";
import {ActiveCustomerTableBuilder} from "../partnerWeb_Dashboard/utils";
import {SearchInputActionPayload, SortActionPayload} from "./types";
import {addMinutesToCurrentTimeStamp} from "../../configs/utils";

export const template: (
    partnerActiveCustomerData: PartnerActiveCustomerListType,
) => Promise<TemplateSchema> = async (
    partnerActiveCustomerData,
) => ({
    layout: <Layout>{
        id: ROUTE.PARTNER_ACTIVE_CUSTOMER,
        type: LAYOUTS.LIST,
        widgets: [
            {id: 'sideNav', type: WIDGET.STACK, position: POSITION.NAVBAR_LEFT},
            {id: 'activeCustomerPageRootStack', type: WIDGET.STACK},
        ],
    },
    datastore: <Datastore>{
        ...await SideBarBuilderDS(ROUTE.PARTNER_ACTIVE_CUSTOMER),
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
                partnerActiveCustomerData?.customerMetadataList.length > 0
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
                partnerActiveCustomerData?.customerMetadataList.length
                    ? partnerActiveCustomerData?.customerMetadataList.length
                    : 0
            } active customers`,
            fontFamily: FontFamilyTokens.Poppins,
            fontSize: FontSizeTokens.LG,
            fontWeight: '600',
            lineHeight: 26,
        },
        activeCustomerTable: <TableProps & WidgetProps>{
            numOfCol: partnerActiveCustomerData?.customerMetadataList
                ? partnerActiveCustomerData?.customerMetadataList.length
                : 0,
            width: StackWidth.MATCH_PARENT,
            height: StackHeight.MATCH_PARENT,
            titleMap: {
                ...ActiveCustomerTableBuilder(
                    partnerActiveCustomerData?.customerMetadataList,
                ).Title_MAP,
            },
            titleConfig: {
                ...ActiveCustomerTableBuilder(
                    partnerActiveCustomerData?.customerMetadataList,
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
                    partnerActiveCustomerData?.customerMetadataList,
                ).DATA,
            },
            data: partnerActiveCustomerData?.customerMetadataList,
            sortAction: {
                type: ACTION.ON_SORT_AC,
                routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER,
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
        ...ActiveCustomerTableBuilder(partnerActiveCustomerData?.customerMetadataList)
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
                routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER,
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
});

export const PartnerActiveCustomerMF: PageType<any> = {
    onLoad: async ({asyncStorage, network, ...props }, {
        setIsUserLoggedIn: boolean,
    }) => {
        // --- Need refactor ---- //
        const user = JSON.parse(localStorage.getItem('USER_CONTEXT'));
        const token = localStorage.getItem('ACCESS_TOKEN');
        const dashboardActiveId = localStorage.getItem('DASHBOARD_ACTIVE_ID');
        await SharedPropsService.setToken(token);
        await sharedPropsService.setUser(user);
        const partnerAccountId = user?.linkedPartnerAccounts[0].accountId;
        const authToken = await SharedPropsService.getToken();
        await sharedPropsService.setPartnerSideBarActiveId(dashboardActiveId);
        // ---- //
        console.log('api: ', partnerApi.customer);
        console.log('auth token: ', authToken);

        let partnerActiveCustomerData: PartnerActiveCustomerListType = {
            customerMetadataList: [],
            nextToken: null
        }
        const currentTimeStamp = Date.now().valueOf();
        const cacheExpireTime = await sharedPropsService.getPartnerCacheExpireTime();
        const partnerActiveCustomerDataSharedPropsService = await sharedPropsService.getPartnerActiveCustomerList();

        //if cache data is empty then call from network
        if (
            partnerActiveCustomerDataSharedPropsService.customerMetadataList.length === 0 ||
            currentTimeStamp > cacheExpireTime.ActiveCustomerCacheExpireTime
        ) {
            const response = await network.get(
                `${partnerApi.clientList}${partnerAccountId}/customers/all`,
                {
                    headers: await getAppHeader(),
                }
            );
            if(response.status === 200) {
                partnerActiveCustomerData['customerMetadataList'] = response?.data?.customerMetadataList.filter((item, index)=>{
                    if(item?.creditApplication?.applicationState === CreditApplicationState.COMPLETED) {
                        return true;
                    }
                    return false;
                });
                await sharedPropsService.setPartnerActiveCustomerList(partnerActiveCustomerData);
                await sharedPropsService.setPartnerCacheExpireTime({...cacheExpireTime, ActiveCustomerCacheExpireTime: addMinutesToCurrentTimeStamp(PARTNER_CACHE_EXPIRE_TIME)})
            } else {
                console.log("partnerApi.clientList call failed");
            }
        } else {
            partnerActiveCustomerData = await sharedPropsService.getPartnerActiveCustomerList();
        }

        const activeWidgetID = await SharedPropsService.getPartnerSideBarActiveId();
        console.log("activeWidgetID: ", activeWidgetID);
        return Promise.resolve(template(
            partnerActiveCustomerData,
        ));
    },
    actions: {
        [ACTION.ON_SEARCH_AC]: onSearchActiveCustomer,
        [ACTION.ON_LOAD]: onLoadActiveCustomer,
        [ACTION.ON_SORT_AC]: onSortActiveCustomer,
        [ACTION.CHANGE_TAB]: onChangeTab
    },
    action: {
        routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER,
        type: ACTION.ON_LOAD,
        payload: {

        }
    },
};
