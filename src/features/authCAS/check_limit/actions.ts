import { ActionFunction } from "@voltmoney/types";
import { FetchPortfolioPayload, PanEditPayload } from "./types";
import { api } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";
import { ButtonProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";
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
  { navigate, asyncStorage, setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
    loading: true,
  });

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

  const raw = JSON.stringify(<FetchPortfolioPayload>{
    ...action.payload,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  await fetch(api.pledgeInit, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
        loading: false,
      });
      if (result) {
        const user: User = await SharedPropsService.getUser();
        user.linkedApplications[0].currentStepId =
          result.updatedApplicationObj.currentStepId;
        await SharedPropsService.setUser(user);
        await navigate(ROUTE.OTP_AUTH_CAS, <FetchPortfolioPayload>{
          ...action.payload,
        });
      }
    })
    .catch(async (error) => {
      console.log("error", error);
      await setDatastore(action.routeId, "fetchCTA", <ButtonProps>{
        loading: false,
      });
      await navigate(ROUTE.VERIFICATION_FAILED);
    });
};
