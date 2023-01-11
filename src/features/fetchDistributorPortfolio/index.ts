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
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StepperProps,
    StepperTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import {
    ACTION, AvailableCASItem, LimitPayload, RepositoryPayload, StepResponseObject,
} from "./types";
import { goNext, onBack, onSave, onShare, onSkip } from "./action";
import SharedPropsService from "../../SharedPropsService";
import { partnerApi } from "../../configs/api";
import { getAppHeader } from "../../configs/config";
import moment from "moment";


export const template: (
    isDataUpdated: any,
    camsDate: string, camsAmount: Number, camsPortfolio: Number,
    karvyDate: string, karvyAmount: Number, karvyPortfolio: Number,
    stepper: any,
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
                    leftTitle:<TypographyProps>{
                        label:"Share",
                        fontFamily:FontFamilyTokens.Inter,
                        fontSize:FontSizeTokens.SM,
                        color:ColorTokens.Primary_100,
                        lineHeight:24,
                
                      },
                      leftAction: {
                        type: ACTION.SHARE,
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
                        type: ACTION.GO_OPERATIONAL,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <RepositoryPayload>{
                            value:"CAMS"
                        },
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
                        type: ACTION.GO_OPERATIONAL,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <RepositoryPayload>{
                            value:"KARVY"
                        },
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
                    label: "Last fetched on " + `${moment.unix(Number(camsDate) / 1000).format("MMMM D")}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                portfolioItemsCAMS: <TypographyProps>{
                    label: "Portfolio Value: Rs. " + `${camsPortfolio}`,
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
                            value: "CAMS"
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
                    label: "Last fetched on " + `${moment.unix(Number(karvyDate) / 1000).format("MMMM D")}`,
                    fontSize: FontSizeTokens.XS,
                    fontWeight: '400',
                    color: ColorTokens.Grey_Charcoal,
                    lineHeight: 18,
                    fontFamily: FontFamilyTokens.Inter
                },
                portfolioItemsKARVY: <TypographyProps>{
                    label: "Portfolio Value: Rs. " + `${karvyPortfolio}`,
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
                            value: "KARVY"
                        },
                    },
                },

                continue: <ButtonProps & WidgetProps>{
                    label: "Save & Continue",
                    type: `${camsAmount}` || `${karvyAmount}` ? ButtonTypeTokens.LargeFilled : ButtonTypeTokens.LargeOutline,
                    width: ButtonWidthTypeToken.FULL,
                    action: {
                        type: ACTION.ON_SAVE,
                        routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                        payload: <LimitPayload>{
                            value: stepResponseObject
                        },
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
        const applicationid = await SharedPropsService.getApplicationId();
        const pledgeLimitResponse = await network.get(
            `${partnerApi.pledgeLimit}${applicationid}`,
            { headers: await getAppHeader() }
        );

       
        let data1 = [];
        var stepper_datas = [];

        Object.keys(pledgeLimitResponse.data.partnerViewStepperMap).map(key=> {
            const value = pledgeLimitResponse.data.partnerViewStepperMap[key];
            const stepData:any = new Object();
            if(value.isEditable === true){
                stepData.title = value.verticalDisplayName;
                stepData.subTitle = value.verticalDescription;
                stepData.id = value.order;
                stepData.horizontalTitle = value.horizontalDisplayName;
                stepData.status = value.status;
              data1.push(stepData);
            }
            })
            stepper_datas = data1.sort(function (a, b) {
              return a.id - b.id;
            });

            let filtered_stepper = [];
           // let stepper_data = await SharedPropsService.getStepperData();
           stepper_datas.forEach((item, index) => {
                console.log("fetch item",item);
                if (item.horizontalTitle === "Fetch Portfolio") {
                    item.status = "IN_PROGRESS";
                }
                // if (item.horizontalTitle === "Bank details") {
                //     item.status = "COMPLETED";
                // }
                if (item.horizontalTitle === "Select Portfolio") {
                    item.status = "NOT_STARTED";
                }
                filtered_stepper.push(item);
            })
    
            console.log("filtered_data",filtered_stepper);
    
            await SharedPropsService.setStepperData(filtered_stepper);


           // await SharedPropsService.setStepperData(stepper_datas);
      


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
        if (conditionDataKAMS.availableCreditAmount !== 0) {
            camsDate = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.casFetchDate;
            camsDate = new Date(camsDate * 1000);
            camsPortfolio = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.availablePortfolioAmount;
            camsAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.availableCreditAmount;
            isDataUpdated = "Data Exist";
        }
        if (conditionDataKARVY.availableCreditAmount !== 0) {
            karvyDate = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.casFetchDate;
            karvyDate = new Date(karvyDate * 1000);
            karvyPortfolio = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.availablePortfolioAmount;
            karvyAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.availableCreditAmount;
            isDataUpdated = "Data Exist";
        }
        const applictaionId = await SharedPropsService.getApplicationId();
        let camsFetches = {}
       
        return Promise.resolve(
            template(isDataUpdated, camsDate, camsAmount, camsPortfolio,
                karvyDate, karvyAmount, karvyPortfolio
                , filtered_stepper, unlockedAmont, stepResponseObject)
        );
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onBack,
        [ACTION.SHARE]: onShare,
        [ACTION.GO_OPERATIONAL]: goNext,
    },
    clearPrevious: true,
};
