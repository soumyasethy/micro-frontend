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
  CardProps,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
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
import { ACTION, OtpPayload } from "./types";
import { sendOtp, goBack } from "./actions";
import _ from "lodash";
import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

export const template: (
  totalAmount: number,
  totalCharges: number,
  processingFeesBreakUp: { [key in string]: number },
  stepResponseObject: StepResponseObject
) => TemplateSchema = (
  totalAmount = 0,
  totalCharges = 0,
  processingFeesBreakUp = {},
  stepResponseObject
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
        { id: "cardItem", type: WIDGET.CARD },
        { id: "space1", type: WIDGET.SPACE },
        ...listItemLayout,
        {
          id: "interestBlock",
          type: WIDGET.CARD,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "interestDivider",
          type: WIDGET.DIVIDER,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "autoPayBlock",
          type: WIDGET.CARD,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "autoPayDivider",
          type: WIDGET.DIVIDER,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "tenureBlock",
          type: WIDGET.CARD,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "tenureDivider",
          type: WIDGET.DIVIDER,
          padding: {
            left: 16,
            right: 16,
          },
        },
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Confirm pledge",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        action: {
          type: ACTION.BACK_BUTTON,
          payload: {},
          routeId: ROUTE.PLEDGE_CONFIRMATION,
        },
      },
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
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.PLEDGE_CONFIRMATION,
          payload: <OtpPayload>{
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
    const mutualFundPortfolioItems: AvailableCASItem[] = (
      stepResponseObject as StepResponseObject
    ).availableCAS;
    mutualFundPortfolioItems.forEach((_item, index) => {
      mutualFundPortfolioItems[index].is_pledged = _item.pledgedUnits > 0;
    });

    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;

    /// fetch processing fee
    const response = await network.post(
      api.processingCharges,
      {
        applicationId: applicationId,
        mutualFundPortfolioItems,
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

    return Promise.resolve(
      template(
        totalAmount,
        totalCharges,
        processingFeesBreakUp,
        stepResponseObject as StepResponseObject
      )
    );
  },
  actions: {
    [ACTION.PLEDGE_CONFIRMATION]: sendOtp,
    [ACTION.BACK_BUTTON]: goBack,
  },
  clearPrevious: true,
};
