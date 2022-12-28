import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, GetMoreMfPortfolioPayload, LimitPayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType } from "../../../configs/config";
import { WIDGET } from "@voltmoney/schema";
import { isMorePortfolioRenderCheck } from "../../../configs/utils";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  action.payload.value.availableCAS.forEach((item, index) => {
    action.payload.value.availableCAS[index].pledgedUnits =
      item.totalAvailableUnits;
  });
  await navigate(ROUTE.PLEDGE_CONFIRMATION, {
    stepResponseObject: action.payload.value,
  });
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
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
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

  await navigate(ROUTE.MF_FETCH_PORTFOLIO);
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
