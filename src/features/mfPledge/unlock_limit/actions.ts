import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, GetMoreMfPortfolioPayload, LimitPayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType, ConfigTokens } from "../../../configs/config";
import { WIDGET } from "@voltmoney/schema";
import { isMorePortfolioRenderCheck } from "../../../configs/utils";
import { SelectAssets } from "../modify_limit/actions";
import { AssetsPayload } from "../modify_limit/types";
import { ACTION as MODIFY_LIMIT_ACTION } from "../modify_limit/types";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MODIFY_LIMIT, {
    stepResponseObject: action.payload.value,
  });
  // action.payload.value.availableCAS.forEach((item, index) => {
  //   action.payload.value.availableCAS[index].pledgedUnits =
  //     item.totalAvailableUnits;
  // });
  // await navigate(ROUTE.PLEDGE_CONFIRMATION, {
  //   stepResponseObject: action.payload.value,
  // });
};

export const selectPortfolio: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  // await navigate(ROUTE.MODIFY_LIMIT, {
  //   stepResponseObject: action.payload.value,
  // });
  await SelectAssets(
    {
      type: MODIFY_LIMIT_ACTION.CONFIRM_CTA,
      payload: <AssetsPayload>{
        value: "",
        widgetId: "input",
        stepResponseObject: action.payload.value,
      },
      routeId: ROUTE.MODIFY_LIMIT,
    },
    {},
    { navigate, ...props }
  );
};
export const getMoreMfPortfolio: ActionFunction<
  GetMoreMfPortfolioPayload
> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  /*** check if the user has pledged any mf portfolio */
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
  for (const assetRepositoryType of Object.keys(assetRepoMap)) {
    if (assetRepositoryType === AssetRepositoryType.KARVY) {
      await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
    } else if (assetRepositoryType === AssetRepositoryType.CAMS) {
      await SharedPropsService.setAssetRepositoryType(
        AssetRepositoryType.KARVY
      );
    }
  }
  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  await SharedPropsService.setConfig(ConfigTokens.IS_RTA_SWITCH_ENABLED, false);

  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
    true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO);
  /*** remove fetch more asset type option from UI */
  await removeGetMorePortfolio(
    {
      type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
      routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
      payload: {},
    },
    {},
    { navigate, ...props }
  );
};
export const removeGetMorePortfolio: ActionFunction<any> = async (
  action,
  _datastore,
  { removeWidgets }
): Promise<any> => {
  if (await isMorePortfolioRenderCheck()) {
    await removeWidgets(ROUTE.MF_PLEDGE_PORTFOLIO, [
      { id: "fetchMorePortfolioBtn", type: WIDGET.BUTTON },
    ]);
  }
};
