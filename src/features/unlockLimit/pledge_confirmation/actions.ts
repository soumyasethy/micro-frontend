import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { OtpPayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { PledgeCreateRepo } from "../unlock_limit/repo";

export const sendOtp: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, handleError }
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
        // pledgedUnits: item.totalAvailableUnits,
      });
    } else if (item.assetRepository === "KARVY") {
      assetRepositoryKFIN.push({
        ...item,
        is_pledged: true,
        // pledgedUnits: item.totalAvailableUnits,
      });
    }
  });

  const response = await PledgeCreateRepo("KARVY", assetRepositoryKFIN);
  await setDatastore(action.routeId, action.payload.widgetId, <ButtonProps>{
    loading: false,
  });
  await handleError(response, {
    failed: "Something went wrong",
    ctaLabel: "Go Back",
  });
  await navigate(ROUTE.PLEDGE_VERIFY, { assetRepository: "KARVY" });
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
