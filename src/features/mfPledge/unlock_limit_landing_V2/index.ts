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
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  IconTokens,
  LimitCardProps,
  LottieProps, LottieSizeTokens,
  LottieTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StepperStateToken,
  TypographyProps,
  WIDGET
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, StepResponseObject } from "./types";
import {
  continueLimit,
  getMoreMfPortfolio,
  onLoad,
  removeGetMorePortfolio,
} from "./actions";
import { fetchPledgeLimitRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";
import { AuthCASModel } from "../../../types/AuthCASModel";
import { portfolioListDatastoreBuilder } from "../portfolio_readonly/utils";
import { StepStatusMap, User } from "../../login/otp_verify/types";
import { AvailableCASItem } from "../unlock_limit/types";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { NavigationNext } from "../../kyc/kyc_init/types";
import {
  addCommasToNumber,
  isMorePortfolioRenderCheck,
} from "../../../configs/utils";
import _ from "lodash";
import { commonTemplates } from "../../../configs/common";
import { TextConstants } from "../../../configs/constants";

/*** This will be used to auto trigger removeGetMorePortfolio action when user has already pledged both CAMS and KARVY from UI */
let availableCASX: AvailableCASItem[];

export const template: (
  availableCreditAmount: number,
  availableCAS: AvailableCASItem[],
  stepResponseObject: StepResponseObject,
  shouldShowGetMorePortfolio: boolean,
  totalPortfolioAmount: number
) => Promise<TemplateSchema> = async (
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
      { id: "lottie", type: WIDGET.LOTTIE, position: POSITION.ABSOLUTE_CENTER },
      { id: "topSpace", type: WIDGET.SPACE },
      { id: "congratulationsText", type: WIDGET.TEXT },
      { id: "titleText", type: WIDGET.TEXT },
      { id: "space1", type: WIDGET.SPACE },
      { id: "amountCard", type: WIDGET.LIMIT_CARD },
      { id: "space2", type: WIDGET.SPACE },
      { id: "continue", type: WIDGET.BUTTON },
      { id: "space3", type: WIDGET.SPACE },
      { id: "otherSourceStack", type: WIDGET.STACK },
      { id: "space4", type: WIDGET.SPACE },
      { id: "divider", type: WIDGET.DIVIDER },
      { id: "space5", type: WIDGET.SPACE },
      { id: "bottomSheetStack", type: WIDGET.STACK },
      { id: "bs_space0", type: WIDGET.SPACE },
      { id: "infoRow", type: WIDGET.STACK },
      { id: "bs_space3", type: WIDGET.SPACE },
      { id: "divider2", type: WIDGET.DIVIDER },
      shouldShowGetMorePortfolio
        ? { id: "otherSourceStack", type: WIDGET.STACK }
        : { id: "skip", type: WIDGET.SPACE },
      // { id: 'bottomSheet', type: WIDGET.BOTTOMSHEET, position: POSITION.STICKY_BOTTOM, padding: { left: 0, right: 0 }},
      { id: "bs_space2", type: WIDGET.SPACE },
      { id: "listItem", type: WIDGET.LIST },
    ],
  },
  datastore: <Datastore>{
    lottie: <LottieProps>{
      uri: LottieTokens.UnlockNew,
      autoplay: true,
      loop: false,
      size: LottieSizeTokens.FULL,
    },
    congratulationsText: <TypographyProps>{
      label: "Congratulations!",
      fontSize: FontSizeTokens.XL,
      fontFamily: FontFamilyTokens.Poppins,
      color: ColorTokens.Grey_Night,
      fontWeight: "700",
      lineHeight: 28,
    },
    titleText: <TypographyProps>{
      label: "Your portfolio was evaluated successfully",
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Inter,
      color: ColorTokens.Grey_Night,
      fontWeight: "400",
      lineHeight: 20,
    },
    amountCard: <LimitCardProps>{
      isView: false,
      limitAmount: `${addCommasToNumber(
        parseInt(availableCreditAmount.toString())
      )}`,
      fetchedAmount: `${addCommasToNumber(
        parseInt(stepResponseObject["totalPortfolioAmount"].toString())
      )}`,
      label: "Available credit limit",
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "700",
      fontSize: FontSizeTokens.SM,
      action: {
        type: ACTION.UNLOCK_LIMIT,
        routeId: ROUTE.UNLOCK_LIMIT_LANDING,
        payload: {},
      },
    },
    otherSourceStack: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "infoText", type: WIDGET.TEXT },
        { id: "infoButton", type: WIDGET.BUTTON },
      ],
    },
    ...commonTemplates.fetchMoreFromOtherSource("otherSourceStack", {
      type: ACTION.GET_MORE_MF_PORTFOLIO,
      routeId: ROUTE.UNLOCK_LIMIT_LANDING,
      payload: {
        casList: stepResponseObject.availableCAS,
      },
    }).datastore,
    bs_space0: <SpaceProps>{ size: SizeTypeTokens.XL },
    bs_space1: <SpaceProps>{ size: SizeTypeTokens.MD },
    bs_space2: <SpaceProps>{ size: SizeTypeTokens.MD },
    divider: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
    },
    space5: <SpaceProps>{ size: SizeTypeTokens.XL },
    bottomSheetStack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.flexStart,
      alignItems: StackAlignItems.center,
      widgetItems: [{ id: "bottomSheetText", type: WIDGET.TEXT }],
    },
    bottomSheetText: <TypographyProps>{
      label: "Credit limit by mutual fund",
      fontSize: FontSizeTokens.MD,
      fontFamily: FontFamilyTokens.Poppins,
      fontWeight: "700",
      color: ColorTokens.Grey_Night,
      lineHeight: 24,
    },
    bs_space3: <SpaceProps>{ size: SizeTypeTokens.Size10 },
    infoRow: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "col1Header", type: WIDGET.TEXT },
        { id: "col2Header", type: WIDGET.TEXT },
      ],
    },
    divider2: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
    },
    col1Header: <TypographyProps>{
      label: "Mutual fund",
      fontSize: FontSizeTokens.XS,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
    },
    col2Header: <TypographyProps>{
      label: "Available credit limit",
      fontSize: FontSizeTokens.XS,
      fontFamily: FontFamilyTokens.Inter,
      fontWeight: "500",
      color: ColorTokens.Grey_Charcoal,
      lineHeight: 18,
    },
    ...(await portfolioListDatastoreBuilder(stepResponseObject)),
    topSpace: <SpaceProps>{ size: SizeTypeTokens.XXXXL },
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    space2: <SpaceProps>{ size: SizeTypeTokens.XL },
    space3: <SpaceProps>{ size: SizeTypeTokens.XL },
    space4: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
});

export const unlockLimitLandingMFV2: PageType<any> = {
  onLoad: async ({ showPopup, network, goBack }) => {
    /*** disable this page for next time to stop Animation ***/
    await SharedPropsService.setPledgeFirstTime(false);

    const updateAvailableCASMap = {};
    const user: User = await SharedPropsService.getUser();
    const authCAS: AuthCASModel = await SharedPropsService.getAuthCASResponse();
    const pledgeLimitResponse = authCAS
      ? { data: authCAS }
      : await fetchPledgeLimitRepo().then((response) => ({
          data: response,
        }));
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
            subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
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
    await SharedPropsService.setCreditLimit(availableCreditAmount);
    return Promise.resolve(
      template(
        availableCreditAmount,
        availableCASX,
        stepResponseObject,
        isGetMorePortfolio,
        totalPortfolioAmount
      )
    );
  },

  actions: {
    [ACTION.UNLOCK_LIMIT]: continueLimit,
    [ACTION.GET_MORE_MF_PORTFOLIO]: getMoreMfPortfolio,
    [ACTION.REMOVE_GET_MORE_MF_PORTFOLIO]: removeGetMorePortfolio,
    [ACTION.ON_LOAD]: onLoad,
  },
  action: {
    routeId: ROUTE.UNLOCK_LIMIT_LANDING,
    payload: {},
    type: ACTION.ON_LOAD,
  },
  clearPrevious: true,
};
