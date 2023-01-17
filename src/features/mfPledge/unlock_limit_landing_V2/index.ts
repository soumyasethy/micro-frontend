import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
  BottomSheetProps,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens,
  LimitCardProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION, StepResponseObject} from "./types";
import {continueLimit} from "./actions";
import {fetchPledgeLimitRepo} from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import {AuthCASModel} from "../../../types/AuthCASModel";
import {portfolioListDatastoreBuilder} from "../portfolio_readonly/utils";

export const template: (availableCreditAmount: number, stepResponseObject: StepResponseObject) => Promise<TemplateSchema> = async(
  availableCreditAmount,
  stepResponseObject
) => ({
  layout: <Layout>{
    id: ROUTE.UNLOCK_LIMIT_LANDING,
    type: LAYOUTS.LIST,
    widgets: [
      { id: 'topSpace', type:WIDGET.SPACE },
      { id: 'congratulationsText', type: WIDGET.TEXT },
      { id: 'titleText', type: WIDGET.TEXT },
      { id: 'space1', type: WIDGET.SPACE },
      { id: 'amountCard', type: WIDGET.LIMIT_CARD },
      { id: 'space2', type: WIDGET.SPACE },
      { id: 'continue', type: WIDGET.BUTTON },
      { id: 'space3', type: WIDGET.SPACE },
      { id: 'otherSourceStack', type: WIDGET.STACK },
      { id: 'bottomSheet', type: WIDGET.BOTTOMSHEET, position: POSITION.STICKY_BOTTOM, padding: { left: 0, right: 0 }},
    ],
  },
  datastore: <Datastore>{
    congratulationsText: <TypographyProps>{
      label: 'Congratulations!',
      fontSize: FontSizeTokens.XL,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: '700',
      lineHeight: 28,
    },
    titleText: <TypographyProps>{
      label: 'Your portfolio was evaluated successfully',
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      lineHeight: 20,
    },
    amountCard: <LimitCardProps>{
      isView: false,
      limitAmount: `${availableCreditAmount}`,
      beforeOutOf: '30000',
      afterOutOf: '60000',
      label: 'Available credit limit',
    },
    continue: <ButtonProps & WidgetProps>{
      label: 'continue',
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.UNLOCK_LIMIT,
        routeId: ROUTE.UNLOCK_LIMIT_LANDING,
        payload: {}
      }
    },
    otherSourceStack: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      widgetItems: [
        {id: 'infoText', type: WIDGET.TEXT},
        {id: 'infoButton', type: WIDGET.BUTTON}
      ]
    },
    infoText: <TypographyProps>{
      label: 'Don’t see all your mutual funds?',
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 20,
    },
    infoButton: <ButtonProps>{
      label: 'Get from other sources?',
      type: ButtonTypeTokens.MediumGhost,
      width: ButtonWidthTypeToken.FULL,
    },
    bottomSheet: <BottomSheetProps>{
      widgetItems: [
        { id:'bottomSheetText', type: WIDGET.TEXT },
        { id: 'bs_space0', type: WIDGET.SPACE },
        { id:'infoRow', type: WIDGET.STACK },
        { id: 'bs_space1', type: WIDGET.SPACE },
        { id: 'listItem', type: WIDGET.LIST },
        { id: 'bs_space2', type: WIDGET.SPACE },
      ]
    },
    bs_space0: <SpaceProps> { size: SizeTypeTokens.XL },
    bs_space1: <SpaceProps> { size: SizeTypeTokens.MD },
    bs_space2: <SpaceProps> { size: SizeTypeTokens.MD },
    bottomSheetText: <TypographyProps> {
      label: 'Credit limit on basis of these assets',
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '700',
      color: ColorTokens.Grey_Night,
      lineHeight: 24,
    },
    infoRow: <StackProps> {
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id:"col1Header", type: WIDGET.TEXT },
        { id:"col2Header", type: WIDGET.TEXT }
      ]
    },
    col1Header: <TypographyProps> {
      label: 'Asset details',
      fontSize: FontSizeTokens.XS,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '500',
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
    },
    col2Header: <TypographyProps> {
      label: 'Credit limit',
      fontSize: FontSizeTokens.XS,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '500',
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
    },
    ...(await portfolioListDatastoreBuilder(stepResponseObject)),
    topSpace: <SpaceProps> { size: SizeTypeTokens.XXXXL },
    space1: <SpaceProps> { size: SizeTypeTokens.XXXL },
    space2: <SpaceProps> { size: SizeTypeTokens.XL },
    space3: <SpaceProps> { size: SizeTypeTokens.XL },
  },
});

export const unlockLimitLandingMFV2: PageType<any> = {
  onLoad: async () => {
    const updateAvailableCASMap = {};
    const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
    const responseX = authCAS ? authCAS : await fetchPledgeLimitRepo();
    const stepResponseObject = responseX.stepResponseObject
    const availableCreditAmount: number = responseX.stepResponseObject.availableCreditAmount || 0;
    /*** disable this page for next time ***/
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      item.pledgedUnits = item.totalAvailableUnits;
      updateAvailableCASMap[key] = item;
    });
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    return Promise.resolve(template(availableCreditAmount, stepResponseObject));
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
  },
  clearPrevious: true,
};
