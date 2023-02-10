import {ActionFunction} from "@voltmoney/types";
import {ROUTE} from "../../../routes";
import {LimitPayload} from "./types";
import {isMorePortfolioRenderCheck} from "../../../configs/utils";
import {ACTION, GetMoreMfPortfolioPayload} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import {AssetRepositoryType, ConfigTokens} from "../../../configs/config";
import {WIDGET} from "@voltmoney/schema";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  /*
  const routeObj = await nextStepId(ROUTE.MF_PLEDGE_PORTFOLIO);
  await navigate(routeObj.routeId, routeObj.params);
  */
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO);
};

export const modifyLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MODIFY_LIMIT, {
    stepResponseObject: action.payload.value,
  });
};

export const getMoreMfPortfolio: ActionFunction<
    GetMoreMfPortfolioPayload
    > = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  /*** check if the user has pledged any mf portfolio */
  const assetRepoMap = new Map();
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap.set(item.assetRepository, true);
  }
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(ConfigTokens.IS_MF_FETCH_BACK_ALLOWED, true);
  /*** choosing default assetRepositoryType and then validating if switch is required */
  let assetRepoType;

  if(!assetRepoMap.has(AssetRepositoryType.KARVY)) {
    assetRepoType = AssetRepositoryType.KARVY
  } else {
    assetRepoType = AssetRepositoryType.CAMS
  }

  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
      ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
      true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {assetRepository: assetRepoType});
  /*** remove fetch more asset type option from UI */
  await removeGetMorePortfolio(
      {
        type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
        routeId: ROUTE.UNLOCK_LIMIT_LANDING,
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
  console.log("isMorePortfolioRenderCheck: ", await isMorePortfolioRenderCheck())
  if (!(await isMorePortfolioRenderCheck())) {
    console.log("Remove Widget");
    await removeWidgets(ROUTE.UNLOCK_LIMIT_LANDING, [
      { id: "otherSourceStack", type: WIDGET.STACK },
    ]);
  }
};

export const onLoad: ActionFunction<any> = async (
  action,
  _datastore,
  { removeWidgets }
): Promise<any> => {
  if (!(await isMorePortfolioRenderCheck())) {
    console.log("Remove Widget")
    await removeWidgets(ROUTE.UNLOCK_LIMIT_LANDING, [
      { id: "otherSourceStack", type: WIDGET.STACK },
    ]);
  }
    setTimeout(() => {
      removeWidgets(ROUTE.UNLOCK_LIMIT_LANDING, [
        { id: "lottie", type: WIDGET.LOTTIE },
      ]);
    }, 2000);
};
