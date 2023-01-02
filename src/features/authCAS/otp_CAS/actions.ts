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

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, goBack, showPopup }
): Promise<any> => {
  if (
    action.payload.value.length !==
    AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH
  )
    return;
    // await showPopup({
    //   autoTriggerTimerInMilliseconds: APP_CONFIG.AUTO_REDIRECT,
    //   isAutoTriggerCta: true,
    //   title: "Portfolio fetched succesfullyy start",
    //   subTitle: "You will be redirected to next step in few seconds",
    //   type: "SUCCESS",
    //   ctaLabel: "Continue",
    //   primary: true,
    //   ctaAction: {
    //     type: ACTIONS.NEXT_ROUTE,
    //     routeId: ROUTE.OTP_AUTH_CAS,
    //     payload: {},
    //   },
    // });
    // return;
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const userType = await SharedPropsService.getUserType();
  if (userType === "BORROWER") {
   
    const response = await network.post(
      api.authCAS,
      {
        applicationId: action.payload.applicationId,
        otp: action.payload.value,
        assetRepository: action.payload.assetRepository,
      },
      { headers: await getAppHeader() }
    );
    if (response.status === 200) {
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
    } else {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    }
  } else {
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

