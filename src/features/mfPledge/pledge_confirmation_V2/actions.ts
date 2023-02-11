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
  getAppHeader, getPrimaryAssetRepository,
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

  AssetRepositoryMap.get(AssetRepositoryType.CAMS).LIST = [];
  AssetRepositoryMap.get(AssetRepositoryType.KARVY).LIST = [];

  let primaryType = await getPrimaryAssetRepository();

  action.payload.portFolioArray.forEach((item) => {
    if (item.pledgedUnits > 0) {
      AssetRepositoryMap.get(AssetRepositoryType[item.assetRepository]).LIST.push({
        ...item,
        is_pledged: true,
      });
    }
  });

  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  /**** check if user has empty cams portfolio then switch asset repository type ****/
  if (
      AssetRepositoryMap.get(AssetRepositoryType.CAMS).LIST.length === 0 ||
      AssetRepositoryMap.get(AssetRepositoryType.CAMS).IS_PLEDGED) {
    primaryType = AssetRepositoryType.KARVY;
  }

  const body = {
    applicationId: applicationId,
    assetRepository: primaryType,
    portfolioItemList: AssetRepositoryMap.get(primaryType).LIST,
  };

  /** actual api call with body */
  const response = await network.post(api.pledgeCreate, body, {
    headers: await getAppHeader(),
  });

  if (_.get(response, "data.status") === "SUCCESS") {
    analytics(AnalyticsEventTracker.borrower_mf_pledge_init["Event Name"], {
      ...AnalyticsEventTracker.borrower_mf_pledge_init,
    });
    await navigate(ROUTE.PLEDGE_VERIFY, {
      assetRepository: primaryType,
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
