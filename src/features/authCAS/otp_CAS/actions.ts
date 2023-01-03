import { ActionFunction } from "@voltmoney/types";
import { ACTIONS, AuthCASPayload } from "./types";
import { api, partnerApi } from "../../../configs/api";
import { ButtonProps, ButtonTypeTokens, ColorTokens, InputStateToken, TextInputProps } from "@voltmoney/schema";
import {
  APP_CONFIG,
  AssetRepositoryMap,
  AssetRepositoryType,
  getAppHeader,
} from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";
import _ from "lodash";
import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";
import { AnalyticsEventTracker } from "../../../configs/constants";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, goBack, showPopup ,analytics}
): Promise<any> => {
  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  if (
    action.payload.value.length !==
    AssetRepositoryMap[assetRepositoryType].OTP_LENGTH
  ) {
    return;

  }

  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const userType = await SharedPropsService.getUserType();
  console.log(userType);
  if (userType === "BORROWER") {
    console.log("here1")
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
        "data.data.stepResponseObject.availableCreditAmount",
        0
      );
      if (availableCreditAmount > 0) {
        analytics(AnalyticsEventTracker.borrower_mf_pull["Event Name"], {
          ...AnalyticsEventTracker.borrower_mf_pull,
        });
      } else {
        analytics(AnalyticsEventTracker.borrower_mf_pull_failed["Event Name"], {
          ...AnalyticsEventTracker.borrower_mf_pull_failed,
        });
      }
      console.log("why here")
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
      await goBack();
  
      if (_.get(response, "data.updatedApplicationObj.currentStepId", false)) {
        const nextRoute = await nextStepId(
          response.data.updatedApplicationObj.currentStepId
        );
        nextRoute.params = { ...nextRoute.params, response };
        await navigate(nextRoute.routeId, nextRoute.params);
      }

 console.log("here")
  }else {
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
}else {
    console.log("partner otp verify");
    const response = await network.post(
      partnerApi.authCAS,
      {
        applicationId: action.payload.applicationId,
        otp: action.payload.value,
        assetRepository: action.payload.assetRepository,
      },
      { headers: await getAppHeader() }
    );
   
    if (response.status === 200) {
      // await setDatastore(action.routeId, "input", <TextInputProps>{
      //   state: InputStateToken.SUCCESS,
      // });
      // await goBack();
      await showPopup({
        autoTriggerTimerInMilliseconds: APP_CONFIG.AUTO_REDIRECT,
        isAutoTriggerCta: true,
        title: "Portfolio fetched succesfully ",
        subTitle: "You will be redirected to next step in few seconds",
        type: "SUCCESS",
        ctaLabel: "Continue",
        primary: true,
        ctaAction: {
          type: ACTIONS.NEXT_ROUTE,
          routeId: ROUTE.OTP_AUTH_CAS,
          payload: {},
        },
      });
    } else {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    }

  }

};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};


export const goNext: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore,navigate }
): Promise<any> => {
  console.log("here");
  await setDatastore(ROUTE.MF_FETCH_PORTFOLIO, "fetchCTA", <ButtonProps>{
    label: "Get my portfolio",
    labelColor:ColorTokens.White,
    type: ButtonTypeTokens.LargeFilled,
    loading: false,
  });
  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
};

