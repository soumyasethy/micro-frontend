import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { GetMoreMfPortfolioPayload, LimitPayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
} from "../../../configs/config";
import { WIDGET } from "@voltmoney/schema";

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
> = async (action, _datastore, { navigate }): Promise<any> => {
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
};
export const removeGetMorePortfolio: ActionFunction<any> = async (
  action,
  _datastore,
  { removeWidgets }
): Promise<any> => {
  const casList = await SharedPropsService.getCasListOriginal();
  /*** check if the user has pledged any mf portfolio */
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < casList.length; i++) {
    const item = casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** remove if both Karvy and Cams are present */
  if (
    Object.keys(assetRepoMap).length === 2 ||
    (Object.keys(assetRepoMap).length == 1 &&
      (AssetRepositoryMap[AssetRepositoryType.CAMS].isDisabled ||
        AssetRepositoryMap[AssetRepositoryType.KARVY].isDisabled))
  ) {
    await removeWidgets(ROUTE.MF_PLEDGE_PORTFOLIO, [
      { id: "fetchMorePortfolioBtn", type: WIDGET.BUTTON },
    ]);
  }
};
