import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { AccordionProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import {
  AssetRepositoryType,
  ConfigTokens,
  ConfigValues,
} from "../../../configs/config";
import { accordionData, GetMoreMfPortfolioPayload, pagePayload } from "./types";
let value = ConfigValues.MinimumAmountAllowed.toString();

export const goKfin: ActionFunction<pagePayload> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore }
) => {
  await navigate(ROUTE.PORTFOLIO_FROM_RTA, {
    assetRepository: action.payload.value,
  });
};

export const goPortfolio: ActionFunction<pagePayload> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore }
) => {
  await navigate(ROUTE.SET_CREDIT_LIMIT);
};

export const goToNext: ActionFunction<accordionData> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore }
) => {
  await setDatastore(ROUTE.MF_PLEDGE_PORTFOLIO, "trial", <AccordionProps>{
    activeIndex: action.payload.activeIndex,
  });

  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO, {
    activeIndex: action.payload.activeIndex,
  });
};

export const getMoreMfPortfolio: ActionFunction<
    GetMoreMfPortfolioPayload
> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(
      ConfigTokens.IS_MF_FETCH_BACK_ALLOWED,
      true
  );
  /*** switch between assetRepositoryType */
  const assetType = action.payload.value;

  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  await SharedPropsService.setConfig(ConfigTokens.IS_RTA_SWITCH_ENABLED, false);

  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
      ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
      true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {
    setIsUserLoggedIn: true,
    assetRepository: assetType,
  });
  /*** remove fetch more asset type option from UI */
};

export const goBack: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate, goBack, setDatastore }
) => {
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO);
};