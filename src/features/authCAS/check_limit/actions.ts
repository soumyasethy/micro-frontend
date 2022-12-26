import { ActionFunction } from "@voltmoney/types";
import { FetchPortfolioPayload, PanEditPayload } from "./types";
import { api, partnerApi } from "../../../configs/api";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import SharedPropsService, { USERTYPE } from "../../../SharedPropsService";
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

  console.log(action.payload);

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
          label: "Get my portfolio",
          type: ButtonTypeTokens.LargeFilled,
          loading: false,
        });
      });
  }
};

export const goBack: ActionFunction<{}> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  goBack();
};
