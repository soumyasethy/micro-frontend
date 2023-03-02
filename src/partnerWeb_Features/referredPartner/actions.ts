import {ActionFunction} from "@voltmoney/types";
import {
    rebuildReferredPartnerTable,
    searchObject, sideBarNavigate,
    sortReferredPartnerObjectByProperty
} from "../partnerWeb_Dashboard/utils";
import SharedPropsService, {ReferredPartnerDataType} from "../../SharedPropsService";

let ReferredPartnerDataOriginal: ReferredPartnerDataType[] = [];
let tableSearchString_RP = '';
let ReferredPartnerData: ReferredPartnerDataType[] = [];
let ascOrder = true;

export const onSearchReferredPartner: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities,
): Promise<any> => {
    console.warn('**** PartnerSearch Action Triggered ****', action);
    tableSearchString_RP = action.payload.value;
    console.log("ReferredPartnerDataOriginal 123: ", ReferredPartnerDataOriginal, typeof ReferredPartnerDataOriginal)
    ReferredPartnerData = ReferredPartnerDataOriginal.filter(
        data => {
            const results = searchObject(data, tableSearchString_RP);
            if (
                results &&
                results.length > 0
            ) {
                return true;
            } else {
                return false;
            }
        }
    )
    await rebuildReferredPartnerTable(standardUtilities, ReferredPartnerData, action)
}

export const onSortReferredPartner: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities,
): Promise<any> => {
    console.warn('**** Sort leads Action Triggered ****', action);
    ReferredPartnerData = sortReferredPartnerObjectByProperty (
        ReferredPartnerData,
        action.payload.value,
        ascOrder,
    )
    ascOrder = !ascOrder;
    await rebuildReferredPartnerTable(standardUtilities, ReferredPartnerData, action);
}

export const onLoadReferredPartner: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore },
): Promise<any> => {
    console.warn('**** Test Action Triggered ****', action);
    ReferredPartnerData = await SharedPropsService.getReferredPartnerData();
    ReferredPartnerDataOriginal = await SharedPropsService.getReferredPartnerData();
}

export const onChangeTab: ActionFunction<any> = async (
    action,
    _datastore,
    standardUtilities,
): Promise<any> => {
    console.warn('**** onChangeTab leads Action Triggered ****', action);
    await sideBarNavigate(standardUtilities, action);
}