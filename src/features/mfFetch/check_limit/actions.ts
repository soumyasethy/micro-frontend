import { ActionFunction } from "@voltmoney/types";
import { FetchPortfolioPayload, PanEditPayload } from "./types";
import { api } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { AssetRepositoryMap, getAppHeader } from "../../../configs/config";
import _ from "lodash";

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
  await navigate(ROUTE.UPDATE_PHONE_NUMBER, {
    applicationId: action.payload.applicationId,
  });
};
export const editEmailId: ActionFunction<PanEditPayload> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  hasChangedInDetails = true;
  await navigate(ROUTE.UPDATE_EMAIL_ID, {
    applicationId: action.payload.applicationId,
  });
};
export const fetchMyPortfolio: ActionFunction<FetchPortfolioPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
    label: "",
    type: ButtonTypeTokens.LargeOutline,
    loading: true,
  });
  const user: User = await SharedPropsService.getUser();

  if (hasChangedInDetails) {
    action.payload.panNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
    action.payload.phoneNumber =
      user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    action.payload.emailId = user.linkedBorrowerAccounts[0].accountHolderEmail;
    if (!action.payload.applicationId) {
      action.payload.applicationId = user.linkedApplications[0].applicationId;
    }
  }
  const response = await network.post(
    api.pledgeInit,
    <FetchPortfolioPayload>{
      ...action.payload,
      assetRepository: await SharedPropsService.getAssetRepositoryType(),
    },
    {
      headers: await getAppHeader(),
    }
  );
  await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
    label: "Get my portfolio",
    type: ButtonTypeTokens.LargeFilled,
    loading: false,
  });

  user.linkedApplications[0].currentStepId = _.get(
    response,
    "response.data.updatedApplicationObj.currentStepId",
    response.data.updatedApplicationObj.currentStepId
  );
  await SharedPropsService.setUser(user);

  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();

  /*** Reset to default asset repository type if the user has changed the asset repository type from the settings page */
  await setDatastore(ROUTE.OTP_AUTH_CAS, "input", <TextInputProps>{
    state: InputStateToken.DEFAULT,
    charLimit: AssetRepositoryMap[assetRepositoryType].OTP_LENGTH,
  });
  await setDatastore(ROUTE.OTP_AUTH_CAS, "subTitle", <TextInputProps>{
    label: `${AssetRepositoryMap[assetRepositoryType].NAME} depository has sent an OTP to `,
  });

  await navigate(ROUTE.OTP_AUTH_CAS, <FetchPortfolioPayload>{
    ...action.payload,
    assetRepository: await SharedPropsService.getAssetRepositoryType(),
  });
};