import { ActionFunction } from "@voltmoney/types";
import { FetchPortfolioPayload, PanEditPayload } from "./types";
import { api } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { getAppHeader } from "../../../configs/config";
let hasChangedInDetails = false;

export const editPanNumber: ActionFunction<PanEditPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  hasChangedInDetails = true;
  await navigate(ROUTE.KYC_PAN_VERIFICATION, {
    applicationId: action.payload.applicationId,
    panNumber: action.payload,
    targetRoute: action.payload.targetRoute,
  });
};
export const editMobileNumber: ActionFunction<PanEditPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  hasChangedInDetails = true;
  const applicationId = await SharedPropsService.getApplicationId();
  await navigate(ROUTE.PARTNER_MOBILE_UPDATE, {
    applicationId: applicationId,
    mobileNo:action.payload.value.substring(3)
  });
};
export const editEmailId: ActionFunction<PanEditPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  hasChangedInDetails = true;
  const applicationId = await SharedPropsService.getApplicationId();
  await navigate(ROUTE.PARTNER_EMAIL_UPDATE, {
    applicationId: applicationId,
    prevEmail: action.payload.value
  });
};
export const fetchMyPortfolio: ActionFunction<FetchPortfolioPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await navigate(ROUTE.OTP_PARTNER_PORTFOLIO);
};

export const goBack: ActionFunction<FetchPortfolioPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
};
