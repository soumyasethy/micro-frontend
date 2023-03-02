import SharedPropsService, {PartnerLeadsListType, PartnerLeadsType} from "../../SharedPropsService";
import {ActionFunction} from "@voltmoney/types";
import {
    rebuildActiveCustomerTable,
    searchObject,
    sideBarNavigate,
    sortPartnerObjectByProperty
} from "../partnerWeb_Dashboard/utils";

let PartnerActiveCustomerDataOriginal: PartnerLeadsListType = {
    customerMetadataList: [],
    nextToken: null,
};
let PartnerActiveCustomerData: PartnerLeadsType[] = [];
let tableSearchString_AC = '';
let ascOrder = true;

export const onSearchActiveCustomer: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilites ,
): Promise<any> => {
    console.warn('**** onSearchActiveCustomer Action Triggered ****', action)
    tableSearchString_AC = action.payload.value
    PartnerActiveCustomerData =
        PartnerActiveCustomerDataOriginal?.customerMetadataList.filter(data => {
            console.log('filter Data: ', data)
            if (
                searchObject(data, tableSearchString_AC) &&
                searchObject(data, tableSearchString_AC).length > 0
            ) {
                return true
            } else {
                return false
            }
        })
    console.log('mockDATA: ', PartnerActiveCustomerData)
    await rebuildActiveCustomerTable(standardUtilites, PartnerActiveCustomerData, action);
}

export const onSortActiveCustomer: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilites
): Promise<any> => {
    console.warn('**** onSortActiveCustomer Action Triggered ****', action);
    PartnerActiveCustomerData = sortPartnerObjectByProperty (
        PartnerActiveCustomerData,
        action.payload.value,
        ascOrder,
    )
    ascOrder = !ascOrder;
    await rebuildActiveCustomerTable(standardUtilites, PartnerActiveCustomerData, action);
}

export const onLoadActiveCustomer: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore },
): Promise<any> => {
    console.warn('**** onLoadActiveCustomer Action Triggered ****', action);
    PartnerActiveCustomerData = {
        ...(await SharedPropsService.getPartnerActiveCustomerList()),
    }?.customerMetadataList
    PartnerActiveCustomerDataOriginal = {
        ...(await SharedPropsService.getPartnerActiveCustomerList()),
    }
}

export const onChangeTab: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities
): Promise<any> => {
    console.warn('**** onChangeTabAC Action Triggered ****', action);
    // await navigate(action.payload.routeId);
    await sideBarNavigate(standardUtilities, action);
}