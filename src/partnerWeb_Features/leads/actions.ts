import {ActionFunction} from "@voltmoney/types";
import SharedPropsService, {PartnerLeadsListType, PartnerLeadsType} from "../../SharedPropsService";
import {
    rebuildLeadsTable,
    searchObject,
    sideBarNavigate,
    sortPartnerObjectByProperty
} from "../partnerWeb_Dashboard/utils";
import {ColorTokens, IconProps, TypographyProps} from "@voltmoney/schema";
import {ROUTE} from "../../routes";

let PartnerLeadsData: PartnerLeadsType[] = []
let PartnerLeadsDataOriginal: PartnerLeadsListType = {
    customerMetadataList: [],
    nextToken: null,
}
let tableSearchString = ''
let ascOrder = true;

export const onLoadLeadsAction: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn('**** onLoadLeadsAction Action Triggered ****', action)
    PartnerLeadsData = { ...(await SharedPropsService.getPartnerLeadsList()) }
        ?.customerMetadataList
    PartnerLeadsDataOriginal = {
        ...(await SharedPropsService.getPartnerLeadsList()),
    }
    // ON Change tab
    // await setDatastore(ROUTE.PARTNER_LEAD, 'leadsStackText', <
    //     TypographyProps
    //     >{ fontWeight: '600', color: ColorTokens.Primary_100 })
    // await setDatastore(ROUTE.PARTNER_LEAD, 'leadsStackIcon', <IconProps>{
    //     color: ColorTokens.Primary_100,
    // })
    //     // reset other tabs
    // await setDatastore(ROUTE.PARTNER_LEAD, 'activeCustomerText', <
    //     TypographyProps
    //     >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
    // await setDatastore(ROUTE.PARTNER_LEAD, 'activeCustomerIcon', <
    //     IconProps
    //     >{ color: ColorTokens.Grey_Charcoal })
    //
    // await setDatastore(ROUTE.PARTNER_LEAD, 'referredPartnerStackText', <
    //     TypographyProps
    //     >{ fontWeight: '400', color: ColorTokens.Grey_Charcoal })
    // await setDatastore(ROUTE.PARTNER_LEAD, 'referredPartnerStackIcon', <
    //     IconProps
    //     >{ color: ColorTokens.Grey_Charcoal })
    ///
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