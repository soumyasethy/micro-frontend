import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import {
  AssetRepositoryMap, AssetRepositoryType,
  ConfigTokens,
  getAppHeader,
} from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { AnalyticsEventTracker } from "../../../configs/constants";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";

export const fetchMyPortfolio: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
 
  const user: User = await SharedPropsService.getUser();

    const panNumber = user.linkedBorrowerAccounts[0].accountHolderPAN;
    const phoneNumber =
      user.linkedBorrowerAccounts[0].accountHolderPhoneNumber;
    const emailId = user.linkedBorrowerAccounts[0].accountHolderEmail;
      const applicationId = user.linkedApplications[0].applicationId;
    
  const response = await network.post(
    api.pledgeInit,
    {
      applicationId:applicationId,
      emailId:emailId,
      panNumber:panNumber,
      phoneNumber:phoneNumber,
      assetRepository: action.payload.assetRepository,
    },
    {
      headers: await getAppHeader(),
    }
  );
  if (_.get(response, "data.status") === "SUCCESS") {
    await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
      state: InputStateToken.DEFAULT,
    });
  }
};


export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, analytics, showPopup, hidePopup }
): Promise<any> => {
  let assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  if (
    action.payload.value.length !==
    AssetRepositoryMap.get(assetRepositoryType).OTP_LENGTH
  ) {
    return;
  }
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const response = await network.post(
    api.authCAS,
    {
      applicationId: action.payload.applicationId,
      otp: action.payload.value,
      assetRepository: assetRepositoryType,
    },
    { headers: await getAppHeader() }
  );
  if (response.status === 200) {
    /*** check available credit limit ***/
    const availableCreditAmount = _.get(
      response,
      "data.stepResponseObject.availableCreditAmount",
      0
    );
    if (availableCreditAmount > 0) {
      analytics(AnalyticsEventTracker.borrower_mf_pull["Event Name"], {
        ...AnalyticsEventTracker.borrower_mf_pull,
      });
      await SharedPropsService.setAuthCASResponse(response.data);
    } else {
      analytics(AnalyticsEventTracker.borrower_mf_pull_failed["Event Name"], {
        ...AnalyticsEventTracker.borrower_mf_pull_failed,
      });
    }

    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.SUCCESS,
    });
    // await goBack();

    if (_.get(response, "data.updatedApplicationObj.currentStepId", false)) {
      /**  enable animation again ***/
      const layoutType = await SharedPropsService.getConfig(
        ConfigTokens.IS_MF_FETCH_BACK_ALLOWED
      );
      /*** Don't run animation MF_FETCH is not full screen */
      if (!layoutType) await SharedPropsService.setPledgeFirstTime(true);

      const nextRoute = await nextStepId(
        response.data.updatedApplicationObj.currentStepId
      );
      nextRoute.params = { ...nextRoute.params, response };
      await navigate(nextRoute.routeId, nextRoute.params);
    }
  } else {
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const navToFetch: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.MF_FETCH_PORTFOLIO);
};
