import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { LimitPayload } from "./types";
import { OtpPledgePayload } from "../pledge_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryType } from "../../../configs/config";

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
export const getMoreMfPortfolio: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  // const assetRepoMap: { [key in AssetRepositoryType]: boolean } =
  //   await SharedPropsService.getAssetRepositoryFetchMap();
  //
  // let nextAssetRepo: AssetRepositoryType = undefined;
  //
  // Object.keys(assetRepoMap).forEach((assetRepoKey) => {
  //   if (!assetRepoMap[assetRepoKey]) {
  //     return (nextAssetRepo = assetRepoKey as AssetRepositoryType);
  //   }
  // });
  // if (nextAssetRepo) {
  await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
  navigate(ROUTE.MF_FETCH_PORTFOLIO);
  // }
};
