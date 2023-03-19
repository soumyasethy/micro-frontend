import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import _ from "lodash";
import {
  AccordionArrow,
  AccordionProps,
  AccordionTypeTokens,
  BorderRadiusTokens,
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
  ImageSizeTokens,
  LimitCardProps,
  LimitCardTypeTokens,
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
import {accordionData, ACTION, GetMoreMfPortfolioPayload, pagePayload,} from "./types";
import {getMoreMfPortfolio, goBack, goKfin, goPortfolio, goToNext,} from "./action";
import {addCommasToNumber, isMorePortfolioRenderCheck,} from "../../../configs/utils";
import {StepResponseObject, UpdateAvailableCASMap,} from "../unlock_limit/types";
import {AuthCASModel, StepStatusMap} from "../../../types/AuthCASModel";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import {fetchPledgeLimitRepo} from "../unlock_limit/repo";
import {getDesiredValue} from "../portfolio_readonly/actions";
import {User} from "../../login/otp_verify/types";
import {AvailableCASItem} from "../unlock_limit_landing_V2/types";
import {api} from "../../../configs/api";
import {AssetRepositoryType, getAppHeader} from "../../../configs/config";

let availableCASX: AvailableCASItem[];

export const template: (
    activeIndexs: number,
    availableCreditAmount: number,
    availableCAS: AvailableCASItem[],
    stepResponseObject: StepResponseObject,
    shouldShowGetMorePortfolio: boolean,
    totalPortfolioAmount: number,
    processingFeesBreakUp: { [key in string]: number },
    updateAvailableCASMap: UpdateAvailableCASMap,
    showLessLimit: boolean,
    camsAmount: number,
    KFintech: number,
    term: string,
    interestRate: string,
) => Promise<TemplateSchema> = async (
    activeIndexs,
    availableCreditAmount,
    availableCAS,
    stepResponseObject,
    shouldShowGetMorePortfolio,
    totalPortfolioAmount,
    processingFeesBreakUp = {},
    updateAvailableCASMap,
    showLessLimit = false,
    camsAmount,
    KFintechAmount,
    term,
    interestRate
) => {
  return {
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
            horizontal: -16,
          },
        },
        {
          id: "iconCard",
          type: WIDGET.CARD,
          padding: {
            horizontal: -16
          }
        },
        {
          id: "trial2Accordion",
          type: WIDGET.ACCORDION,
          padding: {
            horizontal: -16,
          },
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
        activeIndex: activeIndexs,
        data: [
          {
            id: 1,
            header: {
              widgetItems: [{ id: "portfolioTitleStack", type: WIDGET.STACK }],
            },
            body: {
              widgetItems: [
                { id: "portfolioCard", type: WIDGET.CARD },
              ],
            },
          },
          {
            id: 2,
            header: {
              widgetItems: [{ id: "setCreditLimitStack", type: WIDGET.STACK }],
            },
            body: {
              widgetItems: [
                { id: "amountCard", type: WIDGET.LIMIT_CARD },
                { id: "amountSpaces", type: WIDGET.SPACE },
                { id: "amountcontinue", type: WIDGET.BUTTON },
              ],
            },
          },
        ],
        type: AccordionTypeTokens.LIST,
      },
      trial2Accordion: <AccordionProps> {
        activeIndex: activeIndexs,
        data: [
          {
            id: 2,
            header: {
              widgetItems: [{ id: "otherChargesStack", type: WIDGET.STACK }],
            },
            body: {
              widgetItems: [
                {id: "interestOptions", type: WIDGET.STACK}
              ],
            },
          },
          {
            id: 2,
            header: {
              widgetItems: [{ id: "benefitsStack", type: WIDGET.STACK }],
            },
            body: {
              widgetItems: [{ id: "promoStackRoot", type: WIDGET.STACK }],
            },
          }
        ],
        type: AccordionTypeTokens.LIST
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
      worksTitle: <TypographyProps>{
        label: "Benefits for you",
        fontFamily: FontFamilyTokens.Poppins,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
      },
      portfolioTitleStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        height: StackHeight.CONTENT,
        padding: {
          top: SizeTypeTokens.Size6,
          bottom: SizeTypeTokens.Size6
        },
        widgetItems: [
          { id: "space3", type: WIDGET.SPACE },
          {id: "portfolioTitle", type: WIDGET.TEXT},
          { id: "space3", type: WIDGET.SPACE }
        ],
      },

      setCreditLimitStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        height: StackHeight.CONTENT,
        padding: {
          top: SizeTypeTokens.Size6,
          bottom: SizeTypeTokens.Size6
        },
        widgetItems: [
          { id: "space3", type: WIDGET.SPACE },
          { id: "creditTitle", type: WIDGET.TEXT },
          { id: "space3", type: WIDGET.SPACE }
        ],
      },

      benefitsStack: <StackProps> {
        type: StackType.column,
        width: StackWidth.FULL,
        height: StackHeight.CONTENT,
        padding: {
          top: SizeTypeTokens.Size6,
          bottom: SizeTypeTokens.Size6
        },
        widgetItems: [
          { id: "space3", type: WIDGET.SPACE },
          { id: "worksTitle", type: WIDGET.TEXT },
          { id: "space3", type: WIDGET.SPACE },
        ],
      },
      portfolioTitle: <TypographyProps>{
        label: "Check portfolio credit limit",
        fontFamily: FontFamilyTokens.Poppins,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
      },
      creditTitle: <TypographyProps>{
        label: "Set credit limit",
        fontFamily: FontFamilyTokens.Poppins,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.MD,
        lineHeight: 24,
      },
      // portfolioAccordion: <AccordionProps>{
      //     body: {
      //         widgetItems: [
      //             { id: "portfolioCard", type: WIDGET.CARD },
      //         ]
      //     },
      //     title: 'Check portfolio credit limit',
      //     description: 'We would love to hear from you. You can get back to us via Call, Email or WhatsApp.',
      //     icon: IconTokens.DownArrow,
      //     type: AccordionTypeTokens.LIST,
      // },
      portfolioCard: <CardProps>{
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
            { id: "continue", type: WIDGET.BUTTON },
          ],
        },
      },
      portfolioValue: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id:  "space1", type: WIDGET.STACK },

          { id: "value1", type: WIDGET.TEXT },
        ],
      },
      space1: <StackProps>{
        type: StackType.row,

        widgetItems: [{ id: "key1", type: WIDGET.TEXT }],
      },
      interestOptions: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.column,
        padding: {
          left: SizeTypeTokens.LG,
          right: SizeTypeTokens.MD
        },
        widgetItems: [
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
      divider: <DividerProps>{
        size: DividerSizeTokens.SM,
        color: ColorTokens.Grey_Chalk,
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
        label: `Interest statement will be generated at the end of month`,
        fontSize: FontSizeTokens.XS,
      },
      interestAutoPayT2: <TypographyProps> {
        label: `Hassle-free auto repayment of interest on 7th of month`,
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
        type: StackType.column,
        widgetItems: [
          { id: "space3", type: WIDGET.SPACE },
          { id: "otherChargesText", type: WIDGET.TEXT },
          { id: "sourceSpaces", type: WIDGET.SPACE },
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
                { id: "interestRateAccordionStack", type: WIDGET.STACK, },
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
                { id: "interestAutopayAccordionStack", type: WIDGET.STACK },
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
                { id: "withdrawAccordionStack", type: WIDGET.STACK },
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
                {id: "termAccordionStack", type: WIDGET.STACK, padding: {
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
                { id: "foreClosureAccordionStack", type: WIDGET.STACK },
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
      withdrawAccordionStack: <StackProps> {
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
      termAccordionStack: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.row,
        widgetItems: [
          { id: "termCard", type: WIDGET.STACK },
          { id: "spaceSize6", type: WIDGET.SPACE },
        ]
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
      foreClosureAccordionStack: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.row,
        widgetItems: [
          { id: "foreclosureCard", type: WIDGET.STACK },
          { id: "spaceSize6", type: WIDGET.SPACE },
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
          {id: "space1", type: WIDGET.SPACE},
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
          {id: "space1", type: WIDGET.SPACE},
          {id: "interestRateT2", type: WIDGET.TEXT}
        ],
      },
      interestRateAccordionStack: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.row,
        borderRadius: 4,
        widgetItems: [
          { id: "interestRateCard", type: WIDGET.STACK },
          { id: "spaceSize6", type: WIDGET.SPACE },
        ]
      },
      interestAutopayAccordionStack: <StackProps> {
        width: StackWidth.FULL,
        type: StackType.row,
        borderRadius: 4,
        widgetItems: [
          { id: "interestAutoPayCard", type: WIDGET.STACK },
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
      withdrawalText: <TypographyProps> {
        label: "Withdrawal & repayment",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      withdrawalType: <TypographyProps> {
        label: "Flexi",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        marginRight: 20
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
      foreClosureText: <TypographyProps> {
        label: "Foreclosure",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      foreClosureType: <TypographyProps> {
        label: "Free",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        marginRight: 16
      },
      termText: <TypographyProps> {
        label: "Term",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      space11: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      portfolioSpaces: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      key1: <TypographyProps>{
        label: "Portfolio value",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        lineHeight: 18,
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
        widgetItems: [{ id: "key2", type: WIDGET.TEXT }],
      },
      space22: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      key2: <TypographyProps>{
        label: "Available limit",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        lineHeight: 18,
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
        size: SizeTypeTokens.XXL,
      },
      sourceValue: <StackProps>{
        type: StackType.row,
        widgetItems: [{ id: "key3", type: WIDGET.TEXT }],
      },
      sourceSpaces: <SpaceProps>{
        size: SizeTypeTokens.XS,
      },
      space3: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      key3: <TypographyProps>{
        label: "SOURCE",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XXS,
        lineHeight: 16,
      },
      contentCards: <StackProps>{
        type: StackType.row,

        widgetItems: [
          { id: "contentSpace", type: WIDGET.SPACE },
          { id: "contentCard", type: WIDGET.LIMIT_CARD },
        ],
      },
      contentSpace: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      contentCard: <LimitCardProps>{
        data: [
          {
            label: "From CAMS",
            limitAmount:
                camsAmount === 0
                    ? "No portfolio fetched"
                    : `Value: ₹ ${addCommasToNumber(camsAmount)}`,
            secondrylabel: "From KFintech",
            payload: AssetRepositoryType.CAMS,
            fetchedAmount: "Value: ₹20,00,000",
            isSecondryAction: true,
            isPrimaryAction: camsAmount !== 0,
            refreshAction: {
              type: ACTION.NAV_PORTFOLIO,
              payload: <pagePayload>{
                value: null,
                widgetID: "contentCard",
              },
              routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
          },
          {
            label: "From KFintech",
            limitAmount:
                KFintechAmount === 0
                    ? "No portfolio fetched"
                    : `Value: ₹ ${addCommasToNumber(KFintechAmount)}`,
            secondrylabel: "From KFintech",
            payload: AssetRepositoryType.KARVY,
            fetchedAmount: "Value: ₹20,00,000",
            isSecondryAction: true,
            isPrimaryAction: KFintechAmount !== 0,
            refreshAction: {
              type: ACTION.NAV_PORTFOLIO,
              payload: <pagePayload>{
                value: null,
                widgetID: "contentCard",
                assetRepository: AssetRepositoryType.KARVY,
              },
              routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
            },
          },
        ],
        // label: 'From CAMS',
        // limitAmount: KFintechAmount === 0 ? 'No portfolio fetched' : `Value: ₹ ${addCommasToNumber(KFintechAmount)}`,
        // secondrylabel: 'From KFintech',
        // fetchedAmount: KFintechAmount === 0 ? 'No portfolio fetched' : `Value: ₹ ${addCommasToNumber(KFintechAmount)}`,
        type: LimitCardTypeTokens.LIST,
        isView: false,
        // isPrimaryAction: camsAmount === 0 ? false : true,
        // isSecondryAction: KFintechAmount === 0 ? false: true,
        action: {
          type: ACTION.GET_MORE_MF_PORTFOLIO,
          payload: <GetMoreMfPortfolioPayload>{
            casList: stepResponseObject.availableCAS,
            value: null,
            widgetID: "contentCard",
          },
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
        },
        // refreshAction: {
        //     type: ACTION.NAV_PORTFOLIO,
        //     payload: <pagePayload>{
        //         value: null,
        //         widgetID: "contentCard",
        //     },
        //     routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
        // }
      },

      portfolioSpace: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      amountCard: <LimitCardProps>{
        label: "Available credit limit",
        limitAmount: `${addCommasToNumber(availableCreditAmount)}`,
        secondrylabel: "Available portfolio",
        fetchedAmount: `${addCommasToNumber(totalPortfolioAmount)}`,
        isView: false,
        type: LimitCardTypeTokens.DEFAULT,
      },
      amountSpaces: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },
      amountcontinue: <ButtonProps>{
        label: "Continue",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "700",
        width: ButtonWidthTypeToken.FULL,
        type: ButtonTypeTokens.MediumFilled,
        labelColor: ColorTokens.White,
        action: {
          type: ACTION.PORTFOLIO,
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
          payload: {},
        },
      },
      cardSpaces: <SpaceProps>{
        size: SizeTypeTokens.XL,
      },

      spaceSize6: <SpaceProps> {
        size: SizeTypeTokens.XL
      },
      continue: <ButtonProps>{
        label: "Continue to set credit limit",
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        width: ButtonWidthTypeToken.FULL,
        type:
            camsAmount !== 0 && KFintechAmount !== 0
                ? ButtonTypeTokens.MediumFilled
                : ButtonTypeTokens.MediumSoftFilled,
        labelColor:
            camsAmount !== 0 && KFintechAmount !== 0
                ? ColorTokens.White
                : ColorTokens.Primary_100,
        action: {
          type: ACTION.NAV_NEXT,
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
          payload: <accordionData>{
            activeIndex: 2,
          },
        },
      },
      creditSpace: <SpaceProps>{
        size: SizeTypeTokens.XL,
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
      processingFeeSpace: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      space5: <SpaceProps>{ size: SizeTypeTokens.LG },
      divider2: <DividerProps>{
        size: DividerSizeTokens.SM,
        color: ColorTokens.Grey_Milk_1,
      },
      space6: <SpaceProps>{ size: SizeTypeTokens.LG },

      autoPayTextStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        widgetItems: [
          { id: "autoPayTextSpace", type: WIDGET.SPACE },
          { id: "autoPayText", type: WIDGET.TEXT },
          { id: "autoPayTextSpace1", type: WIDGET.SPACE },
          // { id: "autoPayIcon", type: WIDGET.ICON },
        ],
      },
      autoPayTextSpace: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },

      autoPayTextSpace1: <SpaceProps>{
        size: SizeTypeTokens.XS,
      },
      processingFeeDropDown: <StackProps> {
        width: StackWidth.FULL,
        height: StackHeight.CONTENT,
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          {id: "processingCard", type: WIDGET.STACK },
          {id: "spaceSize6", type: WIDGET.SPACE},
        ],
      },
      processingCard: <StackProps> {
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
      pCardIcon: <IconProps> {
        name: IconTokens.CoveredRightArrow,
        size: IconSizeTokens.SM,
        align: IconAlignmentTokens.center,
        color: ColorTokens.Grey_Charcoal,
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
      iconStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        color: ColorTokens.Grey_Milk,
        justifyContent: StackJustifyContent.spaceBetween,
        padding: {
          top: SizeTypeTokens.XS,
        },
        widgetItems: [
          { id: "lendingTXT", type: WIDGET.TEXT },
          { id: "bajaj", type: WIDGET.IMAGE },
        ],
      },
      lendingTXT: <TypographyProps>{
        label: "Lending partner",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
      },
      bajaj: <ImageProps>{
        uri: "https://volt-images.s3.ap-south-1.amazonaws.com/bajaj.svg",
        height: 18,
        width: 68,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
      iconCard: <CardProps>{
        width: '100%',
        bgColor: ColorTokens.Grey_Milk,
        body: { widgetItems: [{ id: "iconStack", type: WIDGET.STACK }] },
        justifyContent: StackJustifyContent.spaceBetween,
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
        size: SizeTypeTokens.MD,
      },
      durationText: <TypographyProps>{
        label: "Duration",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
      },
      durationValue: <TypographyProps>{
        label: `${term} months`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        marginRight: 20
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
      contactUs: <TagProps & WidgetProps>{
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

      promoStackRoot: <StackProps>{
        type: StackType.column,
        width: StackWidth.FULL,
        widgetItems: [
          { id: "promoStack", type: WIDGET.STACK },
          { id: "promoSpace", type: WIDGET.SPACE },
          { id: "promoStack2", type: WIDGET.STACK },
          { id: "promoSpace2", type: WIDGET.SPACE },
          { id: "promoStack3", type: WIDGET.STACK },
          { id: "promoSpace3", type: WIDGET.SPACE },
          { id: "promoStack4", type: WIDGET.STACK },
        ],
      },

      promoStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "image", type: WIDGET.IMAGE },
          { id: "imgSpace", type: WIDGET.SPACE },
          { id: "content", type: WIDGET.STACK },
        ],
      },
      promoStack2: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "image2", type: WIDGET.IMAGE },
          { id: "imgSpace2", type: WIDGET.SPACE },
          { id: "content2", type: WIDGET.STACK },
        ],
      },
      promoStack3: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "image3", type: WIDGET.IMAGE },
          { id: "imgSpace3", type: WIDGET.SPACE },
          { id: "content3", type: WIDGET.STACK },
        ],
      },
      promoStack4: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "image4", type: WIDGET.IMAGE },
          { id: "imgSpace4", type: WIDGET.SPACE },
          { id: "content4", type: WIDGET.STACK },
        ],
      },
      promoSpace: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      promoSpace2: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      promoSpace3: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      image4: <ImageProps>{
        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
        borderRadius: BorderRadiusTokens.BR5,
        size: ImageSizeTokens.XS,
      },
      imgSpace4: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      content4: <StackProps>{
        type: StackType.column,
        widgetItems: [
          { id: "titlePromo4", type: WIDGET.TEXT },
          { id: "titleSpace4", type: WIDGET.SPACE },
          { id: "subTitlePromo4", type: WIDGET.TEXT },
        ],
      },
      titlePromo4: <TypographyProps>{
        label: "No foreclosure charges",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      titleSpace4: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitlePromo4: <TypographyProps>{
        label: "Pay interest only on the borrow amount",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        numberOfLines: 2,
      },
      image2: <ImageProps>{
        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAX+SURBVHgB7VVraFtlGH7ONeckaZrMrGm7tmZ0s9tkFxXndRJ0VadlWhURQdaCN7z/UH94QaciCCJeQPSHdJtQ/CE4704tigNXilu3ualdm5B27XpLmpOlTXJOzsX3+3RV0erU/dO3NHzt+33f877P83xvgP98XNl15bmtXa0dOEUhLJRIdCXCQSn4TFAP3m3aJopm8bDgCW2fdH6SxqkETHyRkLVh7aFoKPrwuqXrwn6fHyWrhOREkv9SbCPgrf8U+DeAG7s2JiKByPOrm1afw4C+H/0eZasMtm5Z0sL3DIwNYCQ7MkLL13dt2fUs/mZwQNIp7gneqyF/aNOGVRsgizL2pfbhaObo/MZ4LI61p6/l69HsKC/mwvFIur3t8a3Lzli67cQ+JoXqqheIitjqOM6Ozzo/2/87wDt77nxyemb60XK5LGmqJpy//HwIgsApLJQLoK4Rr4nzbsdmxtA0AVwevQw1Z14ET9NQsc1dz33z1HA6P3SxAGGVX/Mj4AtgKj+VNj3zrC87vzROAMrsY2JqAuFwWKbNkCXZ/fzg52JTtInTyOhk8cPYDxhND6JdWI/E2huBhiXwfr5EkX1XPGBvxCtCDv7GekiihHAwjJrqmvihkUNP05Z7TwBK7OOS2y9JmJaZ0KjaYrkoxKIxjE2PWcOZYYkMgiq9CrV9Gdx25l1YfsE1QCg0T5FHcg6mPkVvbAwpa4ozQECIhWNYFFyEbCG7vu7qun3Jd5JH5gFX3bjKUxQlYVWscNAfhHHcQH2sXqrYFYQmTFw3ux6rW7dAran7RYucgcm+j9BXfQTjtQSsShDph3U2NDGE1GSK07o0tpQVv6np6qY3U++lCtJVO646b7Y4e2thrtCiyEqV67qIhCPIzGQQDoVxxcxK1CdugCu53ExCuYzCwDfYW/wag80uKprICxAFEdWBakwak6iL1MEn+3Do6CFYtgVd1bVZc3Zdcmdyh+yTfImSV+poOK0Ba+Jr+OH+dD+ii6IcNKgFyCwORFGElUmiZ/drOLgCP+lLFrBKDlRdmu98ZcNK5It5mBWTF5HJZ2A5lkvryzZ3b94ik8CqJmuMa3iux317LHOMH2ZamjNlvnYpN5o+gL4VZUxnp5EpZBCPNCNUroE/IkP1y/AFZH7PwOgA8qU8dEXnbpdlWWR0E3tNouM5LgNhevWn+qFICq9e9+kwDAPf1RZAg42DqqoPpVIJjfWNECQBQ9kBHCztwfjxceRnC9ib2ou+I32YM+egSirobjiuA9u2ydEeAy8L7KFGtehhStYT3+6KhhVic23zPEWFUoG6yaJRaMGS0SI+jPYjZ+QQWxzDVHYKqqwil8+x58R1485ll5O7WXeCKLB/MHqPE/gj/OG3vdmWoIq+oLRruZYQq44JbGDn5nK8c0VULGJEiHiabAcVQdM1GHkDNdEarjN76MXZIlzP5ZIwMAqDWOhRoPRasPa4Rffwzs6dxvwsbe9uf5GquL/iVEgu1yVtZaraETh5Amj0cdszmm7Or0ZvSxmp6UHuZNYx3J868zzPIDdvffumt1/EH4Q4P3Jk+TECSxGISGLLTEtJkCR2CauaLvr5gIioGHbuWfZg/6XLWl+i55SuClZxZ9GeF/SgvnwhMP5+f/0HUbuWdNhL3UlMbDaiGE2kg0GXfUVPo5c66bWKVj+jh525b/d9TSPDI9f4df+B7uu7v8JfxO++D9u2tz1B0+YOctYHlP2OpsX729u3J0/kKx93JFyrvMG2LckXCCSlkvS+0L7NwEmG8GdJr6fzbLtYavf0wGKvWCjIqh51ow0dUlUULn11uWQoOOaQY1qt+qZtaZxEyAsl7F0d19pq+C2pYY3PK1ID1RU4lQpEswjPOko4JUg0oCXdvwyD+zfTkZdxEiEumHGdNrk27nNnxlE5lgTRCCV2OvMr4A/xtSgKdjn17czc1MS7OMlYkFLjrU2X69XRD+TaZkkQJVaY7WSPyaXJ4TdoBk6TkxaTjvtpqnQ33rpnBv8WkEWuKxGHJG0WFbnasR16bN6BRbf07Mb/8SfxIzA8reiaZ6LCAAAAAElFTkSuQmCC",
        borderRadius: BorderRadiusTokens.BR5,
        size: ImageSizeTokens.XS,
      },
      imgSpace2: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      content2: <StackProps>{
        type: StackType.column,
        widgetItems: [
          { id: "titlePromo2", type: WIDGET.TEXT },
          { id: "titleSpace2", type: WIDGET.SPACE },
          { id: "subTitlePromo2", type: WIDGET.TEXT },
        ],
      },
      titlePromo2: <TypographyProps>{
        label: "Low interest rates",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      titleSpace2: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitlePromo2: <TypographyProps>{
        label: "Pay interest only on the borrow amount",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        numberOfLines: 2,
      },
      image3: <ImageProps>{
        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
        borderRadius: BorderRadiusTokens.BR5,
        size: ImageSizeTokens.XS,
      },
      imgSpace3: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      content3: <StackProps>{
        type: StackType.column,
        widgetItems: [
          { id: "titlePromo3", type: WIDGET.TEXT },
          { id: "titleSpace3", type: WIDGET.SPACE },
          { id: "subTitlePromo3", type: WIDGET.TEXT },
        ],
      },
      titlePromo3: <TypographyProps>{
        label: "Withdraw as per requirements",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      titleSpace3: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitlePromo3: <TypographyProps>{
        label: "Pay interest only on the borrow amount",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        numberOfLines: 2,
      },

      image: <ImageProps>{
        uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOuSURBVHgBlVVdiBtVFP7uzcxssm6SadaudjWS+AObrSIt9cm/rlWXotIHoaCgFMQXfVlfKtpWC32oCtLYUvAH7GMriIqwyrKW1rrUF6Gt7o+0uJvuuu1uaJppOplkfm/vhM1kEia72Q9C7rn3nO8799yTE4I1wCbHH3BC9Hd3bcAYimR25rAO0LUcTLAE/0q5HwnSmcrMrymsA6sKHBmZk7/8bmDrciFSWNlKaWr32N73pt8aGbmQqvuxy6dfs6dPz9kzv33VykGCiLP7rj4VouQQX2537XSyjJ1PX/POv/65F7PXJchRe/SD1/OMAS97GTvkUbL5uam6LbSSH/tofh8cHPKLKyWxyefFbWVcmnUw/ITyEvPtM8Ms21X1Eb6cCrzB0QPzJ/jGnlbR+/o07Hp+EavB0bQaGw1HYNns1a7HXvih6QbH9i98zHPYExSckA2sBdrd3TBERLz9Wub75x8CYQfbBd9/r4aOwF+DVTSF3i6/rf8znvEEKCXfrha3aWMVncDRdZ69KNOenmcFge5194SjBxa3MGY/ExggUiTCOsJddif8vP5h1G/iGMZyTYAxZxdpbVZuF9NRFB+Oo7eyiHXBceCUVZCu8PvW9Hg/DRG21X9uxiUsPHkPCgMyHIHgYqwfN51w5wKUgkZjIJLEl6E0dRjbVLtViMB4PA79lT44CakhyChOaoNYLwgjEzojb1BenoQjS6gM93GBGM+AIBZtdv7PknFOT3ZEbFoEZy9Gl8jkje2RzFBO0LdtmDQHow/6ncQQ0MPbWvV151g1jc3iDfTSSlvyhbyI78/KWCoK/+7I7q51BjUz0bkgZ1dA9E2IChNwSssEEusmxeifcRz/8W4sFwXeIyRXP6Pc+gltEO9ptv2l0qohXMtHcHXxLpwcTeKPvxu/ZErYWH0txP7HX6UkFDDIrQJCm1KxWRNTFxoPVTYtb807PPfpkcFTnti7Q0QlFj5EGwSVauJWv2e70/SW0ZhVhJBv/PHeT+zwFXYGK/O/FRZ/roLCnQ2GxBUFck71zhQ+HkqG6WX/WXYw7Y/1/tGkKt7k6eSCBNxSbVB1JCeWmshLPHM/OX/QodbYpiFxeIalEMIvfNdrFzdr6ZICcUZtCizpBpSV0nDiy5xo+JNsJreqQEPIPshb4Z1Q3tjYdf4mqNp4RNNhKFarqNq1Nlf4gP7CgpHNZrcoQVyBAi4+P15IikulHbynd9uMDFQsO62ZJie28jzsPI88ZzL9RDviOu4A5zhsmkEc0QAAAAAASUVORK5CYII=",
        borderRadius: BorderRadiusTokens.BR5,
        size: ImageSizeTokens.XS,
      },
      imgSpace: <SpaceProps>{
        size: SizeTypeTokens.XXL,
      },
      content: <StackProps>{
        type: StackType.column,
        widgetItems: [
          { id: "titlePromo", type: WIDGET.TEXT },
          { id: "titleSpace", type: WIDGET.SPACE },
          { id: "subTitlePromo", type: WIDGET.TEXT },
        ],
      },
      titlePromo: <TypographyProps>{
        label: "Instant access to cash",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      titleSpace: <SpaceProps>{
        size: SizeTypeTokens.SM,
      },
      subTitlePromo: <TypographyProps>{
        label: "Pay interest only on the borrow amount",
        fontFamily: FontFamilyTokens.Inter,
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        numberOfLines: 2,
      },
    },
  };
};

export const setCreditLimitMf2: PageType<any> = {
  bgColor: "#F3F5FC",
  onLoad: async ({ showPopup, network, goBack }, { activeIndex }) => {
    let activeIndexs;
    if (
        activeIndex === null ||
        activeIndex === 0 ||
        activeIndex === undefined ||
        activeIndex === ""
    ) {
      console.log("activeIndex null");
      activeIndexs = 1;
    } else {
      console.log("activeIndex val");
      activeIndexs = activeIndex;
    }

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

    const applicationId = (await SharedPropsService.getUser())
        .linkedApplications[0].applicationId;
    const pledgeData = await network.get(`${api.pledgeLimit}${applicationId}`, {
      headers: await getAppHeader(),
    });

    const interestRate = _.get(pledgeData, "data.stepResponseObject.interestRate")
    const term = _.get(pledgeData, "data.stepResponseObject.loanTenureInMonths")



    const response = await network.post(
        api.processingCharges,
        {
          applicationId: applicationId,
          mutualFundPortfolioItems: mfPortfolioArray,
        },
        { headers: await getAppHeader() }
    );

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

    let camsAmount = 0;
    let KFintechAmount = 0;
    camsAmount =
        pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap
            .CAMS.availablePortfolioAmount || 0;
    KFintechAmount =
        pledgeLimitResponse.data.stepResponseObject.repositoryAssetMetadataMap
            .KARVY.availablePortfolioAmount || 0;

    return Promise.resolve(
        template(
            activeIndexs,
            availableCreditAmount,
            availableCASX,
            stepResponseObject as StepResponseObject,
            isGetMorePortfolio,
            totalPortfolioAmount,
            processingFeesBreakUp,
            updateAvailableCASMap,
            showLessLimit,
            camsAmount,
            KFintechAmount,
            term,
            interestRate

        )
    );
  },
  actions: {
    [ACTION.GO_BACK]: goBack,
    [ACTION.NAV_PORTFOLIO]: goKfin,
    [ACTION.PORTFOLIO]: goPortfolio,
    [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
    [ACTION.NAV_NEXT]: goToNext,
  },
  clearPrevious: true,
};