import { ActionFunction } from "@voltmoney/types";
import { ACTION, FetchPortfolioPayload, PanEditPayload } from "./types";
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
import {
  AssetRepositoryMap, AssetRepositoryType,
  ConfigTokens,
  getAppHeader, getPrimaryAssetRepository,
} from "../../../configs/config";
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
export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO);
};
export const autoTriggerOtp: ActionFunction<any> = async (
  action,
  _datastore,
  { ...props }
) => {
  const userType = await SharedPropsService.getUserType();
  let phoneNumber = "";
  let panNumberX = "";
  let emailId = "";
  let applicationId = "";
  if (userType === "BORROWER") {
    const user: User = await SharedPropsService.getUser();
    panNumberX = user.linkedBorrowerAccounts[0].accountHolderPAN;
    phoneNumber = user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    emailId =
      `${user.linkedBorrowerAccounts[0].accountHolderEmail}`.toLowerCase();
    if (!applicationId) {
      applicationId = applicationId || user.linkedApplications[0].applicationId;
    }
  } else {
    phoneNumber = (await SharedPropsService.getPartnerUser()).phoneNumber;
    emailId = (await SharedPropsService.getPartnerUser()).emailId;
    panNumberX = (await SharedPropsService.getPartnerUser()).panNumber;
  }

  const isAutoTriggerOtp: boolean = await SharedPropsService.getConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP
  );
  const assetRepository = await getPrimaryAssetRepository();

  /*** Auto trigger is globally enabled. mostly this will be disabled,
   * and we are manually enabled it when user tries fetch more assets from UnlockLimit Page ***/
  if (isAutoTriggerOtp) {
    await SharedPropsService.setConfig(
      ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
      false
    );
    await fetchMyPortfolio(
      {
        routeId: ROUTE.MF_FETCH_PORTFOLIO,
        type: ACTION.FETCH_MY_PORTFOLIO,
        payload: <FetchPortfolioPayload>{
          applicationId,
          emailId,
          phoneNumber,
          panNumber: panNumberX,
          assetRepository,
        },
      },
      {},
      { ...props }
    );
  }
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

  const assetRepository: AssetRepositoryType = AssetRepositoryType[action.payload.assetRepository];

  const response = await network.post(
    api.pledgeInit,
    <FetchPortfolioPayload>{
      ...action.payload,
      assetRepository: assetRepository,
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

  /*** Reset to default asset repository type if the user has changed the asset repository type from the settings page */
  await setDatastore(ROUTE.OTP_AUTH_CAS, "input", <TextInputProps>{
    state: InputStateToken.DEFAULT,
    charLimit: AssetRepositoryMap.get(assetRepository).OTP_LENGTH,
  });
  await setDatastore(ROUTE.OTP_AUTH_CAS, "subTitle", <TextInputProps>{
    label: `${AssetRepositoryMap.get(assetRepository).NAME} depository has sent an OTP to `,
  });
  await navigate(ROUTE.OTP_AUTH_CAS, action.payload);
};

export const selectSource: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  await navigate(ROUTE.SELECT_SOURCE, action.payload);
};
