import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { OtpPayloadForPledgeConfirm } from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  VerificationCardProps,
} from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  getAppHeader,
} from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";
import { AnalyticsEventTracker } from "../../../configs/constants";

export const sendOtpForPledgeConfirm: ActionFunction<
  OtpPayloadForPledgeConfirm
> = async (
  action,
  _datastore,
  { analytics, network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(ROUTE.ALERT_PAGE, "alert", <VerificationCardProps>{
    loading: true,
  });

  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    label: "",
    type: ButtonTypeTokens.LargeOutline,
    loading: true,
  });

  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  AssetRepositoryMap[assetRepositoryType].LIST = [];
  action.payload.portFolioArray.forEach((item) => {
    if (item.pledgedUnits > 0) {
      AssetRepositoryMap[item.assetRepository.toUpperCase()].LIST.push({
        ...item,
        is_pledged: true,
      });
    }
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  /*** check if the user has selected both karvy and cams ***/
  const assetRepositoryConfig =
    await SharedPropsService.getAssetRepositoryFetchMap();

  /*** update the config if the user has selected both karvy and cams ***/
  for (const assetType of Object.keys(AssetRepositoryType)) {
    assetRepositoryConfig[assetType].isPledgedRequired =
      AssetRepositoryMap[assetType].LIST.length > 0;
    await SharedPropsService.setAssetRepositoryFetchMap(
      assetRepositoryConfig[assetType],
      assetType as AssetRepositoryType
    );
  }

  const body = {
    applicationId: applicationId,
    assetRepository: assetRepositoryType,
    portfolioItemList: AssetRepositoryMap[assetRepositoryType].LIST,
  };
  /**** check if user has empty portfolio then switch asset repository type ****/
  if (
    assetRepositoryType === AssetRepositoryType.KARVY &&
    AssetRepositoryMap[AssetRepositoryType.KARVY].LIST.length === 0
  ) {
    body["assetRepository"] = AssetRepositoryType.CAMS;
    body["portfolioItemList"] =
      AssetRepositoryMap[AssetRepositoryType.CAMS].LIST;
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
  } else if (
    assetRepositoryType === AssetRepositoryType.CAMS &&
    AssetRepositoryMap[AssetRepositoryType.CAMS].LIST.length === 0
  ) {
    body["assetRepository"] = AssetRepositoryType.KARVY;
    body["portfolioItemList"] =
      AssetRepositoryMap[AssetRepositoryType.KARVY].LIST;
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.KARVY);
  }
  /** actual api call with body */
  const response = await network.post(api.pledgeCreate, body, {
    headers: await getAppHeader(),
  });

  if (_.get(response, "data.status") === "SUCCESS") {
    analytics(AnalyticsEventTracker.borrower_mf_pledge_init["Event Name"], {
      ...AnalyticsEventTracker.borrower_mf_pledge_init,
    });
    await navigate(ROUTE.PLEDGE_VERIFY, {
      assetRepository: AssetRepositoryMap[assetRepositoryType].NAME,
      sendOtpForPledgeConfirmAction: action,
    });
  }

  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    label: "Confirm & get OTP",
    type: ButtonTypeTokens.LargeFilled,
    loading: false,
  });
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};

export const goToFaq: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.FAQ);
};
