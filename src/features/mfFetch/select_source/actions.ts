import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../../configs/api";
import {
  ButtonProps,
  IconProps,
  IconTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  ConfigTokens,
  getAppHeader,
} from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { AnalyticsEventTracker } from "../../../configs/constants";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";

let selectedAssetRepository: AssetRepositoryType;
export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const toggleRadio: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  if (action.payload.value === "kfin") {
    await setDatastore(action.routeId, "kfinRadio", <IconProps>{
      name: IconTokens.RadioCircleFilled,
    });
    await setDatastore(action.routeId, "camsRadio", <IconProps>{
      name: IconTokens.RadioCircleNotFilled,
    });
    selectedAssetRepository = AssetRepositoryType.KARVY;
  } else {
    await setDatastore(action.routeId, "kfinRadio", <IconProps>{
      name: IconTokens.RadioCircleNotFilled,
    });
    await setDatastore(action.routeId, "camsRadio", <IconProps>{
      name: IconTokens.RadioCircleFilled,
    });
    selectedAssetRepository = AssetRepositoryType.CAMS;
  }
};

export const confirmCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {assetRepository: selectedAssetRepository});
};
