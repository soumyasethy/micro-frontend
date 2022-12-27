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
  // const assetRepositoryMap =
  //   await SharedPropsService.getAssetRepositoryFetchMap();
  //
  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  // assetRepositoryMap[assetRepositoryType].isFetched = true;
  //
  // await SharedPropsService.setAssetRepositoryFetchMap(
  //   assetRepositoryType,
  //   assetRepositoryMap[assetRepositoryType]
  // );

  if (assetRepositoryType === AssetRepositoryType.KARVY) {
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
    // await SharedPropsService.setPledgeFirstTime(true);
  } else if (assetRepositoryType === AssetRepositoryType.CAMS) {
    // await SharedPropsService.setPledgeFirstTime(true);
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.KARVY);
  }
  await navigate(ROUTE.MF_FETCH_PORTFOLIO);
};
