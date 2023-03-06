import {
    Datastore,
    Layout,
    LAYOUTS,
    PageType,
    POSITION,
    TemplateSchema,
    WidgetProps,
} from '@voltmoney/types'
import {
    AccordionArrow,
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
    IconAlignmentTokens,
    IconProps,
    IconSizeTokens,
    IconTokens,
    ImageProps,
    PaddingProps,
    ResizeModeToken,
    SizeTypeTokens,
    SpaceProps,
    StackAlignItems,
    StackHeight,
    StackJustifyContent,
    StackProps,
    StackType,
    StackWidth,
    TagProps,
    TagTypeTokens,
    TypographyProps,
    WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION} from "./types";
import {goBack, goToFaq, sendOtpForPledgeConfirm} from "./actions";
import {AvailableCASItem, StepResponseObject} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import {api} from "../../../configs/api";
import {ConfigTokens, getAppHeader} from "../../../configs/config";
import {getTotalLimit} from "../portfolio/actions";
import _ from "lodash";
import {addCommasToNumber, convertToKLacsCore} from "../../../configs/utils";
import {OtpPayloadForPledgeConfirm} from "../pledge_confirmation/types";
import {AuthCASModel} from "../../../types/AuthCASModel";
import {fetchPledgeLimitRepo} from "../unlock_limit/repo";
import {getDesiredValue} from "../portfolio_readonly/actions";

export const template: (
    totalAmount: number,
    totalCharges: number,
    processingFeesBreakUp: { [key in string]: number },
    stepResponseObject: StepResponseObject,
    showOtpConfirmation: boolean,
    minAmount: number,
    maxAmount: number,
    showLessLimit: boolean,
    mfPortfolioArray,
    pledgeInProgress: boolean,
    term: string,
    interestRate: string
) => Promise<TemplateSchema> = async (
    totalAmount = 0,
    totalCharges = 0,
    processingFeesBreakUp = {},
    stepResponseObject,
    showOtpConfirmation = false,
    minAmount,
    maxAmount,
    showLessLimit = false,
    mfPortfolioArray,
    pledgeInProgress = false,
    term,
    interestRate
) => {
    return {
        layout: <Layout>{
            id: ROUTE.PLEDGE_CONFIRMATION,
            type: LAYOUTS.LIST,
            widgets: [
                {
                    id: "card",
                    type: WIDGET.CARD,
                    position: POSITION.ABSOLUTE_TOP,
                },
                ...(showLessLimit
                    ? [
                        {
                            id: "showLessLimitCard",
                            type: WIDGET.CARD,
                            position: POSITION.ABSOLUTE_TOP,
                        },
                        {
                            id: "continueSpace",
                            type: WIDGET.SPACE,
                            position: POSITION.ABSOLUTE_BOTTOM,
                        },
                    ]
                    : []),
                {
                    id: "card2",
                    type: WIDGET.CARD,
                    padding: {
                        horizontal: 0,
                        all: 0,
                    },
                    position: POSITION.ABSOLUTE_TOP,
                },
                {
                    id: "iconCard",
                    type: WIDGET.CARD,
                    padding: {
                        horizontal: -16
                    }
                },
                { id: "continueSpace2", type: WIDGET.SPACE },
                { id: "interestOptions", type: WIDGET.STACK },
                {
                    id: "spaceCard",
                    type: WIDGET.SPACE,
                    position: POSITION.STICKY_BOTTOM,
                },
                ...(showOtpConfirmation
                    ? [
                        {
                            id: "otpConfirmInfo",
                            type: WIDGET.CARD,
                            position: POSITION.STICKY_BOTTOM,
                        },
                    ]
                    : []),
                ...(pledgeInProgress
                    ? [
                        {
                            id: "showPledgeInProgressCard",
                            type: WIDGET.CARD,
                            position: POSITION.STICKY_BOTTOM,
                        },
                    ]
                    : []),
                {
                    id: "ctaCard",
                    type: WIDGET.CARD,
                    padding: {
                        horizontal: 0,
                        all: 0,
                    },
                    position: POSITION.STICKY_BOTTOM,
                },
            ],
        },
        datastore: <Datastore>{
            showPledgeInProgressCard: <CardProps>{
                bgColor: ColorTokens.Secondary_05,
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
                        { id: "infoIcon3", type: WIDGET.ICON },
                        { id: "infoIconSpace3", type: WIDGET.SPACE },
                        { id: "infoLabel3", type: WIDGET.TEXT },
                    ],
                },
            },
            infoIcon3: <IconProps>{
                name: IconTokens.InfoFilled,
                color: ColorTokens.Secondary_100,
            },
            infoIconSpace3: <SpaceProps>{ size: SizeTypeTokens.Size10 },
            continueSpace2: <SpaceProps>{ size: SizeTypeTokens.LG },
            infoLabel3: <TypographyProps>{
                label: `Rs. ${addCommasToNumber(
                    stepResponseObject.approvedCreditAmount
                )} were pledged successfully. We require 1 OTP to pledge remaining portfolio.`,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontColor: ColorTokens.Grey_Night,
                fontSize: FontSizeTokens.XS,
                lineHeight: 18,
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
                        { id: "infoIcon2", type: WIDGET.ICON },
                        { id: "infoIconSpace2", type: WIDGET.SPACE },
                        { id: "infoLabel2", type: WIDGET.TEXT },
                    ],
                },
            },
            infoIcon2: <IconProps>{
                name: IconTokens.InfoFilled,
                color: ColorTokens.Red_50,
            },
            infoIconSpace2: <SpaceProps>{ size: SizeTypeTokens.Size10 },
            continueSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
            infoLabel2: <TypographyProps>{
                label: "Minimum amount required to proceed is ₹25,000",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontColor: ColorTokens.Grey_Night,
                fontSize: FontSizeTokens.XS,
                lineHeight: 18,
            },
            otpConfirmInfo: <CardProps>{
                bgColor: ColorTokens.Secondary_05,
                width: StackWidth.FULL,
                margin: <PaddingProps>{
                    horizontal: SizeTypeTokens.XL,
                },
                padding: <PaddingProps>{
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
                color: ColorTokens.Secondary_100,
            },
            infoIconSpace: <SpaceProps>{ size: SizeTypeTokens.Size10 },
            infoLabel: <TypographyProps>{
                label: "We will trigger 2 OTP’s to confirm your pledge",
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
            header: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                // padding: { horizontal: SizeTypeTokens.LG },
                widgetItems: pledgeInProgress
                    ? [
                        { id: "title", type: WIDGET.TEXT },
                        { id: "headerRight", type: WIDGET.STACK },
                    ]
                    : [
                          { id: 'headerLeftStack', type: WIDGET.STACK },
                          { id: 'headerRight', type: WIDGET.STACK },
                      ],
            },
            headerLeftStack: <StackProps>{
                type: StackType.row,
                width: StackWidth.CONTENT,
                alignItems: StackAlignItems.center,
                widgetItems: [
                    { id: 'backButton', type: WIDGET.ICON },
                    { id: 'space0', type: WIDGET.SPACE },
                    { id: 'title', type: WIDGET.TEXT },
                ],
            },
            backButton: <IconProps & WidgetProps>{
                name: IconTokens.ChevronLeft,
                size: IconSizeTokens.XS,
                action: {
                    type: ACTION.BACK_BUTTON,
                    routeId: ROUTE.PLEDGE_CONFIRMATION,
                    payload: {},
                },
            },
            space0: <SpaceProps>{ size: SizeTypeTokens.MD },
            headerRight: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.flexEnd,
                // padding: { horizontal: SizeTypeTokens.LG },
                widgetItems: [{ id: "contactUs", type: WIDGET.TAG }],
            },
            contactUs: <TagProps & WidgetProps>{
                icon: {
                    align: IconAlignmentTokens.left,
                    name: IconTokens.FAQ,
                    size: IconSizeTokens.XL,
                },
                label: "FAQ",
                labelColor: ColorTokens.Primary_100,
                type: TagTypeTokens.DEFAULT,
                bgColor: ColorTokens.Primary_05,
                action: {
                    type: ACTION.NAV_TO_FAQ,
                    routeId: ROUTE.PLEDGE_CONFIRMATION,
                    payload: {},
                },
            },
            contactUsSpace: <SpaceProps>{ size: SizeTypeTokens.SM },
            title: <TypographyProps>{
                label: "Confirm pledge",
                fontSize: FontSizeTokens.MD,
                color: ColorTokens.Grey_Night,
                fontFamily: FontFamilyTokens.Poppins,
                fontWeight: "700",
            },
            card2: <CardProps>{
                bgColor: ColorTokens.Primary_05,
                body: { widgetItems: [{ id: "selectedLimit", type: WIDGET.STACK }] },
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
            },
            selectedLimit: <StackProps>{
                padding: { top: SizeTypeTokens.LG, bottom: SizeTypeTokens.LG },
                width: StackWidth.FULL,
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                widgetItems: [
                    { id: "selectedLimitText", type: WIDGET.TEXT },
                    { id: "space1", type: WIDGET.SPACE },
                    { id: "selectedLimitValue", type: WIDGET.STACK },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "divider", type: WIDGET.DIVIDER },
                    { id: "space3", type: WIDGET.SPACE },
                    { id: "selectedLimitText2", type: WIDGET.TEXT },
                    { id: "selectedLimitValue2", type: WIDGET.STACK },
                    { id: "spaceMD", type: WIDGET.SPACE },
                ],
            },
            selectedLimitText: <TypographyProps>{
                label: "Selected credit limit",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
                color: ColorTokens.Grey_Charcoal,
            },
            space1: <SpaceProps>{ size: SizeTypeTokens.XS },
            selectedLimitValue: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.baseline,
                widgetItems: [
                    { id: "ruppee", type: WIDGET.TEXT },
                    { id: "selectedLimitValueText", type: WIDGET.TEXT },
                ],
            },
            ruppee: <TypographyProps>{
                label: "₹",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "700",
                fontSize: FontSizeTokens.XXL,
                color: ColorTokens.Secondary_100,
            },
            selectedLimitValueText: <TypographyProps>{
                label: `${addCommasToNumber(
                    await SharedPropsService.getCreditLimit()
                )}`,
                fontFamily: FontFamilyTokens.Poppins,
                fontWeight: "900",
                fontSize: FontSizeTokens.XXL,
                color: ColorTokens.Secondary_100,
            },
            space: <SpaceProps>{ size: SizeTypeTokens.XL },
            divider: <DividerProps>{
                size: DividerSizeTokens.SM,
                color: ColorTokens.Grey_Chalk,
            },
            space3: <SpaceProps>{ size: SizeTypeTokens.Size6 },
            selectedLimitText2: <TypographyProps>{
                label: "Selected mutual funds",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
                color: ColorTokens.Grey_Charcoal,
            },
            selectedLimitValue2: <StackProps>{
                type: StackType.row,
                alignItems: StackAlignItems.baseline,
                widgetItems: [
                    { id: "ruppee2", type: WIDGET.TEXT },
                    { id: "selectedLimitValueText3", type: WIDGET.TEXT },
                    { id: "selectedLimitValueText4", type: WIDGET.TEXT },
                ],
            },
            ruppee2: <TypographyProps>{
                label: "₹",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "700",
                fontSize: FontSizeTokens.MD,
            },
            selectedLimitValueText3: <TypographyProps>{
                label: `${addCommasToNumber(
                    parseInt(await SharedPropsService.getDesiredPortfolio())
                )}`,
                fontFamily: FontFamilyTokens.Poppins,
                fontWeight: "700",
                fontSize: FontSizeTokens.MD,
                color: ColorTokens.Grey_Night,
            },
            selectedLimitValueText4: <TypographyProps>{
                label: ` out of ₹${addCommasToNumber(
                    parseInt(stepResponseObject["totalPortfolioAmount"].toString())
                )}`,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.XS,
                color: ColorTokens.Grey_Night,
            },
            processingFeeDropDown: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                widgetItems: [
                    {id: "processingCard", type: WIDGET.STACK},
                    {id: "spaceSize6", type: WIDGET.SPACE},
                ],
            },

            spaceSize6: <SpaceProps> {
                size: SizeTypeTokens.XL
            },
            processingText: <TypographyProps> {
                label: "Processing fee",
                fontSize: FontSizeTokens.MD,
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 24
            },
            processingValue: <TypographyProps> {
                label: `₹1000`,
                fontSize: FontSizeTokens.MD,
                marginRight: 8,
                color: ColorTokens.Grey_Charcoal
            },
            processingGSTText: <TypographyProps> {
                label: "GST @18%",
                fontSize: FontSizeTokens.MD,
                color: ColorTokens.Grey_Charcoal,
                lineHeight: 24
            },
            processingGSTValue: <TypographyProps> {
                label: `₹180`,
                fontSize: FontSizeTokens.MD,
                marginRight: 8,
                color: ColorTokens.Grey_Charcoal
            },
            processingCard: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                bgColor: ColorTokens.Yellow_10,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XXXXXL
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardText", type: WIDGET.TEXT}
                ],
            },
            interestRateS1: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                padding: {
                    top: SizeTypeTokens.SM,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestRateT1", type: WIDGET.TEXT}
                ],
            },
            interestRateS2: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                padding: {
                    top: SizeTypeTokens.SM,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestRateT2", type: WIDGET.TEXT}
                ],
            },
            interestAutoPayS1: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                padding: {
                    top: SizeTypeTokens.SM,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestAutoPayT1", type: WIDGET.TEXT}
                ],
            },
            interestAutoPayS2: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                padding: {
                    top: SizeTypeTokens.SM,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestAutoPayT2", type: WIDGET.TEXT}
                ],
            },
            withdrawalS1: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "withdrawalT1", type: WIDGET.TEXT}
                ],
            },
            withdrawalS2: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                padding: {
                    top: SizeTypeTokens.SM,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "withdrawalT2", type: WIDGET.TEXT}
                ],
            },
            termDropDownAccordion: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                widgetItems: [
                    {id: "termCard", type: WIDGET.STACK},
                    {id: "spaceSize6", type: WIDGET.SPACE},
                ],
            },
            termCard: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                bgColor: ColorTokens.Yellow_10,
                padding: {
                    top: SizeTypeTokens.LG,
                    bottom: SizeTypeTokens.LG,
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "termT1", type: WIDGET.TEXT}
                ],
            },
            foreclosureDropDownAccordion: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                widgetItems: [
                    { id: "foreclosureCard", type: WIDGET.STACK },
                    { id: "spaceSize6", type: WIDGET.SPACE }
                ]
            },
            foreclosureCard: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.row,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                bgColor: ColorTokens.Yellow_10,
                padding: {
                    top: SizeTypeTokens.LG,
                    bottom: SizeTypeTokens.LG
                },
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "pCardIcon", type: WIDGET.ICON},
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "foreClosureT1", type: WIDGET.TEXT}
                ],
            },
            interestRateAccordion: <StackProps> {
               width: StackWidth.FULL,
               type: StackType.row,
               widgetItems: [
                   { id: "interestRateCard", type: WIDGET.STACK },
                   { id: "spaceSize6", type: WIDGET.SPACE },
               ]
            },
            interestRateCard: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                marginRight: 12,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM
                },
                bgColor: ColorTokens.Yellow_10,
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestRateS1", type: WIDGET.STACK},
                    {id: "contactUsSpace", type: WIDGET.SPACE},
                    {id: "interestRateS2", type: WIDGET.STACK},
                    {id: "space3", type: WIDGET.SPACE},
                ],
            },
            interestAutoPayAccordion: <StackProps> {
               width: StackWidth.FULL,
               type: StackType.row,
               widgetItems: [
                   { id: "interestAutoPayCard", type: WIDGET.STACK },
                   {id: "spaceSize6", type: WIDGET.SPACE }
               ]
            },
            interestAutoPayCard: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                marginRight: 12,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM
                },
                bgColor: ColorTokens.Yellow_10,
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "interestAutoPayS1", type: WIDGET.STACK},
                    {id: "contactUsSpace", type: WIDGET.SPACE},
                    {id: "interestAutoPayS2", type: WIDGET.STACK},
                    {id: "space3", type: WIDGET.SPACE},
                ],
            },
            withdrawalDropDownAccordion: <StackProps> {
              width: StackWidth.FULL,
              type: StackType.row,
              widgetItems: [
                  { id: "withdrawalCard", type: WIDGET.STACK },
                  { id: "spaceSize6", type: WIDGET.SPACE },
              ]
            },
            withdrawalCard: <StackProps> {
                width: StackWidth.FULL,
                height: StackHeight.CONTENT,
                type: StackType.column,
                alignItems: StackAlignItems.flexStart,
                borderRadius: 4,
                marginRight: 12,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM
                },
                bgColor: ColorTokens.Yellow_10,
                widgetItems: [
                    {id: "space3", type: WIDGET.SPACE},
                    {id: "withdrawalS1", type: WIDGET.STACK},
                    {id: "contactUsSpace", type: WIDGET.SPACE},
                    {id: "withdrawalS2", type: WIDGET.STACK},
                    {id: "space3", type: WIDGET.SPACE},
                ],
            },
            pCardIcon: <IconProps> {
                name: IconTokens.CoveredRightArrow,
                size: IconSizeTokens.SM,
                align: IconAlignmentTokens.center,
                color: ColorTokens.Grey_Charcoal,
            },
            pCardText: <TypographyProps> {
                label: "One-time processing fee, no hidden charges",
                fontSize: FontSizeTokens.XS,
            },
            interestRateT1: <TypographyProps> {
                label: "Interest charged only on usage",
                fontSize: FontSizeTokens.XS,
            },
            interestRateT2: <TypographyProps> {
                label: "Monthly interest of ₹79 on withdrawal of ₹10,000",
                fontSize: FontSizeTokens.XS,
            },
            interestAutoPayT1: <TypographyProps> {
                label: "Interest statement will be generated at the end of month",
                fontSize: FontSizeTokens.XS,
            },
            interestAutoPayT2: <TypographyProps> {
                label: "Hassle-free auto repayment of interest on 7th of month",
                fontSize: FontSizeTokens.XS,
            },
            withdrawalT1: <TypographyProps> {
                label: "Withdraw money as per your convenience",
                fontSize: FontSizeTokens.XS,
            },
            withdrawalT2: <TypographyProps> {
                label: "Repay anytime during the month",
                fontSize: FontSizeTokens.XS,
            },
            termT1: <TypographyProps> {
                label: "Term can be renewed without repaying principal.",
                fontSize: FontSizeTokens.XS,
            },
            foreClosureT1: <TypographyProps> {
                label: "No hidden charges",
                fontSize: FontSizeTokens.XS,
            },
            otherChargesStack: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                widgetItems: [
                    { id: "otherChargesText", type: WIDGET.TEXT },
                ],
            },
            otherChargesText: <TypographyProps>{
                label: "Interest and other charges",
                fontFamily: FontFamilyTokens.Poppins,
                fontWeight: "500",
                fontSize: FontSizeTokens.MD,
            },

            interestAccordion: <AccordionProps> {
                icon: IconTokens.DownArrow,
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{ id: "interestRateStack", type: WIDGET.STACK }],
                        },
                        body: {
                            widgetItems: [
                                { id: "interestRateAccordion", type: WIDGET.STACK, },
                            ],
                        },
                    },
                ],
                type: AccordionTypeTokens.LIST
            },
            autoPayAccordion: <AccordionProps> {
                icon: IconTokens.DownArrow,
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{ id: "autoPayStack", type: WIDGET.STACK }],
                        },
                        body: {
                            widgetItems: [
                                { id: "interestAutoPayAccordion", type: WIDGET.STACK },
                            ],
                        },
                    },
                ],
                type: AccordionTypeTokens.LIST
            },
            withdrawalAccordion: <AccordionProps> {
                icon: IconTokens.DownArrow,
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{ id: "withdrawalStack", type: WIDGET.STACK }],
                        },
                        body: {
                            widgetItems: [
                                { id: "withdrawalDropDownAccordion", type: WIDGET.STACK },
                            ],
                        },
                    },
                ],
                type: AccordionTypeTokens.LIST,
            },
            termAccordion: <AccordionProps> {
                icon: IconTokens.DownArrow,
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{id: "termStack", type: WIDGET.STACK}],
                        },
                        body: {
                            widgetItems: [
                                {id: "termDropDownAccordion", type: WIDGET.STACK, padding: {
                                        bottom: -12
                                    }},
                            ],
                        },
                    },
                ],
                type: AccordionTypeTokens.LIST
            },

            foreClosureAccordion: <AccordionProps> {
                icon: IconTokens.DownArrow,
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{ id: "foreClosureStack", type: WIDGET.STACK }],
                        },
                        body: {
                            widgetItems: [
                                { id: "foreclosureDropDownAccordion", type: WIDGET.STACK },
                            ],
                        },
                    },
                ],
                type: AccordionTypeTokens.LIST
            },

            processingAccordion: <AccordionProps> {
                rightIcon: AccordionArrow.LEFT,
                data: [
                    {
                        id: 2,
                        header: {
                            widgetItems: [{ id: "processingStack", type: WIDGET.STACK },
                            ],
                        },
                        body: {
                            widgetItems: [
                                {id: "processingFeeDropDown", type: WIDGET.STACK },
                            ],

                        },
                    },
                ],
                type: AccordionTypeTokens.LIST
            },
            spaceXL: <SpaceProps>{ size: SizeTypeTokens.XL },
            interestOptions: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.column,
                widgetItems: [
                    { id: "otherChargesStack", type: WIDGET.STACK },
                    {id: "processingAccordion", type: WIDGET.ACCORDION},
                    {id: "divider", type: WIDGET.DIVIDER},
                    {id: "interestAccordion", type: WIDGET.ACCORDION},
                    {id: "divider", type: WIDGET.DIVIDER},
                    {id: "autoPayAccordion", type: WIDGET.ACCORDION},
                    {id: "divider", type: WIDGET.DIVIDER},
                    {id: "withdrawalAccordion", type: WIDGET.ACCORDION},
                    {id: "divider", type: WIDGET.DIVIDER},
                    {id: "termAccordion", type: WIDGET.ACCORDION},
                    {id: "divider", type: WIDGET.DIVIDER},
                    {id: "foreClosureAccordion", type: WIDGET.ACCORDION},
                ]
            },
            processingMainStack: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.column,

            },
            processingStack: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "processingFeeText", type: WIDGET.TEXT },
                    { id: "processingFeeValue", type: WIDGET.TEXT },
                ],
            },
            processingFeeText: <TypographyProps>{
                label: "Processing fee (excl. GST)",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            processingFeeValue: <TypographyProps>{
                label: `₹${stepResponseObject["processingFees"]}`,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 20
            },
            spaceLG: <SpaceProps>{ size: SizeTypeTokens.LG },
            interestRateStack: <StackProps>{
                type: StackType.row,
                width: StackWidth.FULL,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "interestRateText", type: WIDGET.TEXT },
                    { id: "interestRateValue", type: WIDGET.TEXT },
                ],
            },
            interestRateText: <TypographyProps>{
                label: "Interest rate",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            interestRateValue: <TypographyProps>{
                label: `${interestRate}%`,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 20
            },
            autoPayStack: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "autoPayText", type: WIDGET.TEXT },
                    { id: "autoPayValue", type: WIDGET.TEXT },
                ],
            },
            autoPayText: <TypographyProps>{
                label: "Interest autopay",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            autoPayValue: <TypographyProps>{
                label: "7th of every month",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 20
            },
            withdrawalStack: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "withdrawalText", type: WIDGET.TEXT },
                    { id: "withdrawalType", type: WIDGET.TEXT },
                ],
            },
            termStack: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "termText", type: WIDGET.TEXT },
                    { id: "durationValue", type: WIDGET.TEXT },
                ],
            },
            foreClosureStack: <StackProps> {
                width: StackWidth.FULL,
                type: StackType.row,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.SM,
                    bottom: SizeTypeTokens.SM,
                    right: SizeTypeTokens.XL
                },
                widgetItems: [
                    { id: "foreClosureText", type: WIDGET.TEXT },
                    { id: "foreClosureType", type: WIDGET.TEXT },
                ],
            },
            durationText: <TypographyProps>{
                label: "Duration",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            withdrawalText: <TypographyProps> {
                label: "Withdrawal & repayment",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            downArrow: <IconProps> {
                name: IconTokens.ChevronDown,
                align: IconAlignmentTokens.center
            },
            termText: <TypographyProps> {
                label: "Term",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            foreClosureText: <TypographyProps> {
                label: "Foreclosure",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            durationValue: <TypographyProps>{
                label: `${term} months`,
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 20
            },
            withdrawalType: <TypographyProps> {
                label: "Flexi",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 20
            },
            foreClosureType: <TypographyProps> {
                label: "Free",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "600",
                fontSize: FontSizeTokens.SM,
                marginRight: 16
            },
            iconStack: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.row,
                color: ColorTokens.Grey_Milk,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: {
                    top: SizeTypeTokens.XS,
                },
                widgetItems: [
                    { id: 'lendingTXT', type: WIDGET.TEXT },
                    { id: 'space11', type: WIDGET.SPACE },
                    { id: 'bajaj', type: WIDGET.ICON },
                    // { id: "space12", type: WIDGET.SPACE },
                    // { id: "mirae", type: WIDGET.IMAGE },
                ],
            },
            lendingTXT: <TypographyProps>{
                label: "Lending partner",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.XS,
            },
            space11: <SpaceProps>{ size: SizeTypeTokens.MD },
            bajaj: <IconProps>{
                name: IconTokens.Bajaj,
                size: IconSizeTokens.Size52,
            },
            spaceMD: <SpaceProps>{ size: SizeTypeTokens.MD },
            // mirae: <ImageProps>{
            //   uri: "https://volt-images.s3.ap-south-1.amazonaws.com/mirae-assets.svg",
            //   height: 22,
            //   width: 80,
            //   resizeMode: ResizeModeToken.CONTAIN,
            //   padding: SizeTypeTokens.NONE,
            // },
            // spaceCard: <SpaceProps>{ size: SizeTypeTokens.LG },
            ctaText: <TypographyProps>{
                label: "Total amount",
                fontFamily: FontFamilyTokens.Inter,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
            },
            portfolioTitle: <TypographyProps>{
                label: "Processing fee (incl. GST)",
                fontFamily: FontFamilyTokens.Poppins,
                color: ColorTokens.Grey_Night,
                fontWeight: "400",
                fontSize: FontSizeTokens.SM,
                lineHeight: 24,
            },
            //portfolioCard
            portfolioCard: <TypographyProps>{
                label: "Check portfolio credit limit",
                fontFamily: FontFamilyTokens.Poppins,
                color: ColorTokens.Grey_Night,
                fontWeight: "600",
                fontSize: FontSizeTokens.MD,
                lineHeight: 24,
            },
            iconCard: <CardProps>{
                width: '100%',
                bgColor: ColorTokens.Grey_Milk,
                body: { widgetItems: [{ id: "iconStack", type: WIDGET.STACK }] },
                justifyContent: StackJustifyContent.spaceBetween,
            },
            ctaCard: <CardProps>{
                bgColor: ColorTokens.White,
                body: { widgetItems: [{ id: "ctaBody", type: WIDGET.STACK }] },
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.spaceBetween,
                padding: <PaddingProps>{
                    top: SizeTypeTokens.SIZE18,
                    bottom: SizeTypeTokens.SIZE18,
                },
            },
            ctaBody: <StackProps>{
                width: StackWidth.FULL,
                type: StackType.column,
                alignItems: StackAlignItems.center,
                justifyContent: StackJustifyContent.center,
                widgetItems: [
                    {
                        id: "ctaButton",
                        type: WIDGET.BUTTON,
                    },
                ],
            },
            ctaButton: <ButtonProps & WidgetProps>{
                label: "Continue to get OTP",
                fontWeight: "700",
                fontFamily: FontFamilyTokens.Inter,
                fontSize: FontSizeTokens.SM,
                type: showLessLimit
                    ? ButtonTypeTokens.LargeOutline
                    : ButtonTypeTokens.LargeFilled,
                width: ButtonWidthTypeToken.FULL,
                action: {
                    type: ACTION.SEND_OTP_FOR_PLEDGE_CONFIRM,
                    routeId: ROUTE.PLEDGE_CONFIRMATION,
                    payload: <OtpPayloadForPledgeConfirm>{
                        value: stepResponseObject,
                        widgetId: "ctaButton",
                        isResend: false,
                        portFolioArray: mfPortfolioArray,
                    },
                },
            },
            spaceCard: <SpaceProps>{ size: SizeTypeTokens.LG },
        },
    };
};

export const pledgeConfirmationMFV2: PageType<any> = {
    onLoad: async ({ network, setDatastore }, { stepResponseObject }) => {
        let pledgeInProgress = false;
        let mfPortfolioArray: AvailableCASItem[] = [];
        let portfolioForComputingProcessingCharge: AvailableCASItem[];

        // call pledge limit api if stepResponseObject is null
        if (stepResponseObject === undefined || stepResponseObject === null) {
            pledgeInProgress = true;
            const authCAS: AuthCASModel =
                await SharedPropsService.getAuthCASResponse();
            const pledgeLimitResponse = authCAS
                ? { data: authCAS }
                : await fetchPledgeLimitRepo().then((response) => ({
                    data: response,
                }));
            stepResponseObject = pledgeLimitResponse.data.stepResponseObject;
        }

        const applicationId = (await SharedPropsService.getUser())
            .linkedApplications[0].applicationId;

        if (!pledgeInProgress) {
            mfPortfolioArray = (stepResponseObject as StepResponseObject)
                .availableCAS;
            mfPortfolioArray.forEach((_item, index) => {
                mfPortfolioArray[index].is_pledged = _item.pledgedUnits > 0;
            });
            portfolioForComputingProcessingCharge = mfPortfolioArray;

            /// Pledging has not started save portfolio to backend
            const savePortfolioResponse = await network.post(
                api.savePortfolio,
                {
                    applicationId: applicationId,
                    portfolioItemList: mfPortfolioArray,
                },
                { headers: await getAppHeader() }
            );
        } else {
            mfPortfolioArray = (stepResponseObject as StepResponseObject)
                .tobePledgedPortfolio;

            portfolioForComputingProcessingCharge = [...mfPortfolioArray];
            portfolioForComputingProcessingCharge.push(
                ...(stepResponseObject as StepResponseObject).pledgedPortfolio
            );
        }
        await SharedPropsService.setToBePledgedAssets(mfPortfolioArray)
        /// fetch processing fee
        const response = await network.post(
            api.processingCharges,
            {
                applicationId: applicationId,
                mutualFundPortfolioItems: portfolioForComputingProcessingCharge,
            },
            { headers: await getAppHeader() }
        );
        const pledgeData = await network.get(`${api.pledgeLimit}${applicationId}`, {
            headers: await getAppHeader(),
        });

        const portValue = getDesiredValue(
            mfPortfolioArray,
            stepResponseObject.isinNAVMap
        );

        const desiredLimit = getTotalLimit(
            mfPortfolioArray,
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
        );

        const totalAmount = getTotalLimit(
            stepResponseObject.availableCAS,
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
        );

        if (pledgeInProgress) {
            await SharedPropsService.setCreditLimit(desiredLimit);
        }

        const interestRate = _.get(pledgeData, "data.stepResponseObject.interestRate")
        const term = _.get(pledgeData, "data.stepResponseObject.loanTenureInMonths")

        await SharedPropsService.setDesiredPortfolio(portValue);

        const processingFeesBreakUp = _.get(
            response,
            "data.stepResponseObject.processingChargesBreakup",
            {}
        );
        const totalCharges = _.get(
            response,
            "data.stepResponseObject.totalCharges",
            0
        );

        const assetTypeMap = {};
        /*** check unique asset type */
        mfPortfolioArray.forEach((item) => {
            if (item.is_pledged) assetTypeMap[item.assetRepository] = true;
        });
        /*** show 2 otp confirmation if both Karvy and CAMS is present */
        const showOtpConfirmation: boolean = Object.keys(assetTypeMap).length > 1;

        const minAmount = await SharedPropsService.getConfig(
            ConfigTokens.MIN_AMOUNT_ALLOWED
        );
        const maxAmount = await SharedPropsService.getConfig(
            ConfigTokens.MAX_AMOUNT_ALLOWED
        );

        let showLessLimit: boolean;

        if (!pledgeInProgress) {
            (await SharedPropsService.getCreditLimit()) < 25000
                ? (showLessLimit = true)
                : (showLessLimit = false);
        }

        return Promise.resolve(
            template(
                totalAmount,
                totalCharges,
                processingFeesBreakUp,
                stepResponseObject as StepResponseObject,
                showOtpConfirmation,
                minAmount,
                maxAmount,
                showLessLimit,
                mfPortfolioArray,
                pledgeInProgress,
                term,
                interestRate,
            )
        );
    },
    actions: {
        [ACTION.NAV_TO_FAQ]: goToFaq,
        [ACTION.BACK_BUTTON]: goBack,
        [ACTION.SEND_OTP_FOR_PLEDGE_CONFIRM]: sendOtpForPledgeConfirm,
    },
    clearPrevious: true,
};