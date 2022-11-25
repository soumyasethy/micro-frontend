import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { OtpPayload } from "./types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  getAppHeader,
} from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";

export const sendOtp: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    label: "",
    type: ButtonTypeTokens.LargeOutline,
    loading: true,
  });
  AssetRepositoryMap[AssetRepositoryType.DEFAULT].LIST = [];
  action.payload.value.availableCAS.map((item) => {
    AssetRepositoryMap[item.assetRepository.toUpperCase()].LIST.push({
      ...item,
      is_pledged: true,
    });
  });

  const response = await network.post(
    api.pledgeCreate,
    {
      applicationId: (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId,
      assetRepository: AssetRepositoryType.DEFAULT,
      portfolioItemList: AssetRepositoryMap[AssetRepositoryType.DEFAULT].LIST,
    },
    { headers: await getAppHeader() }
  );
  if (_.get(response, "data.status") === "SUCCESS") {
    await navigate(ROUTE.PLEDGE_VERIFY, {
      assetRepository: AssetRepositoryMap[AssetRepositoryType.DEFAULT].NAME,
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
