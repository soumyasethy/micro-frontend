import { ActionFunction, OpenNewTabTargetType } from '@voltmoney/types'
import {
    ColorTokens,
    IconProps,
    RadioProps,
    RenderWidgetGroupProps,
    TableProps,
    TypographyProps,
} from '@voltmoney/schema'
import {
    rebuildActiveCustomerTable,
    rebuildLeadsTable,
    rebuildReferredPartnerTable,
    searchObject,
    sortPartnerObjectByProperty,
    sortReferredPartnerObjectByProperty,
    TableDataBuilder,
} from './utils'
import { ROUTE } from '../../routes'
import SharedPropsService, {
    ReferredPartnerDataType,
} from '../../SharedPropsService'
import sharedPropsService, {
    PartnerLeadsListType,
    PartnerLeadsType,
} from '../../SharedPropsService'
import { ACTION } from './types'
import { convertDateToTimeStamp } from '../../configs/utils'
import { PartnerLink } from '../../configs/constants'

const PartnerLeadsDataOriginal: PartnerLeadsListType = {
    customerMetadataList: [],
    nextToken: null,
}
const PartnerActiveCustomerDataOriginal: PartnerLeadsListType = {
    customerMetadataList: [],
    nextToken: null,
}
const ReferredPartnerDataOriginal: ReferredPartnerDataType[] = []

const tableSearchString = ''
const tableSearchString_AC = ''
const tableSearchString_RP = ''

const allValueSelected = {
    value: false,
}
const PartnerLeadsData: PartnerLeadsType[] = []
const PartnerActiveCustomerData: PartnerLeadsType[] = []
const ReferredPartnerData: ReferredPartnerDataType[] = []
const searchIndex: number[] = []
const ascOrder = true
let date1 = '',
    date2 = ''

export const TestAction: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore },
): Promise<any> => {
    console.warn('**** Test Action Triggered ****', action)
    if (action.type === ACTION.VALIDATE_FORM_1) {
        date1 = action.payload.value
    }
    if (action.type === ACTION.VALIDATE_FORM_2) {
        date2 = action.payload.value
    }
}

export const onChangeTab: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore, openNewTab, navigate },
): Promise<any> => {
    console.warn('**** onChangeTab Action Triggered ****', action)
    if (action.payload.value === 'dashboardLegacy') {
        // console.log("Legacy dashboard: ", PartnerLink);
        await openNewTab(`${PartnerLink}dashboard`, OpenNewTabTargetType.self)
    } else {
        await sharedPropsService.setPartnerSideBarActiveId(action.payload.value)
        // console.log("action.payload.value: (xyz)", await sharedPropsService.getPartnerSideBarActiveId());
        if (action.payload.value === ROUTE.PARTNER_LEAD) {
            // await setDatastore(action.payload.routeId, 'leadsStackText', <
            //     TypographyProps
            // >{ fontWeight: '600', color: ColorTokens.Primary_100 })
            // await setDatastore(action.payload.routeId, 'leadsStackIcon', <IconProps>{
            //     color: ColorTokens.Primary_100,
            // })
            //
            // // reset other tabs
            // await setDatastore(action.payload.routeId, 'activeCustomerText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.payload.routeId, 'activeCustomerIcon', <
            //     IconProps
            // >{ color: ColorTokens.Grey_Charcoal })
            //
            // await setDatastore(action.payload.routeId, 'referredPartnerStackText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.payload.routeId, 'referredPartnerStackIcon', <
            //     IconProps
            // >{ color: ColorTokens.Grey_Charcoal })
            await navigate(ROUTE.PARTNER_LEAD);
        }
        if (action.payload.value === 'activeCustomerPage') {
            // await setDatastore(action.payload.routeId, 'activeCustomerText', <
            //     TypographyProps
            // >{ fontWeight: '600', color: ColorTokens.Primary_100 })
            // await setDatastore(action.payload.routeId, 'activeCustomerIcon', <
            //     IconProps
            // >{ color: ColorTokens.Primary_100 })
            //
            // // reset other tabs
            // await setDatastore(action.payload.routeId, 'leadsStackText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.payload.routeId, 'leadsStackIcon', <IconProps>{
            //     color: ColorTokens.Grey_Charcoal,
            // })
            //
            // await setDatastore(action.payload.routeId, 'referredPartnerStackText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.payload.routeId, 'referredPartnerStackIcon', <
            //     IconProps
            // >{ color: ColorTokens.Grey_Charcoal })
            await navigate(ROUTE.PARTNER_ACTIVE_CUSTOMER);
        }
        if (action.payload.value === 'referredPartnerPage') {
            // await setDatastore(action.routeId, 'referredPartnerStackText', <
            //     TypographyProps
            // >{ fontWeight: '600', color: ColorTokens.Primary_100 })
            // await setDatastore(action.routeId, 'referredPartnerStackIcon', <
            //     IconProps
            // >{ color: ColorTokens.Primary_100 })
            //
            // // reset other tabs
            // await setDatastore(action.routeId, 'activeCustomerText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.routeId, 'activeCustomerIcon', <
            //     IconProps
            // >{ color: ColorTokens.Grey_Charcoal })
            //
            // await setDatastore(action.routeId, 'leadsStackText', <
            //     TypographyProps
            // >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
            // await setDatastore(action.routeId, 'leadsStackIcon', <IconProps>{
            //     color: ColorTokens.Grey_Charcoal,
            // })
            await navigate(ROUTE.PARTNER_REFERRED_PARTNER);
        }

        // await setDatastore(action.routeId, action.payload.widgetId, <
        //     RenderWidgetGroupProps
        //     >{
        //     activeWidgetId: action.payload.value,
        // })
    }
}

// export const onSearchLead: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilities,
// ): Promise<any> => {
//     console.warn('**** Tab Action Triggered ****', action)
//     tableSearchString = action.payload.value
//
//     PartnerLeadsData = PartnerLeadsDataOriginal?.customerMetadataList.filter(
//         data => {
//             const results = searchObject(data, tableSearchString);
//             if (
//                 results &&
//                 results.length > 0
//             ) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//     )
//     console.log('mockDATA: ', PartnerLeadsData);
//     await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
// }

// export const onSelectLeads: ActionFunction<any> = async (
//     action,
//     _datastore,
//     { setDatastore },
// ): Promise<any> => {
//     console.warn('**** Select leads Action Triggered ****', action)
// }

// export const onSortLeads: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilities,
// ): Promise<any> => {
//     console.warn('**** Sort leads Action Triggered ****', action)
//     PartnerLeadsData = sortPartnerObjectByProperty (
//         PartnerLeadsData,
//         action.payload.value,
//         ascOrder,
//     );
//     ascOrder = !ascOrder;
//     await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
// }

// export const onSelectAllLeads: ActionFunction<any> = async (
//     action,
//     _datastore,
//     { setDatastore },
// ): Promise<any> => {
//     console.warn('**** Select all leads Action Triggered ****', action)
//     allValueSelected.value = action.payload.value
//     if (PartnerLeadsData && PartnerLeadsData.length > 0) {
//         if (action.payload.value) {
//             PartnerLeadsData.map(async (item, index_i) => {
//                 await setDatastore(
//                     ROUTE.PARTNER_DASHBOARD,
//                     `selectMap_${index_i}`,
//                     <RadioProps>{
//                         isChecked: true,
//                     },
//                 )
//             })
//         } else {
//             PartnerLeadsData.map(async (item, index_i) => {
//                 await setDatastore(
//                     ROUTE.PARTNER_DASHBOARD,
//                     `selectMap_${index_i}`,
//                     <RadioProps>{
//                         isChecked: false,
//                     },
//                 )
//             })
//         }
//         await setDatastore(ROUTE.PARTNER_DASHBOARD, 'renderWidgetGroup', <
//             RenderWidgetGroupProps
//         >{
//             extraProps: { allValueSelected },
//         })
//     }
// }
//
// export const onFilterLeadsByCurrentStepId: ActionFunction<any> = async (
//     action,
//     _datastore,
//     { navigate, goBack, setDatastore },
// ): Promise<any> => {
//     PartnerLeadsData = PartnerLeadsDataOriginal?.customerMetadataList?.filter(
//         (item, index) => {
//             if (
//                 item &&
//                 item?.creditApplication?.currentStepId === action.payload.value
//             ) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//     )
// }
//
// export const onLoadAction: ActionFunction<any> = async (
//     action,
//     _datastore,
//     { navigate, goBack, setDatastore },
// ): Promise<any> => {
//     // console.warn('**** Test Action Triggered ****', action)
//     // PartnerLeadsData = { ...(await SharedPropsService.getPartnerLeadsList()) }
//     //     ?.customerMetadataList
//     // PartnerLeadsDataOriginal = {
//     //     ...(await SharedPropsService.getPartnerLeadsList()),
//     // }
//     //
//     // PartnerActiveCustomerData = {
//     //     ...(await SharedPropsService.getPartnerActiveCustomerList()),
//     // }?.customerMetadataList
//     // PartnerActiveCustomerDataOriginal = {
//     //     ...(await SharedPropsService.getPartnerActiveCustomerList()),
//     // }
//     //
//     // ReferredPartnerData = await SharedPropsService.getReferredPartnerData();
//     // ReferredPartnerDataOriginal = await SharedPropsService.getReferredPartnerData();
// }
//
// export const onSearchActiveCustomer: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilites ,
// ): Promise<any> => {
//     console.warn('**** Tab Action Triggered ****', action)
//     tableSearchString_AC = action.payload.value
//     PartnerActiveCustomerData =
//         PartnerActiveCustomerDataOriginal?.customerMetadataList.filter(data => {
//             console.log('filter Data: ', data)
//             if (
//                 searchObject(data, tableSearchString_AC) &&
//                 searchObject(data, tableSearchString_AC).length > 0
//             ) {
//                 return true
//             } else {
//                 return false
//             }
//         })
//     console.log('mockDATA: ', PartnerActiveCustomerData)
//     await rebuildActiveCustomerTable(standardUtilites, PartnerActiveCustomerData, action);
// }
//
// export const onSortActiveCustomer: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilites
// ): Promise<any> => {
//     console.warn('**** Sort leads Action Triggered ****', action);
//     PartnerActiveCustomerData = sortPartnerObjectByProperty (
//         PartnerActiveCustomerData,
//         action.payload.value,
//         ascOrder,
//     )
//     ascOrder = !ascOrder;
//     await rebuildActiveCustomerTable(standardUtilites, PartnerActiveCustomerData, action);
// }
//
// export const filterbyDate: ActionFunction<any> = async (
//     action,
//     _datastore,
//     { setDatastore },
// ): Promise<any> => {
//     console.warn('**** Sort leads Action Triggered ****', action);
//     const t1 = convertDateToTimeStamp(date1);
//     const t2 = convertDateToTimeStamp(date2);
//
//     PartnerLeadsData = PartnerLeadsDataOriginal?.customerMetadataList.filter(
//         data => {
//             const time = data?.creditApplication.createdOn;
//             // console.log('filter Data: ', data?.creditApplication.createdOn);
//             // console.log('data?.creditApplication.createdOn: ', data?.creditApplication.createdOn, typeof data?.creditApplication.createdOn);
//             // console.log('time: ', data?.creditApplication.createdOn, typeof data?.creditApplication.createdOn)
//             // console.log('t1: ', t1, typeof t1);
//             // console.log('t2: ', t2, typeof t2);
//             if (
//                 data?.creditApplication.createdOn &&
//                 data?.creditApplication.createdOn >= t1 &&
//                 data?.creditApplication.createdOn <= t2
//             ) {
//                 return true;
//             } else {
//                 return false;
//             }
//         },
//     )
//     // console.log('Filtered Data by Date: ', PartnerLeadsData);
//     await setDatastore(action.routeId, 'leadTable', <TableProps>{
//         widgetData: { ...TableDataBuilder(PartnerLeadsData).DATA },
//         data: PartnerLeadsData,
//     })
//     if (PartnerLeadsData && PartnerLeadsData.length > 0) {
//         PartnerLeadsData.map((item, index_i) => {
//             const borrowerAccountProfile = item?.borrowerAccountProfile
//             Object.keys(borrowerAccountProfile).map((fieldName, indexY) => {
//                 console.log(
//                     `${fieldName}_${index_i}: `,
//                     `${borrowerAccountProfile[fieldName]}`,
//                 )
//                 setDatastore(
//                     ROUTE.PARTNER_DASHBOARD,
//                     `${fieldName}_${index_i}`,
//                     <TypographyProps>{
//                         label: `${borrowerAccountProfile[fieldName]}`,
//                     },
//                 )
//             })
//         })
//     }
//     await setDatastore(ROUTE.PARTNER_DASHBOARD, 'renderWidgetGroup', <
//         RenderWidgetGroupProps
//         >{
//         extraProps: { PartnerLeadsData },
//     })
// }
//
// export const onSearchReferredPartner: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilities,
// ): Promise<any> => {
//     console.warn('**** PartnerSearch Action Triggered ****', action);
//     tableSearchString_RP = action.payload.value;
//     console.log("ReferredPartnerDataOriginal 123: ", ReferredPartnerDataOriginal, typeof ReferredPartnerDataOriginal)
//     ReferredPartnerData = ReferredPartnerDataOriginal.filter(
//         data => {
//             const results = searchObject(data, tableSearchString_RP);
//             if (
//                 results &&
//                 results.length > 0
//             ) {
//                 return true;
//             } else {
//                 return false;
//             }
//         }
//     )
//     await rebuildReferredPartnerTable(standardUtilities, ReferredPartnerData, action)
// }
//
// export const onSortReferredPartner: ActionFunction<any> = async (
//     action,
//     _datastore,
//     standardUtilities,
// ): Promise<any> => {
//     console.warn('**** Sort leads Action Triggered ****', action);
//     ReferredPartnerData = sortReferredPartnerObjectByProperty (
//         ReferredPartnerData,
//         action.payload.value,
//         ascOrder,
//     )
//     ascOrder = !ascOrder;
//     await rebuildReferredPartnerTable(standardUtilities, ReferredPartnerData, action);
// }
