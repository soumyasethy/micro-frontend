import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { OtpPayloadForPledgeConfirm } from "./types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryMap, getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";

export const sendOtpForPledgeConfirm: ActionFunction<
  OtpPayloadForPledgeConfirm
> = async (
  action,
  _datastore,
  { network, navigate, setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    label: "",
    type: ButtonTypeTokens.LargeOutline,
    loading: true,
  });

  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  AssetRepositoryMap[assetRepositoryType].LIST = [];
  action.payload.value.availableCAS.forEach((item) => {
    if (item.pledgedUnits > 0) {
      AssetRepositoryMap[item.assetRepository.toUpperCase()].LIST.push({
        ...item,
        is_pledged: true,
      });
    }
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  const body = {
    applicationId: applicationId,
    assetRepository: assetRepositoryType,
    portfolioItemList: AssetRepositoryMap[assetRepositoryType].LIST,
  };

  const response = await network.post(api.pledgeCreate, body, {
    headers: await getAppHeader(),
  });

  if (_.get(response, "data.status") === "SUCCESS") {
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
