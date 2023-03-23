import {ActionFunction} from "@voltmoney/types";
import SharedPropsService, {PartnerLeadsListType, PartnerLeadsType} from "../../SharedPropsService";
import {
    onTrackCustomer,
    rebuildLeadsTable,
    searchObject,
    sideBarNavigate,
    sortPartnerObjectByProperty
} from "../partnerWeb_Dashboard/utils";
import {ColorTokens, IconProps, TypographyProps} from "@voltmoney/schema";
import {ROUTE} from "../../routes";
import sharedPropsService from "../../SharedPropsService";

let PartnerLeadsData: PartnerLeadsType[] = []
let PartnerLeadsDataOriginal: PartnerLeadsListType = {
    customerMetadataList: [],
    nextToken: null,
}
let tableSearchString = ''
let ascOrder = true;
// export const itemsPerPage_Leads = 5;
// export let startIndex_Leads = 0;
// let pageCount = 0;

export const onLoadLeadsAction: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn('**** onLoadLeadsAction Action Triggered ****', action)
    PartnerLeadsData = { ...(await SharedPropsService.getPartnerLeadsList()) }
        ?.customerMetadataList
    // PartnerLeadsData = { ...(await SharedPropsService.getPartnerLeadsList()) }
    //     ?.customerMetadataList.slice(startIndex_Leads, startIndex_Leads + itemsPerPage_Leads);
    PartnerLeadsDataOriginal = {
        ...(await SharedPropsService.getPartnerLeadsList()),
    }
    //set page count
    // if( PartnerLeadsDataOriginal &&
    //     PartnerLeadsDataOriginal.customerMetadataList
    // ) {
    //     pageCount =  Math.ceil(PartnerLeadsDataOriginal.customerMetadataList.length / itemsPerPage_Leads);
    // }
}

export const onSearchLead: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities,
): Promise<any> => {
    console.warn('**** onSearchLead Action Triggered ****', action)
    tableSearchString = action.payload.value

    PartnerLeadsData = PartnerLeadsDataOriginal?.customerMetadataList.filter(
        data => {
            const results = searchObject(data, tableSearchString);
            if (
                results &&
                results.length > 0
            ) {
                return true;
            } else {
                return false;
            }
        },
    )
    await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
}

export const onSortLeads: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities,
): Promise<any> => {
    console.warn('**** onSortLeads leads Action Triggered ****', action)
    PartnerLeadsData = sortPartnerObjectByProperty (
        PartnerLeadsData,
        action.payload.value,
        ascOrder,
    );
    ascOrder = !ascOrder;
    await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
}

export const onChangeTab: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities
): Promise<any> => {
    console.warn('**** onChangeTab leads Action Triggered ****', action);
    await sideBarNavigate(standardUtilities, action);
}

export const onLoadMoreData: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities
): Promise<any> => {
    console.warn('**** onLoadMoreData leads Action Triggered ****', action);
    // if(action.payload.value === 'left') {
    //
    // } else if (action.payload.value === 'right') {
    //     if((startIndex_Leads + itemsPerPage_Leads) <= PartnerLeadsDataOriginal.customerMetadataList.length - 1) {
    //         startIndex_Leads = startIndex_Leads + itemsPerPage_Leads;
    //         PartnerLeadsData = PartnerLeadsDataOriginal.customerMetadataList.splice(startIndex_Leads, startIndex_Leads + itemsPerPage_Leads);
    //         await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
    //     } else {
    //         PartnerLeadsData = PartnerLeadsDataOriginal.customerMetadataList.slice(startIndex_Leads, PartnerLeadsDataOriginal.customerMetadataList.length-1);
    //         await rebuildLeadsTable(standardUtilities, PartnerLeadsData, action);
    //     }
    // }
}

export const onTrackCustomerJourney: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities
): Promise<any> => {
   console.warn('**** onLoadMoreData leads Action Triggered ****', action);
   await standardUtilities.navigate(ROUTE.VOLT_APP, {user: action.payload.value});
}



