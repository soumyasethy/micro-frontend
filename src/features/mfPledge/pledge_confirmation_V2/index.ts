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
import { ACTION } from "./types";
import { goBack, goToFaq, sendOtpForPledgeConfirm } from "./actions";
import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { ConfigTokens, getAppHeader } from "../../../configs/config";
import { getTotalLimit } from "../portfolio/actions";
import _ from "lodash";
import { addCommasToNumber } from "../../../configs/utils";

export const template: (
  totalAmount: number,
  totalCharges: number,
  processingFeesBreakUp: { [key in string]: number },
  stepResponseObject: StepResponseObject,
  showOtpConfirmation: boolean,
  minAmount: number,
  maxAmount: number
) => TemplateSchema = (
  totalAmount = 0,
  totalCharges = 0,
  processingFeesBreakUp = {},
  stepResponseObject,
  showOtpConfirmation = false,
  minAmount,
  maxAmount
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
        {
          id: "card2",
          type: WIDGET.CARD,
          padding: {
            horizontal: 0,
            all: 0,
          },
          position: POSITION.ABSOLUTE_TOP,
        },
        // {
        //   id: "card3",
        //   type: WIDGET.CARD,
        //   padding: {
        //     horizontal: 0,
        //     vertical: 16,
        //   },
        //   position: POSITION.ABSOLUTE_TOP,
        // },
        { id: "card3Body", type: WIDGET.STACK },
        {
          id: "iconStack",
          type: WIDGET.STACK,
          position: POSITION.STICKY_BOTTOM,
        },
        { id: "spaceCard", type: WIDGET.SPACE },
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
        widgetItems: [
          { id: "backButton", type: WIDGET.ICON },
          { id: "space0", type: WIDGET.SPACE },
          { id: "title", type: WIDGET.TEXT },
          { id: "headerRight", type: WIDGET.STACK },
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
      space0: <SpaceProps>{ size: SizeTypeTokens.LG },
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
        width: StackWidth.FULL,
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: "selectedLimitText", type: WIDGET.TEXT },
          { id: "space1", type: WIDGET.SPACE },
          { id: "selectedLimitValue", type: WIDGET.STACK },
          { id: "space2", type: WIDGET.SPACE },
          { id: "divider", type: WIDGET.DIVIDER },
          { id: "space3", type: WIDGET.SPACE },
          { id: "selectedLimitText2", type: WIDGET.TEXT },
          { id: "selectedLimitValue2", type: WIDGET.STACK },
        ],
      },
      selectedLimitText: <TypographyProps>{
        label: "Selected Limit",
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
          { id: "selectedLimitValueText2", type: WIDGET.TEXT },
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
        label: `${addCommasToNumber(25000)}`,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        fontSize: FontSizeTokens.XXL,
        color: ColorTokens.Secondary_100,
      },
      selectedLimitValueText2: <TypographyProps>{
        label: ` out of ₹${addCommasToNumber(
          stepResponseObject["availableCreditAmount"]
        )}`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
      },
      space2: <SpaceProps>{ size: SizeTypeTokens.XL },
      divider: <DividerProps>{
        size: DividerSizeTokens.MD,
        color: ColorTokens.Grey_Milk,
      },
      space3: <SpaceProps>{ size: SizeTypeTokens.XL },
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
          parseInt(stepResponseObject["totalPortfolioAmount"].toString())
        )}`,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "700",
        fontSize: FontSizeTokens.MD,
      },
      // card3: <CardProps>{
      //   bgColor: ColorTokens.White,
      //   body: { widgetItems: [{ id: "card3Body", type: WIDGET.STACK }] },
      // },
      card3Body: <StackProps>{
        // width: StackWidth.FULL,
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        widgetItems: [
          { id: "otherChargesStack", type: WIDGET.STACK },
          { id: "space4", type: WIDGET.SPACE },
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
        ],
      },
      otherChargesStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "otherChargesText", type: WIDGET.TEXT },
          // { id: "viewMore", type: WIDGET.TEXT },
        ],
      },
      otherChargesText: <TypographyProps>{
        label: "Interest and other charges",
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: "500",
        fontSize: FontSizeTokens.MD,
      },
      // viewMore: <TypographyProps>{
      //   label: "View more",
      //   fontFamily: FontFamilyTokens.Inter,
      //   fontWeight: "600",
      //   fontSize: FontSizeTokens.SM,
      //   color: ColorTokens.Primary_100,
      // },
      space4: <SpaceProps>{ size: SizeTypeTokens.XL },
      processingFeeStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "processingFeeText", type: WIDGET.TEXT },
          { id: "processingFeeValue", type: WIDGET.TEXT },
        ],
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
        size: DividerSizeTokens.MD,
        color: ColorTokens.Grey_Milk,
      },
      space6: <SpaceProps>{ size: SizeTypeTokens.LG },
      interestRateStack: <StackProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
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
        label: `₹${
          Math.ceil(((100 * stepResponseObject.interestRate) / 12) * 100) / 100
        }/Month`,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      space7: <SpaceProps>{ size: SizeTypeTokens.LG },
      divider3: <DividerProps>{
        size: DividerSizeTokens.MD,
        color: ColorTokens.Grey_Milk,
      },
      space8: <SpaceProps>{ size: SizeTypeTokens.LG },
      autoPayStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
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
        label: "5th of every month",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
      },
      space9: <SpaceProps>{ size: SizeTypeTokens.LG },
      divider4: <DividerProps>{
        size: DividerSizeTokens.MD,
        color: ColorTokens.Grey_Milk,
      },
      space10: <SpaceProps>{ size: SizeTypeTokens.LG },
      durationStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "durationText", type: WIDGET.TEXT },
          { id: "durationValue", type: WIDGET.TEXT },
        ],
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
      iconStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.center,
        widgetItems: [
          { id: "volt", type: WIDGET.ICON },
          { id: "space11", type: WIDGET.SPACE },
          { id: "bajaj", type: WIDGET.IMAGE },
          { id: "space12", type: WIDGET.SPACE },
          { id: "mirae", type: WIDGET.IMAGE },
        ],
      },
      volt: <IconProps>{
        name: IconTokens.VoltFull,
        size: IconSizeTokens.XXXXXXL,
      },
      space11: <SpaceProps>{ size: SizeTypeTokens.MD },
      bajaj: <ImageProps>{
        uri: "https://volt-images.s3.ap-south-1.amazonaws.com/bajaj.svg",
        height: 14,
        width: 52,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
      space12: <SpaceProps>{ size: SizeTypeTokens.MD },
      mirae: <ImageProps>{
        uri: "https://volt-images.s3.ap-south-1.amazonaws.com/mirae-assets.svg",
        height: 22,
        width: 80,
        resizeMode: ResizeModeToken.CONTAIN,
        padding: SizeTypeTokens.NONE,
      },
      spaceCard: <SpaceProps>{ size: SizeTypeTokens.LG },
      ctaText: <TypographyProps>{
        label: "Total amount",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
      },
      ctaCard: <CardProps>{
        bgColor: ColorTokens.White,
        body: { widgetItems: [{ id: "ctaBody", type: WIDGET.STACK }] },
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
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
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: "ACTION.GO_CONFIRM_PLEDGE",
          routeId: ROUTE.SET_CREDIT_LIMIT,
          payload: {},
        },
      },
    },
  };
};

export const pledgeConfirmationMFV2: PageType<any> = {
  onLoad: async ({ network }, { stepResponseObject }) => {
    // console.log("stepResponseObject", stepResponseObject['availableCreditAmount']);
    /// Pledging
    const mfPortfolioArray: AvailableCASItem[] = (
      stepResponseObject as StepResponseObject
    ).availableCAS;
    mfPortfolioArray.forEach((_item, index) => {
      mfPortfolioArray[index].is_pledged = _item.pledgedUnits > 0;
    });

    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;

    /// fetch processing fee
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
    const totalCharges = _.get(
      response,
      "data.stepResponseObject.totalCharges",
      0
    );

    const totalAmount = getTotalLimit(
      stepResponseObject.availableCAS,
      stepResponseObject.isinNAVMap,
      stepResponseObject.isinLTVMap
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

    return Promise.resolve(
      template(
        totalAmount,
        totalCharges,
        processingFeesBreakUp,
        stepResponseObject as StepResponseObject,
        showOtpConfirmation,
        minAmount,
        maxAmount
      )
    );
  },
  actions: {
    [ACTION.PLEDGE_CONFIRMATION]: sendOtpForPledgeConfirm,
    [ACTION.NAV_TO_FAQ]: goToFaq,
    [ACTION.BACK_BUTTON]: goBack,
  },
  clearPrevious: true,
};
