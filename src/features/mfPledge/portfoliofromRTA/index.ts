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
  HeaderProps,
  HeaderTypeTokens,
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
import { ACTION } from "./types";
import {
  getMoreMfPortfolio,
  goBackAction,
  portfolioListDatastoreBuilder,
} from "./action";
import SharedPropsService from "../../../SharedPropsService";
import { AvailableCASItem } from "../../mfPledge/unlock_limit/types";
import { StepResponseObject } from "../../mfPledge/unlock_limit_landing_V2/types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import moment from "moment";
import { User } from "../../login/otp_verify/types";
import { GetMoreMfPortfolioPayload } from "../unlock_limit_V2/types";
import { addCommasToNumber } from "../../../configs/utils";

export const template: (
  stepResponseObject: StepResponseObject,
  formattedDate: string,
  availableAmount: number,
  totalPortfolio: number,
  assetRepository: string
) => Promise<TemplateSchema> = async (
  stepResponseObject,
  formattedDate,
  availableAmount,
  totalPortfolio,
  assetRepository
) => ({
  layout: <Layout>{
    id: ROUTE.PORTFOLIO_FROM_RTA,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      {
        id: "creditLimitCard",
        type: WIDGET.CARD,
      },
      {
        id: "creditLimitCard2",
        type: WIDGET.CARD,
      },
      {
        id: "space",
        type: WIDGET.SPACE,
      },
      { id: "text", type: WIDGET.TEXT },
      { id: "space2", type: WIDGET.SPACE },
      { id: "mfStack", type: WIDGET.STACK },
      { id: "space3", type: WIDGET.SPACE },
      { id: "divider", type: WIDGET.DIVIDER },
      { id: "listItem", type: WIDGET.LIST },
      { id: "ctaCard", type: WIDGET.CARD, position: POSITION.STICKY_BOTTOM },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps & WidgetProps>{
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      title: `Portfolio from ${assetRepository}`,
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.PORTFOLIO_FROM_RTA,
        payload: {},
      },
    },
    creditLimitCard: <CardProps>{
      borderTopRightRadius: BorderRadiusTokens.BR3,
      borderTopLeftRadius: BorderRadiusTokens.BR3,
      bgColor: ColorTokens.Grey_Milk_1,
      width: StackWidth.FULL,
      padding: {
        top: SizeTypeTokens.LG,
        bottom: SizeTypeTokens.Size6,
        left: SizeTypeTokens.LG,
        right: SizeTypeTokens.LG,
      },
      bodyOrientation: CardOrientation.HORIZONTAL,
      body: {
        widgetItems: [
          { id: "stack2", type: WIDGET.STACK }
        ],
      },
    },
    stack2: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.row,
       justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "head", type: WIDGET.STACK },
        { id: "headSpace", type: WIDGET.SPACE },
        { id: "tail", type: WIDGET.STACK },
       
      ],
    },
    head: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      widgetItems: [
        { id: "Value", type: WIDGET.TEXT },
        { id: "Value2", type: WIDGET.TEXT },
       
      ],
    },
    headSpace:<SpaceProps>{
      size:SizeTypeTokens.XXXL
    },
    tail: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      widgetItems: [
        { id: "AvailableCreditLimit", type: WIDGET.TEXT },
        { id: "AvailableCreditLimit2", type: WIDGET.TEXT },
       
      ],
    },
  
    AvailableCreditLimitSpace:<SpaceProps>{
      size:SizeTypeTokens.LG
    },
    Value: <TypographyProps>{
      label: `Value`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontColor: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.XS,
      lineHeight:16
    },
    AvailableCreditLimit: <TypographyProps>{
      label: `Available credit limit`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontColor: ColorTokens.Grey_Charcoal,
      fontSize: FontSizeTokens.SM,
      lineHeight: 18
    },
    creditLimitCard2: <CardProps>{
      borderBottomRightRadius: BorderRadiusTokens.BR3,
      borderBottomLeftRadius: BorderRadiusTokens.BR3,
      bgColor: ColorTokens.Grey_Milk_1,
      width: StackWidth.FULL,
      padding: {
        top: SizeTypeTokens.NONE,
        bottom: SizeTypeTokens.LG,
        left: SizeTypeTokens.LG,
        right: SizeTypeTokens.LG,
      },
      bodyOrientation: CardOrientation.HORIZONTAL,
      body: {
        widgetItems: [{ id: "stack3", type: WIDGET.STACK }],
      },
    },
    Value2: <TypographyProps>{
      label: `₹${addCommasToNumber(availableAmount)}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      fontColor: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      lineHeight:18
    },
    AvailableCreditLimit2: <TypographyProps>{
      label: `₹${addCommasToNumber(totalPortfolio)}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      fontColor: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.XS,
      lineHeight:16
    },
    space: <SpaceProps>{
      size: SizeTypeTokens.XL,
    },
    text: <TypographyProps>{
      label: `Credit limit by mutual fund`,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "400",
      fontSize: FontSizeTokens.MD,
      color: ColorTokens.Grey_Night,
    },
    space2: <SpaceProps>{
      size: SizeTypeTokens.XL,
    },
    mfStack: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "mfText", type: WIDGET.TEXT },
        { id: "mfText2", type: WIDGET.TEXT },
      ],
    },
    mfText: <TypographyProps>{
      label: `Mutual fund`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.XS,
    },
    mfText2: <TypographyProps>{
      label: `Available credit limit`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "400",
      fontSize: FontSizeTokens.XS,
    },
    space3: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    divider: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
    },
    ...(await portfolioListDatastoreBuilder(stepResponseObject, assetRepository)),
    ctaCard: <CardProps>{
      bgColor: ColorTokens.White,
      width: StackWidth.FULL,
      bodyOrientation: CardOrientation.HORIZONTAL,
      body: {
        widgetItems: [{ id: "ctaStack", type: WIDGET.STACK }],
      },
    },
    ctaStack: <StackProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "ctaText", type: WIDGET.TEXT },
        { id: "ctaSpace", type: WIDGET.SPACE },
        { id: "ctaButton", type: WIDGET.BUTTON },
      ],
    },
    ctaText: <TypographyProps>{
      label: `Last fetched on ${formattedDate}`,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "600",
      fontSize: FontSizeTokens.XS,
    },
    ctaSpace: <SpaceProps>{
      size: SizeTypeTokens.MD,
    },
    ctaButton: <ButtonProps>{
      label: `Refresh portfolio`,
      width: ButtonWidthTypeToken.FULL,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      type: ButtonTypeTokens.LargeFilled,
      fontSize: FontSizeTokens.SM,
      action: {
        type: ACTION.GET_MORE_MF_PORTFOLIO,
        payload: <GetMoreMfPortfolioPayload>{
          casList: stepResponseObject.availableCAS,
          assetRepository: assetRepository
        },
        routeId: ROUTE.PORTFOLIO_FROM_RTA,
      },
    },
  },
});

export const portfoliofromRTAMf: PageType<any> = {
  onLoad: async ({ network }, { assetRepository }) => {
    const updateAvailableCASMap = {};
    const user: User = await SharedPropsService.getUser();

    const pledgeLimitResponse = await network.get(
      `${api.pledgeLimit}${user.linkedApplications[0].applicationId}`,
      { headers: await getAppHeader() }
    );
    /*** update authCAS in SharedPropsService if fetched from api ***/
    await SharedPropsService.setAuthCASResponse(pledgeLimitResponse.data);

    const availableCAS: AvailableCASItem[] =
      pledgeLimitResponse.data.stepResponseObject.availableCAS || [];
    await SharedPropsService.setCasListOriginal(availableCAS);
    const stepResponseObject = pledgeLimitResponse.data.stepResponseObject;

    const date = assetRepository === "CAMS"
        ? stepResponseObject.repositoryAssetMetadataMap.CAMS.casFetchDate
        : stepResponseObject.repositoryAssetMetadataMap.KARVY.casFetchDate;

    const formattedDate = moment.unix(Number(date)).format("DD MMM, YYYY");

    const availableAmount =
        assetRepository === "CAMS"
        ? stepResponseObject.repositoryAssetMetadataMap.CAMS
            .availableCreditAmount
        : stepResponseObject.repositoryAssetMetadataMap.KARVY
            .availableCreditAmount;

    const totalPortfolio =
        assetRepository === "CAMS"
        ? stepResponseObject.repositoryAssetMetadataMap.CAMS
            .availablePortfolioAmount
        : stepResponseObject.repositoryAssetMetadataMap.KARVY
            .availablePortfolioAmount;

    /*** Prefill pledgeUnit ***/
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      item.pledgedUnits = item.totalAvailableUnits;
      updateAvailableCASMap[key] = item;
    });
    return Promise.resolve(
      template(
        stepResponseObject,
        formattedDate,
        availableAmount,
        totalPortfolio,
        assetRepository
      )
    );
  },
  actions: {
    [ACTION.GO_BACK]: goBackAction,
    [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
  },
};
