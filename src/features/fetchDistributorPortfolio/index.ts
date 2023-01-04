import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from "@voltmoney/types";
import {
    ButtonProps,
    ButtonTypeTokens,
    ButtonWidthTypeToken,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    ListItemProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperItem,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import {
    ACTION, AmountPayload, AvailableCASItem, LimitPayload, RepositoryPayload, StepResponseObject,
} from "./types";
import { horizontalDistributorStepperRepo } from "../../configs/utils";
import { goCamsNext, goKarvyNext, goNext, onBack, onSave, onShare, onSkip } from "./action";
import SharedPropsService from "../../SharedPropsService";
import { partnerApi } from "../../configs/api";
import { getAppHeader } from "../../configs/config";
import moment from "moment";
import { fetchPledgeLimitRepo } from "./repo";
import { StepStatusMap } from "../login/otp_verify/types";


export const template: (
    isDataUpdated: any,
    camsDate: string, camsAmount: Number, camsPortfolio: Number,
    karvyDate: string, karvyAmount: Number, karvyPortfolio: Number,

    // conditionDataKAMS: {},
    // conditionDataKARVY: {},
    //  camsFetches: {},
    stepper: StepperItem[],
    unlockedAmont: Number,
    stepResponseObject: StepResponseObject
) => TemplateSchema = (isDataUpdated, camsDate, camsAmount, camsPortfolio,
    karvyDate, karvyAmount, karvyPortfolio, stepper, unlockedAmont, stepResponseObject) => {
        const _generateDSCAMS =
            camsAmount
                ? {
                    operationalStickyStackCAMS: <StackProps>{
                        body: {
                            widgetItems: [
                                {
                                    id: "operationalStackCAMS",
                                    type: WIDGET.STACK,
                                },
                            ],
                        },
                    },
                }
                : {};
        const _generateDSKARVY =
            karvyAmount
                ? {
                    operationalStickyStackKARVY: <StackProps>{
                        body: {
                            widgetItems: [
                                {
                                    id: "operationalStackKARVY",
                                    type: WIDGET.STACK,
                                },
                            ],
                        },
                    },
                }
                : {};
        // console.log(isDataUpdated);
        console.log(camsAmount);
        console.log(karvyAmount);
        console.log(_generateDSCAMS);
        console.log(_generateDSKARVY);

        return {
            layout: <Layout>{
                id: ROUTE.DISTRIBUTOR_PORTFOLIO,
                type: LAYOUTS.LIST,
                widgets: [
                    {
                        id: "header",
                        type: WIDGET.HEADER,
                        position: POSITION.ABSOLUTE_TOP,
                    },
                    { id: "space0", type: WIDGET.SPACE },
                    { id: "space1", type: WIDGET.SPACE },

                    ...(`${camsAmount}` !== '0'
                        ? [
                            { id: "operationalStackCAMS", type: WIDGET.STACK }
                        ]
                        : [
                            { id: "camsStack", type: WIDGET.STACK },
                        ]),

                    { id: "midDivider", type: WIDGET.DIVIDER },
                    ...(`${karvyAmount}` !== '0' ?
                        [
                            { id: "operationalStackKARVY", type: WIDGET.STACK }
                        ] : [
                            { id: "karvyStack", type: WIDGET.STACK },
                        ]),
                    { id: "karvySpace", type: WIDGET.SPACE },
                    { id: "karvyDivider", type: WIDGET.DIVIDER },


                    {
                        id: "continue",
                        type: WIDGET.BUTTON,
                        position: POSITION.ABSOLUTE_BOTTOM,
                    },
                    { id: "btnSpace", type: WIDGET.SPACE },
                    {
                        id: "skip",
                        type: WIDGET.BUTTON,
                        position: POSITION.ABSOLUTE_BOTTOM,
                    },

                ],
            },

            datastore: <Datastore>{
                header: <HeaderProps & WidgetProps>{
                    isBackButton: true,
                    type: HeaderTypeTokens.verification,
                    leftCta: "Share",
                    trailIcon: "Share",
                    stepperProps: <StepperProps>{
                        data: stepper,
                        type: StepperTypeTokens.HORIZONTAL,
                    },
                    title: "Create new application",
                    action: {
                        type: ACTION.GO_BACK,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: {},
                    },
                    // leftAction: {
                    //     type: ACTION.SHARE,
                    //     routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                    //     payload: {},
                    // },
                },
                space0: <SpaceProps>{ size: SizeTypeTokens.SM },
                space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
                camsStack: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "textStack", type: WIDGET.STACK },
                        { id: "btnStack", type: WIDGET.STACK }
                    ],
                },
                textStack: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "textItems", type: WIDGET.TEXT },
                        { id: "textSpace", type: WIDGET.SPACE },
                        { id: "subTextItems", type: WIDGET.TEXT }
                    ],
                },
                textItems: <TypographyProps>{
                    label: "Fetch from CAMS",
                    fontSize: FontSizeTokens.MD,
                    fontWeight: '600',
                    color: ColorTokens.Grey_Night,
                    lineHeight: 24,
                    fontFamily: FontFamilyTokens.Inter
                },
                textSpace: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                subTextItems: <TypographyProps>{
                    label: "We need OTP authentication in the next screen",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                btnStack: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "btnItems", type: WIDGET.BUTTON },

                    ],
                },
                btnItems: <ButtonProps & WidgetProps>{
                    label: "Fetch",
                    type: ButtonTypeTokens.MediumSoftFilled,
                    labelColor: ColorTokens.Primary_100,
                    width: ButtonWidthTypeToken.CONTENT,
                    action: {
                        type: ACTION.GO_CAMS,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <{}>{},
                    },
                },
                midDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Milk_1,
                    margin: {
                        vertical: SizeTypeTokens.XL,
                        horizontal: SizeTypeTokens.XL,
                    },
                },
                karvyStack: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "textKarvyStack", type: WIDGET.STACK },
                        { id: "btnKarvyStack", type: WIDGET.STACK }
                    ],
                },
                textKarvyStack: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "textKarvyItems", type: WIDGET.TEXT },
                        { id: "textkarvySpace", type: WIDGET.SPACE },
                        { id: "subTextKarvyItems", type: WIDGET.TEXT }
                    ],
                },
                textKarvyItems: <TypographyProps>{
                    label: "Fetch from Karvy",
                    fontSize: FontSizeTokens.MD,
                    fontWeight: '600',
                    color: ColorTokens.Grey_Night,
                    lineHeight: 24,
                    fontFamily: FontFamilyTokens.Inter
                },
                textkarvySpace: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                subTextKarvyItems: <TypographyProps>{
                    label: "We need OTP authentication in the next screen",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                btnKarvyStack: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "btnKarvyItems", type: WIDGET.BUTTON },

                    ],
                },
                btnKarvyItems: <ButtonProps & WidgetProps>{
                    label: "Fetch",
                    type: ButtonTypeTokens.MediumSoftFilled,
                    labelColor: ColorTokens.Primary_100,
                    width: ButtonWidthTypeToken.CONTENT,
                    action: {
                        type: ACTION.GO_KARVY,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <{}>{},
                    },
                },

                karvySpace: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                karvyDivider: <DividerProps>{
                    size: DividerSizeTokens.SM,
                    color: ColorTokens.Grey_Milk_1,
                    margin: {
                        vertical: SizeTypeTokens.XL,
                        horizontal: SizeTypeTokens.XL,
                    },
                },

                ..._generateDSCAMS,
                operationalStackCAMS: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "operationalHeadCAMS", type: WIDGET.STACK },
                        { id: "operationalBtnCAMS", type: WIDGET.STACK }
                    ],
                },
                operationalHeadCAMS: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "headItemsCAMS", type: WIDGET.TEXT },
                        { id: "headSpaceCAMS", type: WIDGET.SPACE },
                        { id: "dateItemsCAMS", type: WIDGET.TEXT },
                        { id: "portfolioItemsCAMS", type: WIDGET.TEXT },
                        // { id: "totalItems", type: WIDGET.TEXT },
                        // { id: "creditLimitItems", type: WIDGET.TEXT },
                        { id: "availableLimitItemsCAMS", type: WIDGET.TEXT },
                        // { id: "limitSpace", type: WIDGET.SPACE },
                        //{ id: "viewPortfolio", type: WIDGET.STACK },
                    ],
                },
                headItemsCAMS: <TypographyProps>{
                    // label: `Fetch From ${conditionCAMSData}`,
                    label: `Fetch From CAMS`,
                    fontSize: FontSizeTokens.MD,
                    fontWeight: '600',
                    color: ColorTokens.Grey_Night,
                    lineHeight: 24,
                    fontFamily: FontFamilyTokens.Inter
                },
                headSpaceCAMS: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                dateItemsCAMS: <TypographyProps>{

                    //label: `Last fetched on ${Object.values(camsFetches)}`,
                    //label: "Last fetched on ",
                    label: "Last fetched on " + `${moment(camsDate, "MMMM D")}`.substring(0, 10),
                    //label: "Last fetched on " +`${moment(Object.values(camsFetches), "MMMM D")}`.substring(0,10),
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                portfolioItemsCAMS: <TypographyProps>{
                    label: "Portfolio Value: Rs. "+`${camsPortfolio}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                totalItemsCAMS: <TypographyProps>{
                    label: "",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                creditLimitItemsCAMS: <TypographyProps>{
                    label: "Credit limit available: Rs. 20,000",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                availableLimitItemsCAMS: <TypographyProps>{
                    label: `Available limit: Rs. ${camsAmount}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                limitSpaceCAMS: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                viewPortfolioCAMS: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "protfolioBtnItemsCAMS", type: WIDGET.TEXT },

                    ],
                    action: {
                        type: ACTION.ON_SAVE,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <{}>{},
                    },
                },
                protfolioBtnItemsCAMS: <TypographyProps>{
                    label: "View Portfolio",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '500',
                    color: ColorTokens.Primary_100,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                operationalBtnCAMS: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "operationalBtnItemsCAMS", type: WIDGET.BUTTON },

                    ],
                },
                operationalBtnItemsCAMS: <ButtonProps & WidgetProps>{
                    label: "Fetch again",
                    type: ButtonTypeTokens.MediumSoftFilled,
                    labelColor: ColorTokens.Primary_100,
                    width: ButtonWidthTypeToken.CONTENT,
                    action: {
                        type: ACTION.GO_OPERATIONAL,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <RepositoryPayload>{
                            value:"CAMS"
                            //value:`${Object.keys(camsFetches)}`
                        },
                    },
                },


                ..._generateDSKARVY,
                operationalStackKARVY: <StackProps>{
                    type: StackType.row,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "operationalHeadKARVY", type: WIDGET.STACK },
                        { id: "operationalBtnKARVY", type: WIDGET.STACK }
                    ],
                },
                operationalHeadKARVY: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "headItemsKARVY", type: WIDGET.TEXT },
                        { id: "headSpaceKARVY", type: WIDGET.SPACE },
                        { id: "dateItemsKARVY", type: WIDGET.TEXT },
                        { id: "portfolioItemsKARVY", type: WIDGET.TEXT },
                        // { id: "totalItems", type: WIDGET.TEXT },
                        // { id: "creditLimitItems", type: WIDGET.TEXT },
                        { id: "availableLimitItemsKARVY", type: WIDGET.TEXT },
                        // { id: "limitSpace", type: WIDGET.SPACE },
                        //{ id: "viewPortfolio", type: WIDGET.STACK },
                    ],
                },
                headItemsKARVY: <TypographyProps>{
                    // label: `Fetch From ${conditionCAMSData}`,
                    label: `Fetch From KARVY`,
                    fontSize: FontSizeTokens.MD,
                    fontWeight: '600',
                    color: ColorTokens.Grey_Night,
                    lineHeight: 24,
                    fontFamily: FontFamilyTokens.Inter
                },
                headSpaceKARVY: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                dateItemsKARVY: <TypographyProps>{

                    //label: `Last fetched on ${Object.values(camsFetches)}`,
                    //label: "Last fetched on ",
                      label: "Last fetched on " + `${moment(karvyDate, "MMMM D")}`.substring(0, 10),
                    //label: "Last fetched on " +`${moment(Object.values(camsFetches), "MMMM D")}`.substring(0,10),
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                portfolioItemsKARVY: <TypographyProps>{
                    label: "Portfolio Value: Rs. "+`${karvyPortfolio}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                totalItemsKARVY: <TypographyProps>{
                    label: "",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                creditLimitItemsKARVY: <TypographyProps>{
                    label: "Credit limit available: Rs. 20,000",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                availableLimitItemsKARVY: <TypographyProps>{
                    label: `Available limit: Rs. ${karvyAmount}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                limitSpaceKARVY: <SpaceProps>{
                    size: SizeTypeTokens.SM
                },
                viewPortfolioKARVY: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexStart,
                    justifyContent: StackJustifyContent.flexStart,
                    widgetItems: [
                        { id: "protfolioBtnItemsKARVY", type: WIDGET.TEXT },

                    ],
                    action: {
                        type: ACTION.ON_SAVE,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <{}>{},
                    },
                },
                protfolioBtnItemsKARVY: <TypographyProps>{
                    label: "View Portfolio",
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '500',
                    color: ColorTokens.Primary_100,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                operationalBtnKARVY: <StackProps>{
                    type: StackType.column,
                    alignItems: StackAlignItems.flexEnd,
                    justifyContent: StackJustifyContent.flexEnd,
                    widgetItems: [
                        { id: "operationalBtnItemsKARVY", type: WIDGET.BUTTON },

                    ],
                },
                operationalBtnItemsKARVY: <ButtonProps & WidgetProps>{
                    label: "Fetch again",
                    type: ButtonTypeTokens.MediumSoftFilled,
                    labelColor: ColorTokens.Primary_100,
                    width: ButtonWidthTypeToken.CONTENT,
                    action: {
                        type: ACTION.GO_OPERATIONAL,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <RepositoryPayload>{
                        //    value:`${Object.keys(camsFetches)}`
                        value:"KARVY"
                        },
                    },
                },

                continue: <ButtonProps & WidgetProps>{
                    label: "Save & Continue",
                   // type: ButtonTypeTokens.LargeFilled,
                     type: `${camsAmount}` || `${karvyAmount}` ? ButtonTypeTokens.LargeFilled : ButtonTypeTokens.LargeOutline,
                   // labelColor: ColorTokens.Grey_Charcoal,
                    width: ButtonWidthTypeToken.FULL,
                    action: {
                        type: ACTION.ON_SAVE,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <LimitPayload>{
                            value: stepResponseObject
                        },
                        // payload: <AmountPayload>{
                        //     value:`${unlockedAmont}`
                        // },
                    },
                },
                btnSpace: <SpaceProps>{
                    size: SizeTypeTokens.MD
                },
                skip: <ButtonProps & WidgetProps>{
                    label: "Skip for now",
                    type: ButtonTypeTokens.LargeGhost,
                    width: ButtonWidthTypeToken.FULL,
                    action: {
                        type: ACTION.ON_SKIP,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <{}>{},
                    },
                },
            },
        }
    };

export const distributorPortfolioMF: PageType<any> = {
    onLoad: async ({ network }, { }) => {
        /* For testing purpose 
            const applictaionId ="bd2c1f9d-356c-40c1-b4b9-fad351fbd992";
            let camsFetches = {
                "KARVY": 1671781866
            }
            let isDataUpdated = "Data Exist";
         */
        const pledgeLimitResponse = await fetchPledgeLimitRepo().then(
            (response) => ({
              data: response,
            })
          );
        // const pledgeLimitResponse = {
        //     "errorMessage": null,
        //     "status": "SUCCESS",
        //     "updatedApplicationObj": {
        //         "applicationId": "6f4d2224-9c06-41ae-81ae-9aceb96137d3",
        //         "accountId": "94802dd0-48f7-45fc-ac32-860f5e6379af",
        //         "applicationType": "CREDIT_AGAINST_SECURITIES_BORROWER",
        //         "applicationState": "IN_PROGRESS",
        //         "applicationApprovalStatus": "APPROVED",
        //         "creditAmount": null,
        //         "lenderAccountId": "Bajaj",
        //         "partnerAccountId": "test",
        //         "platformAccountId": "90f48862-d7d1-47b2-aa3e-76613da4a3f6",
        //         "currentStepId": "MANDATE_SETUP",
        //         "stepStatusMap": {
        //             "KYC_SUMMARY": "COMPLETED",
        //             "KYC_AADHAAR_VERIFICATION": "SKIPPED",
        //             "MF_FETCH_PORTFOLIO": "COMPLETED",
        //             "KYC_CKYC": "COMPLETED",
        //             "KYC_ADDITIONAL_DETAILS": "COMPLETED",
        //             "CREDIT_APPROVAL": "COMPLETED",
        //             "KYC_PHOTO_VERIFICATION": "COMPLETED",
        //             "MANDATE_SETUP": "NOT_STARTED",
        //             "KYC_PAN_VERIFICATION": "COMPLETED",
        //             "MF_PLEDGE_PORTFOLIO": "COMPLETED",
        //             "AGREEMENT_SIGN": "IN_PROGRESS",
        //             "KYC_DOCUMENT_UPLOAD": "SKIPPED",
        //             "BANK_ACCOUNT_VERIFICATION": "COMPLETED"
        //         },
        //         "createdOn": 1671876150766,
        //         "lastUpdatedOn": 1672726581841,
        //         "completedOn": null
        //     },
        //     "stepResponseObject": {
        //         "applicationId": "6f4d2224-9c06-41ae-81ae-9aceb96137d3",
        //         "totalPortfolioAmount": 872800,
        //         "availableCreditAmount": 392600,
        //         "requestedCreditAmount": 0,
        //         "approvedCreditAmount": 392600,
        //         "processingFees": 999,
        //         "processingFeesBreakUp": {
        //             "Processing Fee": 999
        //         },
        //         "interestRate": 9.5,
        //         "loanTenureInMonths": 12,
        //         "isinLTVMap": {
        //             "INF846K01859": 0.45,
        //             "INF769K01010": 0.45,
        //             "INF843K01047": 0.45,
        //             "INF251K01894": 0.45
        //         },
        //         "isinNAVMap": {
        //             "INF846K01859": 66.63,
        //             "INF769K01010": 80.542,
        //             "INF843K01047": 53.981,
        //             "INF251K01894": 145.3279
        //         },
        //         "repositoryAssetMetadataMap": {
        //             "KARVY": {
        //                 "availablePortfolioAmount": 872800,
        //                 "approvedPortfolioAmount": 0,
        //                 "availableCreditAmount": 392600,
        //                 "approvedCreditAmount": 0,
        //                 "casFetchDate": null
        //             },
        //             "CAMS": {
        //                 "availablePortfolioAmount": 0,
        //                 "approvedPortfolioAmount": 0,
        //                 "availableCreditAmount": 0,
        //                 "approvedCreditAmount": 0,
        //                 "casFetchDate": null
        //             }
        //         },
        //         "availableCAS": [
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "128",
        //                 "folioNo": "9048897656",
        //                 "schemeCode": "MCGP",
        //                 "schemeName": "Axis Mid Cap Fund  Regular Growth",
        //                 "isinNo": "INF846K01859",
        //                 "schemeType": "EQUITY",
        //                 "totalAvailableUnits": 6371.203,
        //                 "fetchedOn": null,
        //                 "is_pledged": null,
        //                 "is_pledged_confirmed": null,
        //                 "pledgedUnits": null,
        //                 "pledgedOn": null,
        //                 "pledgeReferenceNo": null
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "117",
        //                 "folioNo": "7042093481",
        //                 "schemeCode": "IORG",
        //                 "schemeName": "Mirae Asset India Equity Fund  Regular Growth Plan",
        //                 "isinNo": "INF769K01010",
        //                 "schemeType": "EQUITY",
        //                 "totalAvailableUnits": 1939.585,
        //                 "fetchedOn": null,
        //                 "is_pledged": null,
        //                 "is_pledged_confirmed": null,
        //                 "pledgedUnits": null,
        //                 "pledgedOn": null,
        //                 "pledgeReferenceNo": null
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "118",
        //                 "folioNo": "3002703269",
        //                 "schemeCode": "EFRG",
        //                 "schemeName": "Edelweiss Large & Mid Cap Fund  Regular Plan Growth",
        //                 "isinNo": "INF843K01047",
        //                 "schemeType": "EQUITY",
        //                 "totalAvailableUnits": 2816.244,
        //                 "fetchedOn": null,
        //                 "is_pledged": null,
        //                 "is_pledged_confirmed": null,
        //                 "pledgedUnits": null,
        //                 "pledgedOn": null,
        //                 "pledgeReferenceNo": null
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "178",
        //                 "folioNo": "900000376840",
        //                 "schemeCode": "LCRG",
        //                 "schemeName": "BNP PARIBAS LARGE CAP FUND  REGULAR GROWTH",
        //                 "isinNo": "INF251K01894",
        //                 "schemeType": "EQUITY",
        //                 "totalAvailableUnits": 964.708,
        //                 "fetchedOn": null,
        //                 "is_pledged": null,
        //                 "is_pledged_confirmed": null,
        //                 "pledgedUnits": null,
        //                 "pledgedOn": null,
        //                 "pledgeReferenceNo": null
        //             }
        //         ],
        //         "tobePledgedPortfolio": [],
        //         "pledgedPortfolio": [
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "117",
        //                 "folioNo": "7042093481",
        //                 "schemeCode": "IORG",
        //                 "schemeName": "Mirae Asset India Equity Fund  Regular Growth Plan",
        //                 "isinNo": "INF769K01010",
        //                 "schemeType": null,
        //                 "totalAvailableUnits": null,
        //                 "fetchedOn": null,
        //                 "is_pledged": true,
        //                 "is_pledged_confirmed": true,
        //                 "pledgedUnits": 1939.585,
        //                 "pledgedOn": 1671876180817,
        //                 "pledgeReferenceNo": "163656690"
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "118",
        //                 "folioNo": "3002703269",
        //                 "schemeCode": "EFRG",
        //                 "schemeName": "Edelweiss Large & Mid Cap Fund  Regular Plan Growth",
        //                 "isinNo": "INF843K01047",
        //                 "schemeType": null,
        //                 "totalAvailableUnits": null,
        //                 "fetchedOn": null,
        //                 "is_pledged": true,
        //                 "is_pledged_confirmed": true,
        //                 "pledgedUnits": 2816.244,
        //                 "pledgedOn": 1671876180817,
        //                 "pledgeReferenceNo": "411174900"
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "128",
        //                 "folioNo": "9048897656",
        //                 "schemeCode": "MCGP",
        //                 "schemeName": "Axis Mid Cap Fund  Regular Growth",
        //                 "isinNo": "INF846K01859",
        //                 "schemeType": null,
        //                 "totalAvailableUnits": null,
        //                 "fetchedOn": null,
        //                 "is_pledged": true,
        //                 "is_pledged_confirmed": true,
        //                 "pledgedUnits": 6371.203,
        //                 "pledgedOn": 1671876180817,
        //                 "pledgeReferenceNo": "807876033"
        //             },
        //             {
        //                 "assetRepository": "KARVY",
        //                 "amcName": null,
        //                 "amcCode": "178",
        //                 "folioNo": "900000376840",
        //                 "schemeCode": "LCRG",
        //                 "schemeName": "BNP PARIBAS LARGE CAP FUND  REGULAR GROWTH",
        //                 "isinNo": "INF251K01894",
        //                 "schemeType": null,
        //                 "totalAvailableUnits": null,
        //                 "fetchedOn": null,
        //                 "is_pledged": true,
        //                 "is_pledged_confirmed": true,
        //                 "pledgedUnits": 964.708,
        //                 "pledgedOn": 1671876180817,
        //                 "pledgeReferenceNo": "24952245"
        //             }
        //         ],
        //         "casFetchDates": {
        //             "KARVY": 1671876175
        //         }
        //     }
        // };

        // testing statrt
        let unlockedAmont = 0;
        let isDataUpdated = "";
        let camsDate;
        let camsPortfolio = 0;
        let camsAmount = 0;
        let karvyDate;
        let karvyPortfolio = 0;
        let karvyAmount = 0;
        const availableCreditAmount: number =
            pledgeLimitResponse.data.stepResponseObject.availableCreditAmount || 0;
        const availableCAS: AvailableCASItem[] =
            pledgeLimitResponse.data.stepResponseObject.availableCAS || [];
        const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;
        unlockedAmont = pledgeLimitResponse.data.stepResponseObject.availableCreditAmount;
        const conditionData = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap;
        let conditionDataKAMS = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS;
        let conditionDataKARVY = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY;
        console.log("karvydata",conditionDataKARVY);
        if (conditionDataKAMS.availableCreditAmount !== 0) {
            camsDate = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.casFetchDate;
            camsDate = new Date(camsDate * 1000);
            camsPortfolio = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.availablePortfolioAmount;
            camsAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.availableCreditAmount;
            isDataUpdated = "Data Exist";
        } 
         if (conditionDataKARVY.availableCreditAmount !== 0) {
            console.log("karvy");
            karvyDate = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.casFetchDate;
            karvyDate = new Date(karvyDate * 1000);
            karvyPortfolio = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.availablePortfolioAmount;
            karvyAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.availableCreditAmount;
            isDataUpdated = "Data Exist";
        } 
        console.log("cams",camsAmount);
        console.log("karvy",karvyAmount);
      //  var date = 
        // Object.keys(conditionData).map(key => {
        //     const value = conditionData[key] // obj[x]
        //     conditionDataKAMS = value;
        // })
        // console.log("cams");
        // console.log("cams",pledgeLimitResponse.stepResponseObject.repositoryAssetMetadataMap.CAMS.);
        // console.log("camsdata",conditionCAMSData[0].availableCreditAmount);

        // testing end

        //   const availableCreditAmount: number =
        //     pledgeLimitResponse.data.stepResponseObject.availableCreditAmount || 0;
        //   const availableCAS: AvailableCASItem[] =
        //     pledgeLimitResponse.data.stepResponseObject.availableCAS || [];
        //const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;

        /*** Show popup as soon as we land here if MF_PLEDGE_PORTFOLIO is PENDING_CALLBACK ***/
        //   const stepStatusMap: StepStatusMap =
        //     pledgeLimitResponse.data.updatedApplicationObj.stepStatusMap;


        const applictaionId = await SharedPropsService.getApplicationId();

        // let camsFetches = {
        //     "KARVY": 1671781866
        // }
        // let isDataUpdated = "Data Exist";
        let camsFetches = {}

        
        // if (JSON.stringify(pledgeLimitResponse.data.stepResponseObject.casFetchDates) === '{}') {
        //     isDataUpdated = "";
        // } else {
        //     unlockedAmont = pledgeLimitResponse.data.stepResponseObject.availableCreditAmount;
        //     camsFetches = pledgeLimitResponse.data.stepResponseObject.casFetchDates;
        //     isDataUpdated = "Data Exist";
        // }
        const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
        return Promise.resolve(
            //  template(availableCreditAmount, availableCAS, stepResponseObject)
            //  template(isDataUpdated, camsFetches, stepper,unlockedAmont,stepResponseObject)
            //template(isDataUpdated,conditionData, stepper,unlockedAmont,stepResponseObject)
            // template(isDataUpdated,conditionDataKAMS,conditionDataKARVY, stepper, unlockedAmont, stepResponseObject)
            template(isDataUpdated, camsDate, camsAmount, camsPortfolio,
                karvyDate, karvyAmount, karvyPortfolio
                , stepper, unlockedAmont, stepResponseObject)
        );
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onBack,
        [ACTION.SHARE]: onShare,
        [ACTION.GO_CAMS]: goCamsNext,
        [ACTION.GO_KARVY]: goKarvyNext,
        [ACTION.GO_OPERATIONAL]: goNext,
    },

    clearPrevious: true,
};
