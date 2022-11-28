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
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  LineItemCardProps,
  ListItemProps,
  PaddingSizeTokens,
  ShadowTypeTokens,
  SizeTypeTokens,
  SpaceProps,
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
import { roundDownToNearestHundred } from "../../../configs/utils";

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
  return {
    layout: <Layout>{
      id: ROUTE.PLEDGE_CONFIRMATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
       // { id: "space0", type: WIDGET.SPACE },
        { id: "cardItem", type: WIDGET.CARD },
        { id: "space1", type: WIDGET.SPACE },
        { id: "list1", type: WIDGET.LIST_ITEM },
        { id: "list2", type: WIDGET.LIST_ITEM },
        { id: "list3", type: WIDGET.LIST_ITEM },
        { id: "list4", type: WIDGET.LIST_ITEM },
        { id: "buttonSpace", type: WIDGET.SPACE },
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
     // space0: <SpaceProps>{ size: SizeTypeTokens.XL },
      cardItem: <CardProps>{
        shadow:ShadowTypeTokens.E1,
        bgColor: ColorTokens.Primary_05,
        padding:{
          horizontal: SizeTypeTokens.XL,
          vertical: SizeTypeTokens.XL
        },
        borderRadius:BorderRadiusTokens.BR3,
        body: {
          widgetItems: [
            { id: "totalText", type: WIDGET.TEXT },
            { id: "totalSpace", type: WIDGET.SPACE },
            { id: "amountStack", type: WIDGET.STACK }
            //{ id: "amountText", type: WIDGET.TEXT }
          ],
        },
      },
      totalText:<TypographyProps>{
        label: "Total credit limit",
        color: ColorTokens.Grey_Charcoal,
        fontWeight: "400",
        fontSize: FontSizeTokens.XS,
        fontFamily:FontFamilyTokens.Inter,
        lineHeight:18
      },
      totalSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
      amountStack:<StackProps & WidgetProps>{
        type:StackType.row,
        width:StackWidth.FULL,
        widgetItems: [
          { id: "amountSymbol", type: WIDGET.TEXT },
          { id: "amountText", type: WIDGET.TEXT },
        ],
      },
      amountSymbol:<TypographyProps>{
        label: "₹",
        color: ColorTokens.Grey_Night,
        fontWeight: "700",
        fontSize: FontSizeTokens.XXL,
        fontFamily:FontFamilyTokens.Inter,
        lineHeight:32
      },
      amountText:<TypographyProps>{
        label: `${totalAmount}`.replace(
          /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
          ","
        ),
        color: ColorTokens.Grey_Night,
        fontWeight: "700",
        fontSize: FontSizeTokens.XXL,
        fontFamily:FontFamilyTokens.Poppins,
        lineHeight:32
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXL },
      list1:<ListItemProps>{
        customTitle:<TypographyProps>{
          label: "Processing fee",
          color: ColorTokens.Grey_Night,
          fontWeight: "400",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        isDivider:true,
        trailLabel:<TypographyProps>{
          label: "₹967",
          color: ColorTokens.Grey_Night,
          fontWeight: "600",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        onPress: () => { },
      },
      list2:<ListItemProps>{
        customTitle:<TypographyProps>{
          label: "Interest per ₹10,000",
          color: ColorTokens.Grey_Night,
          fontWeight: "400",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        customSubTitle:<TypographyProps>{
          label: "Charged as per usage @10%",
          color: ColorTokens.Grey_Charcoal,
          fontWeight: "400",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:18
        },
        isDivider:true,
        trailLabel:<TypographyProps>{
          label: "₹84/month",
          color: ColorTokens.Grey_Night,
          fontWeight: "600",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        onPress: () => { },
      },
      list3:<ListItemProps>{
        customTitle:<TypographyProps>{
          label: "Interest AutoPay",
          color: ColorTokens.Grey_Night,
          fontWeight: "400",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
       
        isDivider:true,
        trailLabel:<TypographyProps>{
          label: "7th of every month",
          color: ColorTokens.Grey_Night,
          fontWeight: "600",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        onPress: () => { },
      },
      list4:<ListItemProps>{
        customTitle:<TypographyProps>{
          label: "Duration",
          color: ColorTokens.Grey_Night,
          fontWeight: "400",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        
        isDivider:false,
        trailLabel:<TypographyProps>{
          label: "12 months",
          color: ColorTokens.Grey_Night,
          fontWeight: "600",
          subTitle:"",
          fontSize: FontSizeTokens.SM,
          fontFamily:FontFamilyTokens.Inter,
          lineHeight:24
        },
        onPress: () => { },
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
