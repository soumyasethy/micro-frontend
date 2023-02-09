import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from "@voltmoney/types";
import _ from "lodash";
import {
    AccordionProps,
    AccordionTypeTokens,
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
    IconTokens,
    LimitCardProps,
    LimitCardTypeTokens,
    PaddingProps,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, amountPayload, pagePayload } from "./types";
import {
    editSliderAmount,
    getMoreMfPortfolio,
    goBack,
    goConfirmPledge,
    goKfin,
    goPortfolio,
    goToEditPortFolio,
    OnChangeSlider,
} from "./action";
import { addCommasToNumber, isMorePortfolioRenderCheck } from "../../../configs/utils";
import {
    GetMoreMfPortfolioPayload,
    StepResponseObject,
    UpdateAvailableCASMap,
} from "../unlock_limit/types";
import { AuthCASModel, StepStatusMap } from "../../../types/AuthCASModel";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import { fetchPledgeLimitRepo } from "../unlock_limit/repo";
import { getDesiredValue } from "../portfolio_readonly/actions";
import { User } from "../../login/otp_verify/types";
import { AvailableCASItem } from "../unlock_limit_landing_V2/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";


let availableCASX: AvailableCASItem[];

export const template: (
    availableCreditAmount: number,
    availableCAS: AvailableCASItem[],
    stepResponseObject: StepResponseObject,
    shouldShowGetMorePortfolio: boolean,
    totalPortfolioAmount: number,
    processingFeesBreakUp: { [key in string]: number },
    updateAvailableCASMap: UpdateAvailableCASMap,
    showLessLimit: boolean,
    camsAmount: number,
    KFintech: number
) => Promise<TemplateSchema> = async (
    availableCreditAmount,
    availableCAS,
    stepResponseObject,
    shouldShowGetMorePortfolio,
    totalPortfolioAmount,
    processingFeesBreakUp = {},
    updateAvailableCASMap,
    showLessLimit = false,
    camsAmount,
    KFintechAmount
) => ({
    layout: <Layout>{
        id: ROUTE.MF_PLEDGE_PORTFOLIO,
        type: LAYOUTS.LIST,
        widgets: [
            {
                id: "header",
                type: WIDGET.HEADER,
                position: POSITION.ABSOLUTE_TOP,
            },
            {
                id: "trial",
                type: WIDGET.ACCORDION,
                padding: {
                    horizontal: -16
                }
            },
        ],
    },
    datastore: <Datastore>{
        header: <HeaderProps & WidgetProps>{
            isBackButton: false,
            type: HeaderTypeTokens.DEFAULT,
            title: "Unlock credit limit",
            action: {
                type: ACTION.GO_BACK,
                routeId: ROUTE.SET_CREDIT_LIMIT,
                payload: {},
            },
        },
        trial: <AccordionProps>{
            data: [
                {
                    id: "1",
                    title: {
                        widgetItems: [
                            { id: "portfolioTitle", type: WIDGET.TEXT },
                        ]
                    },
                    data: {
                        widgetItems: [
                            { id: "portfolioValue", type: WIDGET.STACK },
                            { id: "portfolioSpaces", type: WIDGET.SPACE },
                            { id: "availableValue", type: WIDGET.STACK },
                            { id: "availableSpaces", type: WIDGET.SPACE },
                            { id: "sourceValue", type: WIDGET.STACK },
                            { id: "contentCard", type: WIDGET.LIMIT_CARD },
                            { id: "cardSpaces", type: WIDGET.SPACE },
                        ]

                    },
                    activeIndex: false,
                    isAction: true,
                    actionLabel: "Continue to set credit limit",
                    actionType: (camsAmount !== 0 && KFintechAmount !== 0) ? ButtonTypeTokens.MediumFilled : ButtonTypeTokens.MediumSoftFilled,
                    actionLabelColor:(camsAmount !== 0 && KFintechAmount !== 0) ? ColorTokens.White : ColorTokens.Primary_100,
                    isNext: true
                },
                {
                    id: "2",
                    title: {
                        widgetItems: [
                            { id: "CreditTitle", type: WIDGET.TEXT },
                        ]
                    },
                    data: {
                        widgetItems: [
                            { id: "amountCard", type: WIDGET.LIMIT_CARD },
                            { id: "amountSpaces", type: WIDGET.SPACE },
                        ]

                    },
                    activeIndex: false,
                    actionLabel: "Continue",
                    isAction: true,
                    actionType: ButtonTypeTokens.MediumFilled,
                    actionLabelColor: ColorTokens.White,
                    isNext:false,
                    refreshAction:{
                        type: ACTION.PORTFOLIO,
                        // payload:<pagePayload>{
                        //     value: null,
                        //     widgetID: "contentCard",
                        // },
                        routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
                    }
                },
                {
                    id: "3",
                    title: {
                        widgetItems: [
                            { id: "InterestTitle", type: WIDGET.TEXT },
                        ]
                    },
                    data: {
                        widgetItems: [
                            { id: "processingFeeStack", type: WIDGET.STACK },
                            { id: "space5", type: WIDGET.SPACE },
                            { id: "divider2", type: WIDGET.DIVIDER },
                            { id: "space6", type: WIDGET.SPACE },
                            { id: "interestRateStack", type: WIDGET.STACK },
                            { id: "space7", type: WIDGET.SPACE },
                            { id: "divider3", type: WIDGET.DIVIDER },
                            { id: "space8", type: WIDGET.SPACE },
                            { id: "autoPayStack", type: WIDGET.STACK },
                            { id: "space9", type: WIDGET.SPACE },
                            { id: "divider4", type: WIDGET.DIVIDER },
                            { id: "space10", type: WIDGET.SPACE },
                            { id: "durationStack", type: WIDGET.STACK },
                            { id: "durationSpaces", type: WIDGET.SPACE },
                            // { id: "durationcontinue", type: WIDGET.BUTTON },
                        ]

                    },
                    activeIndex: false,
                    actionLabel: "Got it",
                    isAction: true,
                    actionType: ButtonTypeTokens.MediumSoftFilled,
                    actionLabelColor: ColorTokens.Primary_100,
                    isNext:true
                },
                {
                    id: "4",
                    title: {
                        widgetItems: [
                            { id: "worksTitle", type: WIDGET.TEXT },
                        ]
                    },
                    data: {
                        widgetItems: [

                        ]

                    },
                    activeIndex: false,
                    isAction: false,
                }
            ],
            type: AccordionTypeTokens.LIST,
        },
        worksTitle:<TypographyProps>{
            label: "How it works?",
            fontFamily: FontFamilyTokens.Poppins,
            color: ColorTokens.Grey_Night,
            fontWeight: "600",
            fontSize: FontSizeTokens.MD,
            lineHeight: 24
        },
        portfolioTitle:<TypographyProps>{
            label: "Check portfolio credit limit",
            fontFamily: FontFamilyTokens.Poppins,
            color: ColorTokens.Grey_Night,
            fontWeight: "600",
            fontSize: FontSizeTokens.MD,
            lineHeight: 24
        },
        CreditTitle:<TypographyProps>{
            label: "Set credit limit",
            fontFamily: FontFamilyTokens.Poppins,
            color: ColorTokens.Grey_Night,
            fontWeight: "600",
            fontSize: FontSizeTokens.MD,
            lineHeight: 24
        },
        InterestTitle:<TypographyProps>{
            label: "Interest and other charges",
            fontFamily: FontFamilyTokens.Poppins,
            color: ColorTokens.Grey_Night,
            fontWeight: "600",
            fontSize: FontSizeTokens.MD,
            lineHeight: 24
        },
        portfolioAccordion: <AccordionProps>{
            body: {
                widgetItems: [
                    { id: "portfolioValue", type: WIDGET.STACK },
                    { id: "portfolioSpaces", type: WIDGET.SPACE },
                    { id: "availableValue", type: WIDGET.STACK },
                    { id: "availableSpaces", type: WIDGET.SPACE },
                    { id: "sourceValue", type: WIDGET.STACK },
                    { id: "contentCard", type: WIDGET.LIMIT_CARD },
                    { id: "cardSpaces", type: WIDGET.SPACE },
                    { id: "continue", type: WIDGET.BUTTON },
                ]
            },
            title: 'Check portfolio credit limit',
            description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
            icon: IconTokens.DownArrow,
            type: AccordionTypeTokens.LIST,
        },
        portfolioValue: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            justifyContent: StackJustifyContent.spaceBetween,
            alignItems: StackAlignItems.center,
            padding: <PaddingProps>{
                horizontal: SizeTypeTokens.XL,
            },
            widgetItems: [
                { id: "space1", type: WIDGET.STACK },

                { id: "value1", type: WIDGET.TEXT },
            ],
        },
        space1: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,

            widgetItems: [
                { id: "space11", type: WIDGET.SPACE },
                { id: "key1", type: WIDGET.TEXT },
            ],
        },
        space11: <SpaceProps>{
            size: SizeTypeTokens.MD,
        },
        portfolioSpaces: <SpaceProps>{
            size: SizeTypeTokens.XL
        },
        key1: <TypographyProps>{
            label: "Portfolio value",
            fontFamily: FontFamilyTokens.Inter,
            color: ColorTokens.Grey_Charcoal,
            fontWeight: "400",
            fontSize: FontSizeTokens.XS,
            lineHeight: 18
        },
        value1: <TypographyProps>{
            label: `₹${addCommasToNumber(totalPortfolioAmount)}`,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 18,
            color: ColorTokens.Grey_Night,
            fontWeight: "500",
            fontSize: FontSizeTokens.XS,
        },
        availableValue: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "space2", type: WIDGET.STACK },
                { id: "value2", type: WIDGET.TEXT },
            ],
        },
        space2: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            // },
            widgetItems: [
                { id: "space22", type: WIDGET.SPACE },
                { id: "key2", type: WIDGET.TEXT },
            ],
        },
        space22: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        key2: <TypographyProps>{
            label: "Available limit",
            fontFamily: FontFamilyTokens.Inter,
            color: ColorTokens.Grey_Charcoal,
            fontWeight: "400",
            fontSize: FontSizeTokens.XS,
            lineHeight: 18
        },
        value2: <TypographyProps>{
            label: `₹${addCommasToNumber(availableCreditAmount)}`,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 18,
            color: ColorTokens.Grey_Night,
            fontWeight: "500",
            fontSize: FontSizeTokens.XS,
        },
        availableSpaces: <SpaceProps>{
            size: SizeTypeTokens.XXL
        },
        sourceValue: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            widgetItems: [
                { id: "key3", type: WIDGET.TEXT },
            ],
        },
        space3: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        key3: <TypographyProps>{
            label: "source",
            fontFamily: FontFamilyTokens.Inter,
            color: ColorTokens.Grey_Charcoal,
            fontWeight: "400",
            fontSize: FontSizeTokens.XXS,
            lineHeight: 16
        },
        contentCards: <StackProps>{
            type: StackType.row,

            widgetItems: [
                { id: "contentSpace", type: WIDGET.SPACE },
                { id: "contentCard", type: WIDGET.LIMIT_CARD },
            ],
        },
        contentSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        contentCard: <LimitCardProps>{
            label: 'From Cams',
            limitAmount: camsAmount === 0 ? 'No portfolio fetched' : `Value: ₹ ${addCommasToNumber(camsAmount)}`,
            secondrylabel: 'From KFintech',
            fetchedAmount: KFintechAmount === 0 ? 'No portfolio fetched' : `Value: ₹ ${addCommasToNumber(KFintechAmount)}`,
            type: LimitCardTypeTokens.LIST,
            isView: false,
            showLottie: false,
            isPrimaryAction: camsAmount === 0 ? false : true,
            isSecondryAction: KFintechAmount === 0 ? false: true,
            action: {
                type: ACTION.GET_MORE_MF_PORTFOLIO,
                payload: <GetMoreMfPortfolioPayload>{
                    casList: stepResponseObject.availableCAS,
                },
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
            refreshAction:{
                type: ACTION.NAV_PORTFOLIO,
                payload:<pagePayload>{
                    value: null,
                    widgetID: "contentCard",
                },
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            }
        },


        portfolioSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        creditAccordion: <AccordionProps>{
            body: {
                widgetItems: [
                    { id: "amountCard", type: WIDGET.LIMIT_CARD },
                    { id: "amountSpaces", type: WIDGET.SPACE },
                    { id: "amountcontinue", type: WIDGET.BUTTON },
                ]
            },
            title: 'Set credit limit',
            description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
            icon: IconTokens.DownArrow,
            type: AccordionTypeTokens.LIST,
        },
        amountCard: <LimitCardProps>{
            label: 'Available credit limit',
            limitAmount: `${addCommasToNumber(availableCreditAmount)}`,
            secondrylabel: 'Available portfolio',
            fetchedAmount: `${addCommasToNumber(totalPortfolioAmount)}`,
            isView: false,
            type: LimitCardTypeTokens.DEFAULT,
            showLottie: false,
        },
        amountSpaces: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        amountcontinue: <ButtonProps>{
            label: "Continue",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "700",
            width: ButtonWidthTypeToken.FULL,
            type: ButtonTypeTokens.LargeFilled,
            labelColor: ColorTokens.White,
            action: {
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
        },
        cardSpaces: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        continue: <ButtonProps>{
            label: "Continue to set credit limit",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "700",
            width: ButtonWidthTypeToken.FULL,
            type: ButtonTypeTokens.LargeFilled,
            labelColor: ColorTokens.White,
            action: {
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
        },
        creditSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        interestAccordion: <AccordionProps>{
            body: {
                widgetItems: [
                    { id: "processingFeeStack", type: WIDGET.STACK },
                    { id: "space5", type: WIDGET.SPACE },
                    { id: "divider2", type: WIDGET.DIVIDER },
                    { id: "space6", type: WIDGET.SPACE },
                    { id: "interestRateStack", type: WIDGET.STACK },
                    { id: "space7", type: WIDGET.SPACE },
                    { id: "divider3", type: WIDGET.DIVIDER },
                    { id: "space8", type: WIDGET.SPACE },
                    { id: "autoPayStack", type: WIDGET.STACK },
                    { id: "space9", type: WIDGET.SPACE },
                    { id: "divider4", type: WIDGET.DIVIDER },
                    { id: "space10", type: WIDGET.SPACE },
                    { id: "durationStack", type: WIDGET.STACK },
                    { id: "durationSpaces", type: WIDGET.SPACE },
                    { id: "durationcontinue", type: WIDGET.BUTTON },
                ]
            },
            title: 'Interest and other charges',
            description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
            icon: IconTokens.DownArrow,
            type: AccordionTypeTokens.LIST,
            // action:{

            // }
        },
        processingFeeStack: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "processingFeeTextStack", type: WIDGET.STACK },
                { id: "processingFeeValue", type: WIDGET.TEXT },
            ],
        },
        processingFeeTextStack: <StackProps>{
            type: StackType.row,
            widgetItems: [
                { id: "processingFeeSpace", type: WIDGET.SPACE },
                { id: "processingFeeText", type: WIDGET.TEXT },
            ],
        },
        processingFeeSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        processingFeeText: <TypographyProps>{
            label: "Processing fee",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
            fontSize: FontSizeTokens.SM,
        },
        processingFeeValue: <TypographyProps>{
            label: `₹${processingFeesBreakUp["Processing Fee"]}`,
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
            fontSize: FontSizeTokens.SM,
        },
        space5: <SpaceProps>{ size: SizeTypeTokens.LG },
        divider2: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Milk_1,
        },
        space6: <SpaceProps>{ size: SizeTypeTokens.LG },
        interestRateStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "interestRateTextStack", type: WIDGET.STACK },
                { id: "interestRateValue", type: WIDGET.TEXT },
            ],
        },
        interestRateTextStack: <StackProps>{
            type: StackType.row,
            width: StackWidth.FULL,
            widgetItems: [
                { id: "interestRateTextSpace", type: WIDGET.SPACE },
                { id: "interestRateText", type: WIDGET.TEXT },
            ],
        },
        interestRateTextSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        interestRateText: <TypographyProps>{
            label: "Interest rate",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
            fontSize: FontSizeTokens.SM,
        },
        interestRateValue: <TypographyProps>{
            label: `${stepResponseObject["interestRate"]}%`, // refrence - pledge confirmation v2
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
            fontSize: FontSizeTokens.SM,
        },
        space7: <SpaceProps>{ size: SizeTypeTokens.LG },
        divider3: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Milk_1,
        },
        space8: <SpaceProps>{ size: SizeTypeTokens.LG },
        autoPayStack: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                { id: "autoPayTextStack", type: WIDGET.STACK },
                { id: "autoPayValue", type: WIDGET.TEXT },
            ],
        },
        autoPayTextStack: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            widgetItems: [
                { id: "autoPayTextSpace", type: WIDGET.SPACE },
                { id: "autoPayText", type: WIDGET.TEXT },
            ],
        },
        autoPayTextSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        autoPayText: <TypographyProps>{
            label: "Interest autopay",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
            fontSize: FontSizeTokens.SM,
        },
        autoPayValue: <TypographyProps>{
            label: "5th of every month",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
            fontSize: FontSizeTokens.SM,
        },
        space9: <SpaceProps>{ size: SizeTypeTokens.LG },
        divider4: <DividerProps>{
            size: DividerSizeTokens.SM,
            color: ColorTokens.Grey_Milk_1,
        },
        space10: <SpaceProps>{ size: SizeTypeTokens.LG },
        durationStack: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
            widgetItems: [
                //{ id: "durationText", type: WIDGET.TEXT },
                { id: "durationTextStack", type: WIDGET.STACK },
                { id: "durationValue", type: WIDGET.TEXT },
            ],
        },
        durationTextStack: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.row,
            widgetItems: [
                { id: "durationTextSpace", type: WIDGET.SPACE },
                { id: "durationText", type: WIDGET.TEXT },
            ],
        },
        durationTextSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        durationText: <TypographyProps>{
            label: "Duration",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
            fontSize: FontSizeTokens.SM,
        },
        durationValue: <TypographyProps>{
            label: "12 months",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "600",
            fontSize: FontSizeTokens.SM,
        },
        durationSpaces: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        durationcontinue: <ButtonProps>{
            label: "Got it",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "700",
            width: ButtonWidthTypeToken.FULL,
            type: ButtonTypeTokens.LargeOutline,
            labelColor: ColorTokens.Primary_100,
            action: {
                routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
        },
        interestSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
        workAccordion: <AccordionProps>{
            body: {
                widgetItems: [
                    { id: "typo", type: WIDGET.TEXT }
                ]
            },
            title: 'How it works?',
            description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
            icon: IconTokens.DownArrow,
            type: AccordionTypeTokens.LIST,
        },
        workSpace: <SpaceProps>{
            size: SizeTypeTokens.XL,
        },
    },
});

export const setCreditLimitMf2: PageType<any> = {
    bgColor: "#F3F5FC",
    onLoad: async ({ showPopup, network, goBack }) => {

        const updateAvailableCASMap = {};
        const user: User = await SharedPropsService.getUser();
        const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
        const pledgeLimitResponse = authCAS
            ? { data: authCAS }
            : await fetchPledgeLimitRepo().then((response) => ({
                data: response,
            }));
        /* const pledgeLimitResponse = await network.get(
          `${api.pledgeLimit}${user.linkedApplications[0].applicationId}`,
          { headers: await getAppHeader() }
        );*/
        /*** update authCAS in SharedPropsService if fetched from api ***/

        if (!authCAS && pledgeLimitResponse.data) {
            await SharedPropsService.setAuthCASResponse(pledgeLimitResponse.data);
        }
        const availableCreditAmount: number =
            pledgeLimitResponse.data.stepResponseObject.availableCreditAmount || 0;
        const totalPortfolioAmount: number =
            pledgeLimitResponse.data.stepResponseObject.totalPortfolioAmount || 0;

        const availableCAS: AvailableCASItem[] =
            pledgeLimitResponse.data.stepResponseObject.availableCAS || [];
        await SharedPropsService.setCasListOriginal(availableCAS);
        const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;

        //
        stepResponseObject.availableCAS.map((item, index) => {
            let key = `${item.isinNo}-${item.folioNo}`;
            item.pledgedUnits = item.totalAvailableUnits;
            updateAvailableCASMap[key] = item;
        });
        await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
        //
        /*** Show popup as soon as we land here if MF_PLEDGE_PORTFOLIO is PENDING_CALLBACK ***/
        const stepStatusMap: StepStatusMap =
            pledgeLimitResponse.data.updatedApplicationObj.stepStatusMap;
        // if (
        //   stepStatusMap.MF_PLEDGE_PORTFOLIO === StepperStateToken.PENDING_CALLBACK
        // ) {
        //   setTimeout(async () => {
        //     await showPopup({
        //       title: `Pledging...`,
        //       subTitle: "Please wait while we confirm your pledge with depository.",
        //       type: "DEFAULT",
        //       iconName: IconTokens.Volt,
        //     });
        //   }, 250);

        //   /***** Starting Polling to check status of MF_PLEDGE_PORTFOLIO *****/
        //   const PollerRef = setInterval(async () => {
        //     const mfPledgeStatusResponse = await network.get(
        //       `${api.borrowerApplication}${user.linkedApplications[0].applicationId}`,
        //       { headers: await getAppHeader() }
        //     );
        //     user.linkedApplications[0] = _.get(mfPledgeStatusResponse, "data");
        //     await SharedPropsService.setUser(user);
        //     if (
        //       _.get(
        //         mfPledgeStatusResponse,
        //         "data.stepStatusMap.MF_PLEDGE_PORTFOLIO"
        //       ) === "COMPLETED" &&
        //       _.get(mfPledgeStatusResponse, "data.currentStepId") !==
        //         "MF_PLEDGE_PORTFOLIO"
        //     ) {
        //       clearInterval(PollerRef);
        //       await goBack();
        //       await showPopup({
        //         autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
        //         isAutoTriggerCta: true,
        //         title: "Limit unlocked successfully!",
        //         subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
        //         type: "SUCCESS",
        //         ctaLabel: "Continue",
        //         primary: true,
        //         ctaAction: {
        //           type: ACTION.NAV_NEXT,
        //           routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
        //           payload: <NavigationNext>{
        //             stepId: _.get(mfPledgeStatusResponse, "data.currentStepId"),
        //           },
        //         },
        //       });
        //     }
        //   }, APP_CONFIG.POLLING_INTERVAL);
        // }
        const isGetMorePortfolio = await isMorePortfolioRenderCheck();

        const mfPortfolioArray: AvailableCASItem[] = (
            stepResponseObject as StepResponseObject
        ).availableCAS;

        mfPortfolioArray.forEach((_item, index) => {
            mfPortfolioArray[index].is_pledged = _item.pledgedUnits > 0;
        });

        console.log("mfPortfolioArray", mfPortfolioArray);

        const applicationId = (await SharedPropsService.getUser())
            .linkedApplications[0].applicationId;

        const response = await network.post(
            api.processingCharges,
            {
                applicationId: applicationId,
                mutualFundPortfolioItems: mfPortfolioArray,
            },
            { headers: await getAppHeader() }
        );

        console.log("response", response);
        const processingFeesBreakUp = _.get(
            response,
            "data.stepResponseObject.processingChargesBreakup",
            {}
        );

        await sharedPropsService.setCreditLimit(availableCreditAmount);

        const portValue = getDesiredValue(
            stepResponseObject["availableCAS"],
            stepResponseObject["isinNAVMap"]
        );

        await sharedPropsService.setDesiredPortfolio(portValue);

        let showLessLimit: boolean;

        availableCreditAmount < 25000
            ? (showLessLimit = true)
            : (showLessLimit = false);

        console.log("processing fee");
        console.log(processingFeesBreakUp)

        let camsAmount = 0;
        let KFintechAmount = 0;
        console.log("cams amount",pledgeLimitResponse.data.stepResponseObject);
        camsAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.CAMS.availablePortfolioAmount || 0;
        KFintechAmount = pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap.KARVY.availablePortfolioAmount || 0;

        console.log("cams amount",camsAmount);

        return Promise.resolve(
            template(
                availableCreditAmount,
                availableCASX,
                stepResponseObject as StepResponseObject,
                isGetMorePortfolio,
                totalPortfolioAmount,
                processingFeesBreakUp,
                updateAvailableCASMap,
                showLessLimit,
                camsAmount,
                KFintechAmount
            )
        );
    },
    actions: {
        [ACTION.ON_CHANGE_SLIDER]: OnChangeSlider,
        [ACTION.GO_BACK]: goBack,
        [ACTION.GO_CONFIRM_PLEDGE]: goConfirmPledge,
        [ACTION.EDIT_PORTFOLIO]: goToEditPortFolio,
        [ACTION.EDIT_LIMIT]: editSliderAmount,
        [ACTION.NAV_PORTFOLIO]: goKfin,
        [ACTION.PORTFOLIO]: goPortfolio,
        [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
    },
};
