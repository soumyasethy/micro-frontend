import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema,} from "@voltmoney/types";
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
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION} from "./types";
import {continueLimit} from "./actions";
import {fetchPledgeLimitRepo} from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import {AuthCASModel} from "../../../types/AuthCASModel";

export const template: (availableCreditAmount: number) => TemplateSchema = (
  availableCreditAmount
) => ({
  layout: <Layout>{
    id: ROUTE.UNLOCK_LIMIT_LANDING_NEW,
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
    congratulationsText: <TypographyProps> {
      label: 'Congratulations!',
      fontSize: FontSizeTokens.XL,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: '700',
      lineHeight: 28,
    },
    titleText: <TypographyProps> {
      label: 'Your portfolio was evaluated successfully',
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      lineHeight: 20,
    },
    amountCard: <LimitCardProps> {
      isView: false,
      limitAmount: '10000',
      beforeOutOf: '30000',
      afterOutOf: '60000',
      label: 'Available credit limit',
    },
    continue: <ButtonProps> {
      label: 'continue',
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
    },
    otherSourceStack: <StackProps> {
      type: StackType.column,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: 'infoText', type: WIDGET.TEXT },
        { id: 'infoButton', type: WIDGET.BUTTON }
      ]
    },
    infoText: <TypographyProps> {
      label: 'Don’t see all your mutual funds?',
      fontSize: FontSizeTokens.SM,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: '400',
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 20,
    },
    infoButton: <ButtonProps> {
      label: 'Get from other sources?',
      type: ButtonTypeTokens.MediumGhost,
      width: ButtonWidthTypeToken.FULL,
    },
    bottomSheet: <BottomSheetProps> {
      widgetItems:[
         
      ]
    },
    topSpace: <SpaceProps> { size: SizeTypeTokens.XXXXL },
    space1: <SpaceProps> { size: SizeTypeTokens.XXXL },
    space2: <SpaceProps> { size: SizeTypeTokens.XL },
    space3: <SpaceProps> { size: SizeTypeTokens.XL },
  },
});

export const unlockLimitLandingNewMF: PageType<any> = {
  onLoad: async () => {
    const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
    const responseX = authCAS ? authCAS : await fetchPledgeLimitRepo();
    const availableCreditAmount: number =
      responseX.stepResponseObject.availableCreditAmount || 0;
    /*** disable this page for next time ***/
    await SharedPropsService.setPledgeFirstTime(false);
    return Promise.resolve(template(availableCreditAmount));
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
  },
  clearPrevious: true,
};
