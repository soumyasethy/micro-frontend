import {
    Action, OpenNewTabTargetType,
    StandardUtilities,
    WidgetItem,
    WidgetProps,
} from '@voltmoney/types'
import {
    BorderRadiusTokens,
    ColorTokens,
    FontFamilyTokens,
    FontSizeTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    RadioProps,
    RenderWidgetGroupProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    TableProps,
    TitleWidthType,
    TypographyProps,
    WIDGET,
} from '@voltmoney/schema'
import {
    PartnerLeadsType,
    ReferredPartnerDataType,
} from '../../SharedPropsService'
import { ACTION, SelectActionPayload } from './types'
import { ROUTE } from '../../routes'
import {PartnerLink, stepIdToNameMap} from '../../configs/constants'
import { addCommasToNumber, addYearToEpochTime } from '../../configs/utils'

export type TableDataType = {
    // name: WidgetItem[],
    // pan: WidgetItem[],
    // mobile: WidgetItem[],
    // email: WidgetItem[],
    // selectMap: WidgetItem[]
    name: WidgetItem[]
    phoneNumber: WidgetItem[]
    totalPortfolioAmount: WidgetItem[]
    approvedCreditAmount: WidgetItem[]
    currentStepName: WidgetItem[]
    createdOn: WidgetItem[]
    lastUpdatedOn: WidgetItem[]
}

export type ActiveCustomerTableDataType = {
    // name: WidgetItem[],
    // pan: WidgetItem[],
    // mobile: WidgetItem[],
    // email: WidgetItem[],
    selectMap: WidgetItem[]
    name: WidgetItem[]
    panNumber: WidgetItem[]
    phoneNumber: WidgetItem[]
    emailId: WidgetItem[]
    currentStepId: WidgetItem[]
    createdOn: WidgetItem[]
}

export const TableDataBuilder = (mockDATA: PartnerLeadsType[]) => {
    const DATA: TableDataType = {
        // selectMap: [],
        name: [],
        phoneNumber: [],
        totalPortfolioAmount: [],
        approvedCreditAmount: [],
        currentStepName: [],
        createdOn: [],
        lastUpdatedOn: [],
    }
    const Title_MAP = {
        // selectMap: '',
        name: 'Name',
        panNumber: 'PAN',
        phoneNumber: 'Mobile',
        emailId: 'Email',
        currentStepName: 'Application status',
        createdOn: 'Created on',
    }
    let DATA_STORE = {}
    const TITLE_CONFIG: { [keys in string]: TitleWidthType } = {
        // selectMap: {
        //     title: '',
        //     flex: 1,
        //     cellMaxWidth: 48,
        // },
        name: {
            title: 'Name',
            flex: 3,
            cellMinWidth: 144,
        },
        phoneNumber: {
            title: 'Phone number',
            flex: 3,
            cellMinWidth: 112,
        },
        totalPortfolioAmount: {
            title: 'Portfolio fetched (in Rs.)',
            flex: 3,
            cellMinWidth: 100,
        },
        approvedCreditAmount: {
            title: 'Available credit limit (in Rs.)',
            flex: 3,
            cellMinWidth: 100,
        },
        currentStepName: {
            title: 'Application status',
            flex: 3,
            cellMinWidth: 120,
        },
        createdOn: {
            title: 'Created on',
            flex: 2,
            cellMinWidth: 96,
        },
        lastUpdatedOn: {
            title: 'Last updated',
            flex: 2,
            cellMinWidth: 96,
        },
    }
    console.log('*** mockDATA ***: ', mockDATA)

    const TABLE_DATA = []

    mockDATA.forEach((item, index_i) => {
        let tableObject = {}
        tableObject = {
            name: item?.borrowerAccountProfile.name
                ? item?.borrowerAccountProfile.name
                : '',
            phoneNumber: item?.borrowerAccountProfile?.phoneNumber
                ? item?.borrowerAccountProfile?.phoneNumber
                : '',
            totalPortfolioAmount: item?.assetDetails.totalPortfolioAmount | 0,
            approvedCreditAmount: item?.assetDetails.approvedCreditAmount | 0,
            currentStepName: item.currentStepName ? item.currentStepName : '',
            createdOn: item?.creditApplication.lastUpdatedOn,
            lastUpdatedOn: item?.creditApplication.lastUpdatedOn,
        }
        TABLE_DATA.push(tableObject)
        Object.keys(DATA).forEach((fieldName, index_j) => {
            if (fieldName === 'selectMap') {
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.RADIO,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <RadioProps & WidgetProps>{
                        isChecked: false,
                        size: IconSizeTokens.MD,
                        actionChecked: {
                            type: ACTION.ON_SELECT,
                            routeId: ROUTE.PARTNER_LEAD,
                            payload: <SelectActionPayload>{ data: item },
                        },
                        actionUnChecked: {
                            type: ACTION.ON_SELECT,
                            routeId: ROUTE.PARTNER_LEAD,
                            payload: <SelectActionPayload>{ data: item },
                        },
                    },
                }
            } else if (fieldName === 'currentStepName') {
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.STACK,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <StackProps>{
                        type: StackType.row,
                        // bgColor: ColorTokens.Grey_Chalk,
                        // justifyContent: StackJustifyContent.flexStart,
                        // alignItems: StackAlignItems.center,
                        borderConfig: {
                            borderRadius: BorderRadiusTokens.BR1,
                        },
                        // padding: {
                        //     vertical: SizeTypeTokens.MD,
                        //     left: SizeTypeTokens.MD,
                        // },
                        widgetItems: [
                            // { id: `icon_${fieldName}_${index_i}`, type: WIDGET.ICON },
                            // { id: `leads_status_space_${fieldName}_${index_i}`, type: WIDGET.SPACE },
                            {
                                id: `statusTitle_${fieldName}_${index_i}`,
                                type: WIDGET.TEXT,
                            },
                        ],
                    },
                    // [`leads_status_space_${fieldName}_${index_i}`]: <SpaceProps>{
                    //     size: SizeTypeTokens.MD
                    // },
                    // [`icon_${fieldName}_${index_i}`]:<IconProps> {
                    //     name: IconTokens.Dot,
                    //     label: IconTokens.Dot,
                    //     size: IconSizeTokens.XXL
                    // },
                    [`statusTitle_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (
                fieldName === 'totalPortfolioAmount' ||
                fieldName === 'approvedCreditAmount'
            ) {
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.STACK,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <StackProps>{
                        type: StackType.row,
                        justifyContent: StackJustifyContent.flexEnd,
                        alignItems: StackAlignItems.center,
                        widgetItems: [
                            {
                                id: `amountLeads_${fieldName}_${index_i}`,
                                type: WIDGET.TEXT,
                            },
                        ],
                    },
                    [`amountLeads_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${addCommasToNumber(tableObject[fieldName])}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'createdOn') {
                const { date, month, year } = convertISODate(
                    tableObject[fieldName],
                )
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${date} ${month.slice(0, 3)}, ${year}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'lastUpdatedOn') {
                const { date, month, year } = convertISODate(
                    tableObject[fieldName],
                )
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${date} ${month.slice(0, 3)}, ${year}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'phoneNumber') {
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`.slice(3),
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else {
                DATA[fieldName].push({
                    id: `${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            }
        })
    })
    return { Title_MAP, DATA, DATA_STORE, TITLE_CONFIG, TABLE_DATA }
}

export type ActiveTableDataType = {
    // selectMap: WidgetItem[],
    name: WidgetItem[]
    phoneNumber: WidgetItem[]
    totalValueOfAssetsPledged: WidgetItem[]
    approvedCreditAmount: WidgetItem[]
    principalOutStandingAmount: WidgetItem[]
    overUtilizationAmount: WidgetItem[]
    renewalDate: WidgetItem[]
}

export const ActiveCustomerTableBuilder = (mockDATA: PartnerLeadsType[]) => {
    const DATA: ActiveTableDataType = {
        // selectMap: [],
        name: [],
        phoneNumber: [],
        totalValueOfAssetsPledged: [],
        approvedCreditAmount: [],
        principalOutStandingAmount: [],
        overUtilizationAmount: [],
        renewalDate: [],
    }
    const Title_MAP = {
        // selectMap: '',
        name: 'Name',
        totalPortfolioAmount: 'Portfolio Amount',
        approvedCreditAmount: 'Sanction Limit',
        // needs to be make a extra field for this
        limitIncreaseAvailable: 'Limit Increase Available',
        // should be default zero
        principalOutStandingAmount: 'Withdrawn amount',
        availableCreditAmount: 'Available amount for disbursement',

        createdOn: 'Contract Start Date',
        expiresOn: 'Contract End Date',
    }
    const TITLE_CONFIG = {
        // selectMap: {
        //     title: '',
        //     flex: 1,
        //     cellMaxWidth: 48,
        // },
        name: {
            title: 'Name',
            flex: 2,
            cellMinWidth: 144,
        },
        // needs to be make a extra field for this
        phoneNumber: {
            title: 'Phone Number',
            flex: 2,
            cellMinWidth: 112,
        },
        // should be default zero
        totalValueOfAssetsPledged: {
            title: 'Portfolio pledged (in Rs.)',
            flex: 2,
            cellMinWidth: 80,
        },
        approvedCreditAmount: {
            title: 'Total credit limit (in Rs.)',
            flex: 2,
            cellMinWidth: 80,
        },
        principalOutStandingAmount: {
            title: 'Withdrawn amount (in Rs.)',
            flex: 2,
            cellMinWidth: 80,
        },
        overUtilizationAmount: {
            title: 'Overutilization amount',
            flex: 2,
            cellMinWidth: 80,
        },
        renewalDate: {
            title: 'Contract End Date',
            flex: 1,
            cellMinWidth: 96,
        },
    }
    let DATA_STORE = {}
    console.log('*** mockDATA ***: ', mockDATA)
    const TABLE_DATA = []
    mockDATA.forEach((item, index_i) => {
        let tableObject = {}
        tableObject = {
            name: item?.borrowerAccountProfile?.name
                ? item?.borrowerAccountProfile?.name
                : '',
            phoneNumber: item?.borrowerAccountProfile?.phoneNumber,
            totalValueOfAssetsPledged:
                item?.credit?.totalValueOfAssetsPledged | 0,
            approvedCreditAmount: item?.credit?.approvedCreditAmount | 0,
            principalOutStandingAmount:
                item?.credit?.principalOutStandingAmount | 0,
            overUtilizationAmount:
                Math.min(item?.credit?.availableCreditAmount, 0) | 0,
            renewalDate: item?.credit.renewalDate,
        }
        console.log('table Object: ', tableObject)
        TABLE_DATA.push(tableObject)
        Object.keys(DATA).forEach((fieldName, index_j) => {
            if (fieldName === 'selectMap') {
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.RADIO,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <RadioProps & WidgetProps>{
                        isChecked: false,
                        size: IconSizeTokens.MD,
                        actionChecked: {
                            type: ACTION.ON_SELECT_AC,
                            routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            payload: <SelectActionPayload>{ data: item },
                        },
                        actionUnChecked: {
                            type: ACTION.ON_SELECT_AC,
                            routeId: ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            payload: <SelectActionPayload>{ data: item },
                        },
                    },
                }
            } else if (
                fieldName === 'totalValueOfAssetsPledged' ||
                fieldName === 'approvedCreditAmount' ||
                fieldName === 'principalOutStandingAmount' ||
                fieldName === 'overUtilizationAmount'
            ) {
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.STACK,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <StackProps>{
                        type: StackType.row,
                        justifyContent: StackJustifyContent.flexEnd,
                        alignItems: StackAlignItems.center,
                        widgetItems: [
                            {
                                id: `AC_AmountStack_${fieldName}_${index_i}`,
                                type: WIDGET.TEXT,
                            },
                        ],
                    },
                    [`AC_AmountStack_${fieldName}_${index_i}`]: <
                        TypographyProps
                    >{
                        label: `${addCommasToNumber(tableObject[fieldName])}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'createdOn') {
                const { date, month, year } = convertISODate(
                    tableObject[fieldName],
                )
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${date} ${month.slice(0, 3)}, ${year}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'renewalDate') {
                const { date, month, year } = convertISODate(tableObject[fieldName])
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${date} ${month.slice(0, 3)}, ${year}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else if (fieldName === 'phoneNumber') {
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`.slice(3),
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            }  else {
                DATA[fieldName].push({
                    id: `AC_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`AC_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            }
        })
    })
    return { Title_MAP, DATA, DATA_STORE, TITLE_CONFIG, TABLE_DATA }
}

export type ReferredPartnerTableDataType = {
    // selectMap: WidgetItem[],
    partnerName: WidgetItem[]
    accountHolderPhoneNumber: WidgetItem[]
}

export const ReferredPartnerTableBuilder = (
    mockDATA: ReferredPartnerDataType[],
) => {
    const DATA: ReferredPartnerTableDataType = {
        // selectMap: [],
        partnerName: [],
        accountHolderPhoneNumber: [],
    }
    const Title_MAP = {
        // selectMap: '',
        partnerName: 'Name',
        accountHolderPhoneNumber: 'Portfolio Amount',
    }
    const TITLE_CONFIG = {
        // selectMap: {
        //     title: '',
        //     flex: 1,
        //     cellMaxWidth: 48,
        // },
        partnerName: {
            title: 'Name',
            flex: 2,
            cellMinWidth: 144,
            cellMaxWidth: 200,
        },
        accountHolderPhoneNumber: {
            title: 'Phone Number',
            flex: 2,
            cellMinWidth: 112,
            cellMaxWidth: 200,
        },
    }
    let DATA_STORE = {}
    console.log('*** mockDATA ***: ', mockDATA)
    const TABLE_DATA = []
    mockDATA.forEach((item, index_i) => {
        let tableObject = {}
        tableObject = {
            partnerName: item?.partnerName ? item?.partnerName : '',
            accountHolderPhoneNumber: item?.accountHolderPhoneNumber
                ? item?.accountHolderPhoneNumber
                : '',
        }
        console.log('table Object: ', tableObject)
        TABLE_DATA.push(tableObject)
        Object.keys(DATA).forEach((fieldName, index_j) => {
            if(fieldName === 'accountHolderPhoneNumber') {
                DATA[fieldName].push({
                    id: `RP_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`RP_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`.slice(3),
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            } else {
                DATA[fieldName].push({
                    id: `RP_${fieldName}_${index_i}`,
                    type: WIDGET.TEXT,
                })
                DATA_STORE = {
                    ...DATA_STORE,
                    [`RP_${fieldName}_${index_i}`]: <TypographyProps>{
                        label: `${tableObject[fieldName]}`,
                        fontSize: FontSizeTokens.XS,
                        fontWeight: '400',
                        fontFamily: FontFamilyTokens.Inter,
                        color: ColorTokens.Grey_Night,
                        lineHeight: 18,
                    },
                }
            }

        })
    })
    return { Title_MAP, DATA, DATA_STORE, TITLE_CONFIG, TABLE_DATA }
}

/**
 @description function to search string value in object property
 **/
export const searchObject = (obj: object, searchString: string) => {
    const results = []
    obj &&
        Object.keys(obj).forEach((key, index) => {
            const value = obj[key]
            // Check if the value is an object and recursively search it
            if (typeof value === 'object') {
                results.push(...searchObject(value, searchString))
            }
            // If the value is a string and contains the search string, add it to the results array
            if (
                checkIfFieldIsValid(key) &&
                typeof value === 'string' &&
                value.toLowerCase().includes(searchString.toLowerCase())
            ) {
                results.push(value)
            }
        })
    return results
}

export const convertISODate = (timeString: string | number) => {
    // timeString = "2023-02-28T10:30:52.119Z";
    const dateObj = new Date(timeString)
    const date = dateObj.toLocaleDateString('en-US', { day: 'numeric' })
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' })
    const year = dateObj.toLocaleDateString('en-US', { year: 'numeric' })
    return { date, month, year }
}

export const sortPartnerObjectByProperty = (
    objects: PartnerLeadsType[],
    propertyName,
    asc: boolean,
) => {
    return objects.sort(function (a, b) {
        if (
            propertyName === 'createdOn' ||
            propertyName === 'applicationState' ||
            propertyName === 'lastUpdatedOn'
        ) {
            if (
                a?.creditApplication[propertyName] <
                b?.creditApplication[propertyName]
            ) {
                return asc ? -1 : 1
            } else {
                return asc ? 1 : -1
            }
        } else if (propertyName === 'phoneNumber' || propertyName === 'name') {
            if (
                a?.borrowerAccountProfile[propertyName] <
                b?.borrowerAccountProfile[propertyName]
            ) {
                return asc ? -1 : 1
            } else {
                return asc ? 1 : -1
            }
        } else if (
            propertyName === 'totalPortfolioAmount' ||
            propertyName === 'approvedCreditAmount'
        ) {
            if (a?.assetDetails[propertyName] < b?.assetDetails[propertyName]) {
                return asc ? -1 : 1
            } else {
                return asc ? 1 : -1
            }
        } else if (
            propertyName === 'totalValueOfAssetsPledged' ||
            propertyName === 'approvedCreditAmount' ||
            propertyName === 'principalOutStandingAmount' ||
            propertyName === 'overUtilizationAmount' ||
            propertyName === 'renewalDate'
        ) {
            if (a?.credit[propertyName] < b?.credit[propertyName]) {
                return asc ? -1 : 1
            } else {
                return asc ? 1 : -1
            }
        }
        return 0
    })
}

export const sortReferredPartnerObjectByProperty = (
    objects: ReferredPartnerDataType[],
    propertyName,
    asc: boolean,
) => {
    return objects.sort(function (a, b) {
        if (
            propertyName === 'partnerName' ||
            propertyName === 'accountHolderPhoneNumber'
        ) {
            if (a?.partnerName < b?.partnerName) {
                return asc ? -1 : 1
            } else {
                return asc ? 1 : -1
            }
        }
    })}

// export const sortActiveCustomerObjectsByProperty = (
//     objects: PartnerLeadsType[],
//     propertyName,
//     asc: boolean,
// ) => {
//     return objects.sort(function (a, b) {
//         if (
//             propertyName === 'totalValueOfAssetsPledged' ||
//             propertyName === 'approvedCreditAmount' ||
//             propertyName === 'principalOutStandingAmount' ||
//             propertyName === 'overUtilizationAmount' ||
//             propertyName === 'renewalDate'
//         ) {
//             if (
//                 a?.credit[propertyName] <
//                 b?.credit[propertyName]
//             ) {
//                 return asc ? -1 : 1
//             } else {
//                 return asc ? 1 : -1
//             }
//         } else if (
//             propertyName === 'phoneNumber' ||
//             propertyName === 'name'
//         ) {
//             if (
//                 a?.borrowerAccountProfile[propertyName] <
//                 b?.borrowerAccountProfile[propertyName]
//             ) {
//                 return asc ? -1 : 1
//             } else {
//                 return asc ? 1 : -1
//             }
//         }
//         return 0;
//     });
// }

export const rebuildLeadsTable = async (
    StandardUtilities,
    PartnerLeadsData: PartnerLeadsType[],
    action: Action<any>,
) => {
    await StandardUtilities.setDatastore(action.routeId, 'leadTable', <
        TableProps
    >{
        widgetData: { ...TableDataBuilder(PartnerLeadsData).DATA },
        data: PartnerLeadsData,
    })
    const TITLE_CONFIG = TableDataBuilder(PartnerLeadsData).DATA
    const TABLE_DATA = TableDataBuilder(PartnerLeadsData).TABLE_DATA
    if (PartnerLeadsData && PartnerLeadsData.length > 0) {
        PartnerLeadsData.map((item, index_i) => {
            TITLE_CONFIG &&
                Object.keys(TITLE_CONFIG).forEach((fieldName, index_j) => {
                    if (fieldName === 'currentStepName') {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `${fieldName}_${index_i}`,
                            <StackProps>{
                                widgetItems: [
                                    {
                                        id: `statusTitle_${fieldName}_${index_i}`,
                                        type: WIDGET.TEXT,
                                    },
                                ],
                            },
                        )
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `statusTitle_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${
                                        TABLE_DATA[index_i][fieldName]
                                }`,
                            },
                        )
                    } else if (
                        fieldName === 'totalPortfolioAmount' ||
                        fieldName === 'approvedCreditAmount'
                    ) {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `${fieldName}_${index_i}`,
                            <StackProps>{
                                widgetItems: [
                                    {
                                        id: `amountLeads_${fieldName}_${index_i}`,
                                        type: WIDGET.TEXT,
                                    },
                                ],
                            },
                        )
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `amountLeads_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${addCommasToNumber(
                                    TABLE_DATA[index_i][fieldName],
                                )}`,
                            },
                        )
                    }else if (
                        fieldName === 'phoneNumber'
                    ) {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`.slice(3),
                            },
                        )
                    } else if (
                        fieldName === 'createdOn' ||
                        fieldName === 'lastUpdatedOn'
                    ) {
                        const { date, month, year } = convertISODate(
                            TABLE_DATA[index_i][fieldName],
                        )
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${date} ${month.slice(0, 3)}, ${year}`,
                            },
                        )
                    } else {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_LEAD,
                            `${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`,
                            },
                        )
                    }
                })
        })
    }
    // if (PartnerLeadsData && PartnerLeadsData.length > 0) {
    //     PartnerLeadsData.map((item, index_i) => {
    //         const borrowerAccountProfile = item?.borrowerAccountProfile
    //         Object.keys(borrowerAccountProfile).map((fieldName, indexY) => {
    //             console.log(
    //                 `${fieldName}_${index_i}: `,
    //                 `${borrowerAccountProfile[fieldName]}`,
    //             )
    //             StandardUtilities.setDatastore(
    //                 ROUTE.PARTNER_DASHBOARD,
    //                 `${fieldName}_${index_i}`,
    //                 <TypographyProps>{
    //                     label: `${borrowerAccountProfile[fieldName]}`,
    //                 },
    //             )
    //         })
    //     })
    // }

    // await StandardUtilities.setDatastore(
    //     ROUTE.PARTNER_LEAD,
    //     'renderWidgetGroup',
    //     <RenderWidgetGroupProps>{
    //         extraProps: { PartnerLeadsData },
    //     },
    // )
}

export const rebuildReferredPartnerTable = async (
    StandardUtilities,
    ReferredPartnerData: ReferredPartnerDataType[],
    action: Action<any>,
) => {
    await StandardUtilities.setDatastore(
        ROUTE.PARTNER_REFERRED_PARTNER,
        'referredPartnerTable',
        <TableProps>{
            widgetData: {
                ...ReferredPartnerTableBuilder(ReferredPartnerData).DATA,
            },
            data: ReferredPartnerData,
        },
    )
    const TITLE_CONFIG = ReferredPartnerTableBuilder(ReferredPartnerData).DATA
    const TABLE_DATA =
        ReferredPartnerTableBuilder(ReferredPartnerData).TABLE_DATA
    if (ReferredPartnerData && ReferredPartnerData.length > 0) {
        ReferredPartnerData.map((item, index_i) => {
            TITLE_CONFIG &&
                Object.keys(TITLE_CONFIG).forEach((fieldName, index_j) => {
                    if(fieldName === 'accountHolderPhoneNumber') {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_REFERRED_PARTNER,
                            `RP_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`.slice(3),
                            },
                        )
                    } else {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_REFERRED_PARTNER,
                            `RP_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`,
                            },
                        )
                    }

                })
        })
    }
    // await StandardUtilities.setDatastore(
    //     ROUTE.PARTNER_REFERRED_PARTNER,
    //     'renderWidgetGroup',
    //     <RenderWidgetGroupProps>{
    //         extraProps: { ReferredPartnerData },
    //     },
    // )
}

export const rebuildActiveCustomerTable = async (
    StandardUtilities,
    PartnerActiveCustomerData: PartnerLeadsType[],
    action: Action<any>,
) => {
    await StandardUtilities.setDatastore(
        ROUTE.PARTNER_ACTIVE_CUSTOMER,
        'activeCustomerTable',
        <TableProps>{
            widgetData: {
                ...ActiveCustomerTableBuilder(PartnerActiveCustomerData).DATA,
            },
            data: PartnerActiveCustomerData,
        },
    )
    const TITLE_CONFIG = ActiveCustomerTableBuilder(
        PartnerActiveCustomerData,
    ).DATA
    const TABLE_DATA = ActiveCustomerTableBuilder(
        PartnerActiveCustomerData,
    ).TABLE_DATA
    if (PartnerActiveCustomerData && PartnerActiveCustomerData.length > 0) {
        PartnerActiveCustomerData.map((item, index_i) => {
            TITLE_CONFIG &&
                Object.keys(TITLE_CONFIG).forEach((fieldName, index_j) => {
                    if (
                        fieldName === 'totalValueOfAssetsPledged' ||
                        fieldName === 'approvedCreditAmount' ||
                        fieldName === 'principalOutStandingAmount' ||
                        fieldName === 'overUtilizationAmount'
                    ) {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            `AC_AmountStack_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${addCommasToNumber(
                                    TABLE_DATA[index_i][fieldName],
                                )}`,
                            },
                        )
                    } else if (fieldName === 'createdOn') {
                        const { date, month, year } = convertISODate(
                            TABLE_DATA[index_i][fieldName],
                        )
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            `AC_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${date} ${month.slice(0, 3)}, ${year}`,
                            },
                        )
                    } else if (fieldName === 'renewalDate') {
                        const { date, month, year } = convertISODate(
                            addYearToEpochTime(
                                TABLE_DATA[index_i][fieldName],
                                1,
                            ),
                        )
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            `AC_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${date} ${month.slice(0, 3)}, ${year}`,
                            },
                        )
                    } else if (fieldName === 'phoneNumber') {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            `AC_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`.slice(3),
                            },
                        )
                    } else {
                        StandardUtilities.setDatastore(
                            ROUTE.PARTNER_ACTIVE_CUSTOMER,
                            `AC_${fieldName}_${index_i}`,
                            <TypographyProps>{
                                label: `${TABLE_DATA[index_i][fieldName]}`,
                            },
                        )
                    }
                })
        })
    }
    // await StandardUtilities.setDatastore(
    //     ROUTE.PARTNER_DASHBOARD,
    //     'renderWidgetGroup',
    //     <RenderWidgetGroupProps>{
    //         extraProps: { PartnerActiveCustomerData },
    //     },
    // )
}

export const checkIfFieldIsValid = (
    key: string,
    titleConfig?: { [keys in string]: TitleWidthType },
) => {
    if (
        key === 'name' ||
        key === 'phoneNumber' ||
        key === 'partnerName' ||
        key === 'accountHolderPhoneNumber'
        // key === 'totalPortfolioAmount' ||
        // key === 'approvedCreditAmount' ||
        // key === 'currentStepId' ||
        // key === 'createdOn' ||
        // key === 'lastUpdatedOn' ||
        // key === 'totalValueOfAssetsPledged' ||
        // key === 'approvedCreditAmount' ||
        // key === 'principalOutStandingAmount' ||
        // key === 'renewalDate'
    ) {
        return true
    }
    return false
}

export const sideBarNavigate = async (standardUtilities: StandardUtilities, action: Action<any>) => {
    if(action.payload.routeId === 'dashboardLegacy') {
        await standardUtilities.openNewTab(`${PartnerLink}dashboard`, OpenNewTabTargetType.self);
    } else {
        await standardUtilities.navigate(action.payload.routeId);
    }
}