import { ActionFunction } from "@voltmoney/types";
import { ACTION, FetchPortfolioPayload, PanEditPayload } from "./types";
import { api, partnerApi } from "../../../configs/api";
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


  const userType = await SharedPropsService.getUserType();
  console.log(userType);
  
  if (userType == "BORROWER") {
    // updataion after implement at correct place 
    if (hasChangedInDetails) {
      const user: User = await SharedPropsService.getUser();
      action.payload.panNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
      action.payload.phoneNumber =
        user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
      action.payload.emailId = user.linkedBorrowerAccounts[0].accountHolderEmail;
      if (!action.payload.applicationId) {
        action.payload.applicationId = user.linkedApplications[0].applicationId;
      }
    }
    await network
      .post(
        api.pledgeInit,
        <FetchPortfolioPayload>{
          ...action.payload,
        },
        {
          headers: await getAppHeader(),
        }
      )
      .then(async (response) => {
        const user: User = await SharedPropsService.getUser();
        user.linkedApplications[0].currentStepId =
          response.data.updatedApplicationObj.currentStepId;
        await SharedPropsService.setUser(user);
        await navigate(ROUTE.OTP_AUTH_CAS, <FetchPortfolioPayload>{
          ...action.payload,
        });
      })
      .finally(async () => {
        await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
          label: "Get my portfolio",
          type: ButtonTypeTokens.LargeFilled,
          loading: false,
        });
      });
  } else {
    const applicationId = await SharedPropsService.getApplicationId()
    await network
      .post(
        `${partnerApi.pledgeInit}`,
        <FetchPortfolioPayload>{
          ...action.payload,
        },
        { headers: await getAppHeader() }
      )
      .then(async (response) => {
       
        await navigate(ROUTE.OTP_AUTH_CAS, <FetchPortfolioPayload>{
          ...action.payload,
        });
      })
      .finally(async () => {
        await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
          label: "Verfiy by OTP",
          type: ButtonTypeTokens.LargeFilled,
          loading: false,
        });
      });
  }
};


export const selectSource: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  await navigate(ROUTE.SELECT_SOURCE, action.payload);
};
