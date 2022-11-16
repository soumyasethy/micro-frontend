import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { OtpPayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import _ from "lodash";

export const sendOtp: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    loading: true,
  });
  const assetRepositoryCams = [];
  const assetRepositoryKFIN = [];
  action.payload.value.availableCAS.map((item) => {
    if (item.assetRepository === "CAMS") {
      assetRepositoryCams.push({
        ...item,
        is_pledged: true,
      });
    } else if (item.assetRepository === "KARVY") {
      assetRepositoryKFIN.push({
        ...item,
        is_pledged: true,
      });
    }
  });

  const response = await network.post(
    api.pledgeCreate,
    {
      applicationId: (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId,
      assetRepository: "KARVY",
      portfolioItemList: assetRepositoryKFIN,
    },
    { headers: await getAppHeader() }
  );
  if (_.get(response, "data.status") === "SUCCESS") {
    await navigate(ROUTE.PLEDGE_VERIFY, { assetRepository: "KARVY" });
  }

  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
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
