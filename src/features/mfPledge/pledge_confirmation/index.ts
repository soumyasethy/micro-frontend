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
  HeaderProps, HeaderTypeTokens,
  IconProps,
  IconTokens,
  ListItemProps,
  ShadowTypeTokens,
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
import { ACTION, OtpPayloadForPledgeConfirm } from "./types";
import { goBack, sendOtpForPledgeConfirm } from "./actions";
import _ from "lodash";
import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { ConfigTokens, getAppHeader } from "../../../configs/config";
import { commonTemplates } from "../../../configs/common";
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

  return {
    layout: <Layout>{
      id: ROUTE.PLEDGE_CONFIRMATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP },
        { id: "spaceHeader", type: WIDGET.SPACE },

        { id: "cardItem", type: WIDGET.CARD },
        { id: "space1", type: WIDGET.SPACE },
        ...listItemLayout,
        {
          id: "interestBlock",
          type: WIDGET.CARD,
        },
        {
          id: "interestDivider",
          type: WIDGET.DIVIDER,
        },
        {
          id: "autoPayBlock",
          type: WIDGET.CARD,
        },
        {
          id: "autoPayDivider",
          type: WIDGET.DIVIDER,
        },
        {
          id: "tenureBlock",
          type: WIDGET.CARD,
        },
        {
          id: "tenureDivider",
          type: WIDGET.DIVIDER,
        },
        ...(showOtpConfirmation
          ? [
              {
                id: "otpConfirmInfo",
                type: WIDGET.CARD,
                position: POSITION.ABSOLUTE_BOTTOM,
              },
              {
                id: "continueSpace",
                type: WIDGET.SPACE,
                position: POSITION.ABSOLUTE_BOTTOM,
              },
            ]
          : []),
        ...(totalAmount < minAmount || totalAmount > maxAmount
          ? commonTemplates.infoMessage("minAmountInfo", "").widgetItem
          : []),
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      ...commonTemplates.infoMessage(
        "minAmountInfo",
        `Minimum amount required to proceed ₹${addCommasToNumber(minAmount)}`,
        "error"
      ).datastore,
      otpConfirmInfo: <CardProps>{
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
      continueSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      amountConfirmInfoSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
      infoLabel: <TypographyProps>{
        label: "We will trigger 2 OTP’s to confirm your pledge",
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: "400",
        fontColor: ColorTokens.Grey_Night,
        fontSize: FontSizeTokens.XS,
        lineHeight: 18,
      },
      header: <HeaderProps>{
        title: "Confirm pledge",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: HeaderTypeTokens.DEFAULT,
        action: {
          type: ACTION.BACK_BUTTON,
          payload: {},
          routeId: ROUTE.PLEDGE_CONFIRMATION,
        },
      },
      spaceHeader: <SpaceProps>{ size: SizeTypeTokens.XL },

      cardItem: <CardProps>{
        shadow: ShadowTypeTokens.E1,
        bgColor: ColorTokens.Primary_05,
        padding: {
          horizontal: SizeTypeTokens.XL,
          vertical: SizeTypeTokens.XL,
        },
        borderRadius: BorderRadiusTokens.BR3,
        body: {
          widgetItems: [
            { id: "totalText", type: WIDGET.TEXT },
            { id: "totalSpace", type: WIDGET.SPACE },
            { id: "amountStack", type: WIDGET.STACK },
          ],
        },
      },
      totalText: <TypographyProps>{
        label: "Total credit limit",
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
      },
      totalSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
      amountStack: <StackProps & WidgetProps>{
        type: StackType.row,
        width: StackWidth.FULL,
        widgetItems: [
          { id: "amountSymbol", type: WIDGET.TEXT },
          { id: "amountText", type: WIDGET.TEXT },
        ],
      },
      amountSymbol: <TypographyProps>{
        label: "₹",
        color: ColorTokens.Grey_Night,
        fontWeight: "700",
        fontSize: FontSizeTokens.XXL,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 32,
      },
      amountText: <TypographyProps>{
        label: `${totalAmount}`.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ","
        ),
        color: ColorTokens.Grey_Night,
        fontWeight: "700",
        fontSize: FontSizeTokens.XXL,
        fontFamily: FontFamilyTokens.Poppins,
        lineHeight: 32,
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
      ...listLayoutDs,
      interestBlock: <CardProps>{
        padding: {
          top: SizeTypeTokens.XL,
          bottom: SizeTypeTokens.MD,
          left: SizeTypeTokens.XS,
          right: SizeTypeTokens.XS,
        },
        bgColor: ColorTokens.White,
        body: {
          widgetItems: [
            { id: "interestItem", type: WIDGET.STACK },
            { id: "endSpace", type: WIDGET.SPACE },
          ],
        },
      },
      interestItem: <StackProps & WidgetProps>{
        type: StackType.row,
        widgetItems: [
          { id: "keyInterest", type: WIDGET.STACK },
          { id: "valueInterest", type: WIDGET.STACK },
        ],
      },
      keyInterest: <StackProps & WidgetProps>{
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "title", type: WIDGET.TEXT },
          { id: "titleSpace", type: WIDGET.SPACE },
          { id: "subTitle", type: WIDGET.TEXT },
        ],
      },
      title: <TypographyProps>{
        label: "Interest per ₹10,000",
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      titleSpace: <SpaceProps>{
        size: SizeTypeTokens.XS,
      },
      subTitle: <TypographyProps>{
        label: `Charged as per usage @ ${stepResponseObject.interestRate}%`,
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 18,
      },
      valueInterest: <StackProps & WidgetProps>{
        // type: StackType.column,
        alignItems: StackAlignItems.flexEnd,
        justifyContent: StackJustifyContent.flexEnd,
        widgetItems: [{ id: "valueItem", type: WIDGET.TEXT }],
      },
      valueItem: <TypographyProps>{
        label: `₹${
          Math.ceil(((100 * stepResponseObject.interestRate) / 12) * 100) / 100
        }/month`,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      endSpace: <SpaceProps>{
        size: SizeTypeTokens.MD,
      },
      interestDivider: <DividerProps>{
        size: DividerSizeTokens.SM,
        margin: {
          vertical: SizeTypeTokens.SM,
          horizontal: SizeTypeTokens.SM,
        },
        color: ColorTokens.Grey_Milk_1,
      },
      autoPayBlock: <CardProps>{
        bgColor: ColorTokens.White,
        padding: {
          top: SizeTypeTokens.XL,
          bottom: SizeTypeTokens.XL,
          left: SizeTypeTokens.XS,
          right: SizeTypeTokens.XS,
        },
        body: {
          widgetItems: [
            { id: "autoPayItem", type: WIDGET.STACK },
            { id: "autoPaySpace", type: WIDGET.SPACE },
          ],
        },
      },
      autoPayItem: <StackProps & WidgetProps>{
        type: StackType.row,
        //  width: StackWidth.CONTENT,

        widgetItems: [
          { id: "autoPayInterest", type: WIDGET.STACK },
          { id: "autoPayValueInterest", type: WIDGET.STACK },
          // { id: "endSpace", type: WIDGET.SPACE },
          // { id: "divider", type: WIDGET.DIVIDER },
        ],
      },
      autoPayInterest: <StackProps & WidgetProps>{
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [{ id: "autoPayTitle", type: WIDGET.TEXT }],
      },
      autoPayTitle: <TypographyProps>{
        label: "Interest AutoPay",
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      // autoPaySpace: <SpaceProps>{
      //   size: SizeTypeTokens.XS
      // },

      autoPayValueInterest: <StackProps & WidgetProps>{
        // type: StackType.column,
        alignItems: StackAlignItems.flexEnd,
        justifyContent: StackJustifyContent.flexEnd,
        widgetItems: [{ id: "autoPayValueItem", type: WIDGET.TEXT }],
      },
      autoPayValueItem: <TypographyProps>{
        label: "5th of every month",
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      autoPayDivider: <DividerProps>{
        size: DividerSizeTokens.SM,
        margin: {
          vertical: SizeTypeTokens.SM,
          horizontal: SizeTypeTokens.SM,
        },
        color: ColorTokens.Grey_Milk_1,
      },

      tenureBlock: <CardProps>{
        bgColor: ColorTokens.White,
        padding: {
          top: SizeTypeTokens.XL,
          bottom: SizeTypeTokens.XL,
          left: SizeTypeTokens.XS,
          right: SizeTypeTokens.XS,
        },
        body: {
          widgetItems: [
            { id: "tenureItem", type: WIDGET.STACK },
            { id: "tenureSpace", type: WIDGET.SPACE },
          ],
        },
      },
      tenureItem: <StackProps & WidgetProps>{
        type: StackType.row,
        //  width: StackWidth.CONTENT,

        widgetItems: [
          { id: "tenureInterest", type: WIDGET.STACK },
          { id: "tenureValueInterest", type: WIDGET.STACK },
          // { id: "endSpace", type: WIDGET.SPACE },
          // { id: "divider", type: WIDGET.DIVIDER },
        ],
      },
      tenureInterest: <StackProps & WidgetProps>{
        type: StackType.column,
        alignItems: StackAlignItems.flexStart,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [{ id: "tenureTitle", type: WIDGET.TEXT }],
      },
      tenureTitle: <TypographyProps>{
        label: "Duration",
        color: ColorTokens.Grey_Night,
        fontWeight: "400",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },

      tenureValueInterest: <StackProps & WidgetProps>{
        // type: StackType.column,
        alignItems: StackAlignItems.flexEnd,
        justifyContent: StackJustifyContent.flexEnd,
        widgetItems: [{ id: "tenureValueItem", type: WIDGET.TEXT }],
      },
      tenureValueItem: <TypographyProps>{
        label: `${stepResponseObject.loanTenureInMonths} months`,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        lineHeight: 24,
      },
      tenureSpace: <SpaceProps>{
        size: SizeTypeTokens.XS,
      },
      tenureDiv: <DividerProps>{
        size: DividerSizeTokens.SM,
        margin: {
          vertical: SizeTypeTokens.SM,
          horizontal: SizeTypeTokens.SM,
        },
        color: ColorTokens.Grey_Milk_1,
      },

      buttonSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      continue: <ButtonProps & WidgetProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Confirm & get OTP",
        type:
          totalAmount < minAmount || totalAmount > maxAmount
            ? ButtonTypeTokens.LargeOutline
            : ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.PLEDGE_CONFIRMATION,
          payload: <OtpPayloadForPledgeConfirm>{
            value: stepResponseObject,
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.PLEDGE_CONFIRMATION,
        },
      },
    },
  };
};

export const pledgeConfirmationMF: PageType<any> = {
  onLoad: async ({ network }, { stepResponseObject }) => {
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
    [ACTION.BACK_BUTTON]: goBack,
  },
  clearPrevious: true,
};
