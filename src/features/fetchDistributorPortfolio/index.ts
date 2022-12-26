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
    ACTION, AmountPayload,
} from "./types";
import { horizontalDistributorStepperRepo } from "../../configs/utils";
import { goCamsNext, goKarvyNext, onBack, onSave, onShare, onSkip } from "./action";
import SharedPropsService from "../../SharedPropsService";
import { partnerApi } from "../../configs/api";
import { getAppHeader } from "../../configs/config";
import moment from "moment";


export const template: (
    isDataUpdated: any,
    camsFetches: {},
    stepper: StepperItem[],
    unlockedAmont:string
) => TemplateSchema = (isDataUpdated, camsFetches, stepper,unlockedAmont) => {
    const _generateDS =
        isDataUpdated
            ? {
                operationalStickyStack: <StackProps>{
                    body: {
                        widgetItems: [
                            {
                                id: "operationalStack",
                                type: WIDGET.STACK,
                            },
                        ],
                    },
                },
            }
            : {};
    console.log(isDataUpdated);
    console.log(_generateDS);

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
                ...(`${Object.keys(camsFetches)}` === "CAMS"
                    ? [
                        { id: "operationalStack", type: WIDGET.STACK }
                    ]
                    : [
                        { id: "camsStack", type: WIDGET.STACK },
                    ]),

                { id: "midDivider", type: WIDGET.DIVIDER },
                ...(`${Object.keys(camsFetches)}` === "KARVY" ?
                    [
                        { id: "operationalStack", type: WIDGET.STACK }
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

            ..._generateDS,
            operationalStack: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                justifyContent: StackJustifyContent.flexStart,
                widgetItems: [
                    { id: "operationalHead", type: WIDGET.STACK },
                    { id: "operationalBtn", type: WIDGET.STACK }
                ],
            },
            operationalHead: <StackProps>{
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                justifyContent: StackJustifyContent.flexStart,
                widgetItems: [
                    { id: "headItems", type: WIDGET.TEXT },
                    { id: "headSpace", type: WIDGET.SPACE },
                    { id: "dateItems", type: WIDGET.TEXT },
                    // { id: "portfolioItems", type: WIDGET.TEXT },
                    // { id: "totalItems", type: WIDGET.TEXT },
                    // { id: "creditLimitItems", type: WIDGET.TEXT },
                    // { id: "availableLimitItems", type: WIDGET.TEXT },
                    // { id: "limitSpace", type: WIDGET.SPACE },
                    { id: "viewPortfolio", type: WIDGET.STACK },
                ],
            },
            headItems: <TypographyProps>{
                label: `Fetch From ${Object.keys(camsFetches)}`,
                fontSize: FontSizeTokens.MD,
                fontWeight: '600',
                color: ColorTokens.Grey_Night,
                lineHeight: 24,
                fontFamily: FontFamilyTokens.Inter
            },
            headSpace: <SpaceProps>{
                size: SizeTypeTokens.SM
            },
            dateItems: <TypographyProps>{
                //label: `Last fetched on ${Object.values(camsFetches)}`,
                label: `Last fetched on ${moment(Object.values(camsFetches), "dddd D MMMM")}`,
                fontSize: FontSizeTokens.XS,
                fontWeight: '400',
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            portfolioItems: <TypographyProps>{
                label: "Portfolio Value: Rs. 5,42,000",
                fontSize: FontSizeTokens.XS,
                fontWeight: '400',
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            totalItems: <TypographyProps>{
                label: "",
                fontSize: FontSizeTokens.XS,
                fontWeight: '400',
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            creditLimitItems: <TypographyProps>{
                label: "Credit limit available: Rs. 20,000",
                fontSize: FontSizeTokens.XS,
                fontWeight: '400',
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            availableLimitItems: <TypographyProps>{
                label: "Available limit: Rs. 2,00,000",
                fontSize: FontSizeTokens.XS,
                fontWeight: '400',
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            limitSpace: <SpaceProps>{
                size: SizeTypeTokens.SM
            },
            viewPortfolio: <StackProps>{
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                justifyContent: StackJustifyContent.flexStart,
                widgetItems: [
                    { id: "protfolioBtnItems", type: WIDGET.TEXT },

                ],
                action: {
                    type: ACTION.ON_SAVE,
                    routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                    payload: <{}>{},
                },
            },
            protfolioBtnItems: <TypographyProps>{
                label: "View Portfolio",
                fontSize: FontSizeTokens.XS,
                fontWeight: '500',
                color: ColorTokens.Primary_100,
                lineHeight: 18,
                fontFamily: FontFamilyTokens.Inter
            },
            operationalBtn: <StackProps>{
                type: StackType.column,
                alignItems: StackAlignItems.flexEnd,
                justifyContent: StackJustifyContent.flexEnd,
                widgetItems: [
                    { id: "operationalBtnItems", type: WIDGET.BUTTON },

                ],
            },
            operationalBtnItems: <ButtonProps & WidgetProps>{
                label: "Fetch again",
                type: ButtonTypeTokens.MediumSoftFilled,
                labelColor: ColorTokens.Primary_100,
                width: ButtonWidthTypeToken.CONTENT,
                action: {
                    type: ACTION.ON_SKIP,
                    routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                    payload: <{}>{},
                },
            },

            continue: <ButtonProps & WidgetProps>{
                label: "Save & Contiune",
                type: `${Object.keys(camsFetches)}` ? ButtonTypeTokens.LargeFilled : ButtonTypeTokens.LargeOutline,
                labelColor: ColorTokens.Grey_Charcoal,
                width: ButtonWidthTypeToken.FULL,
                action: {
                    type: ACTION.ON_SAVE,
                    routeId: ROUTE.DISTRIBUTOR_PORTFOLIO,
                    payload: <AmountPayload>{
                        value:`${unlockedAmont}`
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
        /* For testing purpose 
            const applictaionId ="bd2c1f9d-356c-40c1-b4b9-fad351fbd992";
            let camsFetches = {
                "KARVY": 1671781866
            }
            let isDataUpdated = "Data Exist";
         */

        const applictaionId = await SharedPropsService.getApplicationId();
        const response = await network.get(
            `${partnerApi.pledgeLimit}${applictaionId}`,
            { headers: await getAppHeader() }
        );
        let camsFetches = {}
        let isDataUpdated = "";
        let unlockedAmont = "";
        if (JSON.stringify(response.data.stepResponseObject.casFetchDates) === '{}') {
            isDataUpdated = "";
        } else {
            unlockedAmont = response.data.stepResponseObject.availableCreditAmount;
            camsFetches = response.data.stepResponseObject.casFetchDates;
            isDataUpdated = "Data Exist";
        }
        const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
        return Promise.resolve(template(isDataUpdated, camsFetches, stepper,unlockedAmont));
    },
    actions: {
        [ACTION.ON_SAVE]: onSave,
        [ACTION.ON_SKIP]: onSkip,
        [ACTION.GO_BACK]: onBack,
        [ACTION.SHARE]: onShare,
        [ACTION.GO_CAMS]: goCamsNext,
        [ACTION.GO_KARVY]: goKarvyNext,
    },

    clearPrevious: true,
};
