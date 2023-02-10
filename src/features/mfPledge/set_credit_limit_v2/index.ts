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
    CardOrientation,
    CardProps,
    ColorTokens,
    DividerProps,
    DividerSizeTokens,
    FontFamilyTokens,
    FontSizeTokens,
    HeaderProps,
    HeaderTypeTokens,
    IconAlignmentTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ImageProps,
    LimitCardProps,
    LimitCardTypeTokens,
    ListItemProps,
    PaddingProps,
    PromoCardProps,
    ResizeModeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TagProps,
    TagTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, amountPayload, GetMoreMfPortfolioPayload, pagePayload } from "./types";
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
import { addCommasToNumber, isMorePortfolioRenderCheck, roundDownToNearestHundred } from "../../../configs/utils";
import {
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
import { commonTemplates } from "../../../configs/common";


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
) => {
    const listItemLayout = Object.keys(processingFeesBreakUp).map(
        (key, index) => {
          return {
            id: `list_${index}`,
            type: WIDGET.LIST_ITEM,
            padding: {
              // left:0,
            },
          };
        }
      );
    
      const listLayoutDs = {};
      Object.keys(processingFeesBreakUp).forEach((key, index) => {
        console.log("key", processingFeesBreakUp);
        listLayoutDs[`list_${index}`] = <ListItemProps>{
          customTitle: <TypographyProps>{
            label: `${key}`,
            color: ColorTokens.Grey_Night,
            fontWeight: "400",
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 24,
          },
    
          isDivider: true,
          trailLabel: <TypographyProps>{
            label: `₹${processingFeesBreakUp[key] || 0}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ","
            ),
            color: ColorTokens.Grey_Night,
            fontWeight: "600",
            subTitle: "",
            fontSize: FontSizeTokens.SM,
            fontFamily: FontFamilyTokens.Inter,
            lineHeight: 24,
          },
          onPress: () => {},
        };
        return listLayoutDs;
      });
    
return{
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
                    id: 1,
                    title: {
                        widgetItems: [
                            { id: "portfolioTitle", type: WIDGET.TEXT },
                        ]
                    },
                    toggleIndex:0,
                    data: {
                        widgetItems: [
                            { id: "portfolioCard", type: WIDGET.CARD },
                            // { id: "portfolioValue", type: WIDGET.STACK },
                            // { id: "portfolioSpaces", type: WIDGET.SPACE },
                            // { id: "availableValue", type: WIDGET.STACK },
                            // { id: "availableSpaces", type: WIDGET.SPACE },
                            // { id: "sourceValue", type: WIDGET.STACK },
                            // { id: "contentCard", type: WIDGET.LIMIT_CARD },
                            // { id: "cardSpaces", type: WIDGET.SPACE },
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
                    id: 2,
                    toggleIndex:0,
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
                    id: 3,
                    toggleIndex:0,
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
                    //actionLabel: "Got it",
                    isAction: false,
                    // actionType: ButtonTypeTokens.MediumSoftFilled,
                    // actionLabelColor: ColorTokens.Primary_100,
                    isNext:true
                },
                {
                    id: 4,
                    toggleIndex:0,
                    title: {
                        widgetItems: [
                            { id: "worksTitle", type: WIDGET.TEXT },
                        ]
                    },
                    data: {
                        widgetItems: [
                           
                              {
                                id: "promoCard",
                                type: WIDGET.PROMOCARD,
                                padding: {
                                  horizontal: -16,
                                  vertical: 0,
                                },
                              },
                             
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
                    { id: "portfolioCard", type: WIDGET.CARD },
                ]
            },
            title: 'Check portfolio credit limit',
            description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
            icon: IconTokens.DownArrow,
            type: AccordionTypeTokens.LIST,
        },
        portfolioCard:<CardProps>{
            width: StackWidth.FULL,
            padding: {
              left: SizeTypeTokens.MD,
              right: SizeTypeTokens.MD,
            },
            body: {
              widgetItems: [
                { id: "portfolioValue", type: WIDGET.STACK },
                    { id: "portfolioSpaces", type: WIDGET.SPACE },
                    { id: "availableValue", type: WIDGET.STACK },
                    { id: "availableSpaces", type: WIDGET.SPACE },
                    { id: "sourceValue", type: WIDGET.STACK },
                    { id: "sourceSpaces", type: WIDGET.SPACE },
                    { id: "contentCard", type: WIDGET.LIMIT_CARD },
                    { id: "cardSpaces", type: WIDGET.SPACE },
              ],
            },
        },
        portfolioValue: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            widgetItems: [
                { id: "space1", type: WIDGET.STACK },

                { id: "value1", type: WIDGET.TEXT },
            ],
        },
        space1: <StackProps>{
            type: StackType.row,

            widgetItems: [
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
            type: StackType.row,
            widgetItems: [
                { id: "space2", type: WIDGET.STACK },
                { id: "value2", type: WIDGET.TEXT },
            ],
        },
        space2: <StackProps>{
            type: StackType.row,
            // },
            widgetItems: [
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
            type: StackType.row,
            widgetItems: [
                { id: "key3", type: WIDGET.TEXT },
            ],
        },
        sourceSpaces: <SpaceProps>{
            size: SizeTypeTokens.XS
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
            label: 'From CAMS',
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
                    value: null,
                    widgetID: "contentCard",
                   
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
                    { id: "divider5", type: WIDGET.DIVIDER },
                  //  { id: "durationSpaces", type: WIDGET.SPACE },
                  //  { id: "durationcontinue", type: WIDGET.BUTTON },
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
            label: "Processing fee (excl. GST)",
            fontFamily: FontFamilyTokens.Inter,
            color:ColorTokens.Grey_Night,
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
            color:ColorTokens.Grey_Night,
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
            alignItems:StackAlignItems.center,
            widgetItems: [
                { id: "autoPayTextSpace", type: WIDGET.SPACE },
                { id: "autoPayText", type: WIDGET.TEXT },
                { id: "autoPayTextSpace1", type: WIDGET.SPACE },
                { id: "autoPayIcon", type: WIDGET.ICON },
            ],
        },
        autoPayTextSpace: <SpaceProps>{
            size: SizeTypeTokens.MD
        },
        autoPayTextSpace1: <SpaceProps>{
            size: SizeTypeTokens.XS
        },
        autoPayIcon:<IconProps>{
            name:IconTokens.Info,
            color:ColorTokens.Grey_Charcoal,
            size:IconSizeTokens.MD
        },
        autoPayText: <TypographyProps>{
            label: "Interest autopay",
            color:ColorTokens.Grey_Night,
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
        divider5: <DividerProps>{
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
            color:ColorTokens.Grey_Night
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
        showLessLimitCard: <CardProps>{
            bgColor: ColorTokens.Red_10,
            width: StackWidth.FULL,
            padding: {
              top: SizeTypeTokens.LG,
              bottom: SizeTypeTokens.LG,
              left: SizeTypeTokens.LG,
              right: SizeTypeTokens.LG,
            },
            bodyOrientation: CardOrientation.HORIZONTAL,
            body: {
              widgetItems: [
                { id: "infoIcon", type: WIDGET.ICON },
                { id: "infoIconSpace", type: WIDGET.SPACE },
                { id: "infoLabel", type: WIDGET.TEXT },
              ],
            },
          },
          infoIcon: <IconProps>{
            name: IconTokens.InfoFilled,
            color: ColorTokens.Red_50,
          },
          infoIconSpace: <SpaceProps>{ size: SizeTypeTokens.Size10 },
          continueSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
          infoLabel: <TypographyProps>{
            label: "Minimum amount required to proceed is ₹25,000",
            fontFamily: FontFamilyTokens.Inter,
            fontWeight: "400",
            fontColor: ColorTokens.Grey_Night,
            fontSize: FontSizeTokens.XS,
            lineHeight: 18,
          },
          card: <CardProps>{
            bgColor: ColorTokens.White,
            body: { widgetItems: [{ id: "header", type: WIDGET.STACK }] },
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
          },
        //   header: <StackProps>{
        //     width: StackWidth.FULL,
        //     type: StackType.row,
        //     alignItems: StackAlignItems.center,
        //     justifyContent: StackJustifyContent.spaceBetween,
        //     padding: { horizontal: SizeTypeTokens.LG },
        //     widgetItems: [
        //       { id: "title", type: WIDGET.TEXT },
        //       { id: "headerRight", type: WIDGET.STACK },
        //     ],
        //   },
          headerRight: <StackProps>{
            type: StackType.row,
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.flexEnd,
            padding: { horizontal: SizeTypeTokens.LG },
            widgetItems: [{ id: "contactUs", type: WIDGET.TAG }],
          },
          contactUs: <TagProps  & WidgetProps>{
            icon: {
              align: IconAlignmentTokens.left,
              name: IconTokens.FAQ,
              size: IconSizeTokens.XL,
            },
            label: "Need help?",
            labelColor: ColorTokens.Primary_100,
            type: TagTypeTokens.DEFAULT,
            bgColor: ColorTokens.Primary_05,
            action: {
              type: ACTION.NAV_TO_CONTACT_US,
              routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
              payload: {},
            },
          },
          contactUsSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
          title: <TypographyProps>{
            label: "Unlock limit",
            fontSize: FontSizeTokens.MD,
            color: ColorTokens.Grey_Night,
            fontFamily: FontFamilyTokens.Poppins,
            fontWeight: "700",
          },
          // Mspace0: <SpaceProps>{ size: SizeTypeTokens.XL },
          creditLimitCard: <CardProps>{
            bgColor: ColorTokens.White,
            body: { widgetItems: [{ id: "body", type: WIDGET.STACK }] },
            alignItems: StackAlignItems.center,
            justifyContent: StackJustifyContent.spaceBetween,
          },
          body: <StackProps>{
            width: StackWidth.FULL,
            type: StackType.column,
            widgetItems: [
              { id: "creditLimit", type: WIDGET.TEXT },
              { id: "space111", type: WIDGET.SPACE },
              { id: "limitCard", type: WIDGET.LIMIT_CARD },
              shouldShowGetMorePortfolio
                ? { id: "otherSourceStack", type: WIDGET.STACK }
                : { id: "skip", type: WIDGET.SPACE },
              { id: "space222", type: WIDGET.SPACE },
              { id: "lendingStack", type: WIDGET.STACK },
            ],
          },
        
          promoCard: <PromoCardProps>{
            data: [
              {
                id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
                title: "Instant access to cash",
                subTitle: "Pay interest only on the borrow amount",
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
              },
              {
                id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
                title: "Low interest rates",
                subTitle: "Pay interest only on the borrow amount",
                image:
                  "data:image/png;base64,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",
              },
              {
                id: "58694a0f-3da1-471f-bd96-145571e29d72",
                title: "Withdraw as per requirements",
                subTitle: "Pay interest only on the borrow amount",
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
              },
              {
                id: "58694a0f-3da1-471f-bd96-145571e29d71",
                title: "No foreclosure charges",
                subTitle: "Pay interest only on the borrow amount",
                image:
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
              },
            ],
            heading: "Benefits for you",
          },
         
    },
}
};

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
