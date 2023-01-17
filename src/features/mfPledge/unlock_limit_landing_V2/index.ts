import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
  BottomSheetProps,
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontFamilyTokens,
  FontSizeTokens, IconTokens,
  LimitCardProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType, StepperStateToken,
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
import {StepStatusMap, User} from "../../login/otp_verify/types";
import {AvailableCASItem} from "../unlock_limit/types";
import {api} from "../../../configs/api";
import {APP_CONFIG, getAppHeader} from "../../../configs/config";
import {NavigationNext} from "../../kyc/kyc_init/types";
import {isMorePortfolioRenderCheck} from "../../../configs/utils";
import _ from "lodash";
import { getMoreMfPortfolio } from "./actions";
import { removeGetMorePortfolio } from "./actions";

/*** This will be used to auto trigger removeGetMorePortfolio action when user has already pledged both CAMS and KARVY from UI */
let availableCASX: AvailableCASItem[];

export const template: (availableCreditAmount: number,
                        availableCAS: AvailableCASItem[],
                        stepResponseObject: StepResponseObject,
                        shouldShowGetMorePortfolio: boolean,
                        totalPortfolioAmount: number
) => Promise<TemplateSchema> = async(
    availableCreditAmount,
    availableCAS,
    stepResponseObject,
    shouldShowGetMorePortfolio,
    totalPortfolioAmount
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
    infoButton: <ButtonProps & WidgetProps>{
      label: 'Get from other sources?',
      type: ButtonTypeTokens.MediumGhost,
      width: ButtonWidthTypeToken.CONTENT,
      action: {
        type: ACTION.GET_MORE_MF_PORTFOLIO,
        routeId: ROUTE.UNLOCK_LIMIT_LANDING,
        payload: {
          casList: stepResponseObject.availableCAS
        }
      }
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

    /*** Show popup as soon as we land here if MF_PLEDGE_PORTFOLIO is PENDING_CALLBACK ***/
    const stepStatusMap: StepStatusMap =
        pledgeLimitResponse.data.updatedApplicationObj.stepStatusMap;
    if (
        stepStatusMap.MF_PLEDGE_PORTFOLIO === StepperStateToken.PENDING_CALLBACK
    ) {
      setTimeout(async () => {
        await showPopup({
          title: `Pledging...`,
          subTitle: "Please wait while we confirm your pledge with depository.",
          type: "DEFAULT",
          iconName: IconTokens.Volt,
        });
      }, 250);

      /***** Starting Polling to check status of MF_PLEDGE_PORTFOLIO *****/
      const PollerRef = setInterval(async () => {
        const mfPledgeStatusResponse = await network.get(
            `${api.borrowerApplication}${user.linkedApplications[0].applicationId}`,
            { headers: await getAppHeader() }
        );
        user.linkedApplications[0] = _.get(mfPledgeStatusResponse, "data");
        await SharedPropsService.setUser(user);
        if (
            _.get(
                mfPledgeStatusResponse,
                "data.stepStatusMap.MF_PLEDGE_PORTFOLIO"
            ) === "COMPLETED" &&
            _.get(mfPledgeStatusResponse, "data.currentStepId") !==
            "MF_PLEDGE_PORTFOLIO"
        ) {
          clearInterval(PollerRef);
          await goBack();
          await showPopup({
            autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
            isAutoTriggerCta: true,
            title: "Limit unlocked successfully!",
            subTitle: "You will be redirected to next step in few seconds",
            type: "SUCCESS",
            ctaLabel: "Continue",
            primary: true,
            ctaAction: {
              type: ACTION.NAV_NEXT,
              routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
              payload: <NavigationNext>{
                stepId: _.get(mfPledgeStatusResponse, "data.currentStepId"),
              },
            },
          });
        }
      }, APP_CONFIG.POLLING_INTERVAL);
    }
    const isGetMorePortfolio = await isMorePortfolioRenderCheck();

    /*** Prefill pledgeUnit ***/
    stepResponseObject.availableCAS.map((item, index) => {
      let key = `${item.isinNo}-${item.folioNo}`;
      item.pledgedUnits = item.totalAvailableUnits;
      updateAvailableCASMap[key] = item;
    });
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);

    return Promise.resolve(template(
        availableCreditAmount,
        availableCASX,
        stepResponseObject,
        isGetMorePortfolio,
        totalPortfolioAmount
    ));
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
    [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
    [ACTION.REMOVE_GET_MORE_MF_PORTFOLIO]: removeGetMorePortfolio,
  },
  clearPrevious: true,
};
