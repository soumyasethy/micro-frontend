import { ActionFunction } from "@voltmoney/types";
import { ACTION as PAGE_ACTION, OtpPledgePayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { ROUTE } from "../../../routes";
import { NavigationNext } from "../../kyc/kyc_init/types";
import { api } from "../../../configs/api";
import {
  APP_CONFIG,
  AssetRepositoryMap,
  AssetRepositoryType,
  getAppHeader,
} from "../../../configs/config";
import { IconTokens, InputStateToken, TextInputProps } from "@voltmoney/schema";
import { User } from "../../login/otp_verify/types";
import {
  addCommasToNumber,
  roundDownToNearestHundred,
} from "../../../configs/utils";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { setDatastore, showPopup, network, goBack }
): Promise<any> => {
  if (
    action.payload.value.length !==
    AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH
  ) {
    return;
  }
  await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  const response = await network.post(
    api.authPledge,
    {
      applicationId: (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId,
      assetRepository: AssetRepositoryType.DEFAULT,
      otp: action.payload.value,
    },
    { headers: await getAppHeader() }
  );

  if (_.get(response, "data.status") === "SUCCESS") {
    await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
      state: InputStateToken.SUCCESS,
    });
    const user: User = await SharedPropsService.getUser();
    const applicationId = user.linkedApplications[0].applicationId;
    await goBack();
    user.linkedApplications[0] = _.get(
      response,
      "data.updatedApplicationObj",
      user.linkedApplications[0]
    );
    await SharedPropsService.setUser(user);

    if (
      _.get(
        response,
        "data.updatedApplicationObj.stepStatusMap.MF_PLEDGE_PORTFOLIO"
      ) === "COMPLETED"
    ) {
      await showPopup({
        autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
        isAutoTriggerCta: true,
        title: `₹ ${addCommasToNumber(
          roundDownToNearestHundred(
            _.get(response, "data.stepResponseObject.approvedCreditAmount", 0)
          )
        )} unlocked successfully!`,
        subTitle: "You will be redirected to next step in few seconds",
        type: "SUCCESS",
        ctaLabel: "Continue",
        primary: true,
        ctaAction: {
          type: PAGE_ACTION.NAV_NEXT,
          routeId: ROUTE.PLEDGE_VERIFY,
          payload: <NavigationNext>{
            stepId: _.get(response, "data.updatedApplicationObj.currentStepId"),
          },
        },
      });
    }
    if (
      _.get(
        response,
        "data.updatedApplicationObj.stepStatusMap.MF_PLEDGE_PORTFOLIO"
      ) === "PENDING_CALLBACK"
    ) {
      await showPopup({
        title: `Pledging...`,
        subTitle: "Please wait while we confirm your pledge with depository.",
        type: "DEFAULT",
        iconName: IconTokens.Volt,
      });

      /***** Starting Polling to check status of MF_PLEDGE_PORTFOLIO *****/
      const PollerRef = setInterval(async () => {
        const mfPledgeStatusResponse = await network.get(
          `${api.borrowerApplication}${applicationId}`,
          { headers: await getAppHeader() }
        );
        user.linkedApplications[0] = _.get(mfPledgeStatusResponse, "data");
        await SharedPropsService.setUser(user);
        if (
          _.get(
            mfPledgeStatusResponse,
            "data.stepStatusMap.MF_PLEDGE_PORTFOLIO"
          ) === "COMPLETED"
        ) {
          clearInterval(PollerRef);
          await goBack();
          await showPopup({
            autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
            isAutoTriggerCta: true,
            title: `₹ ${addCommasToNumber(
              roundDownToNearestHundred(
                _.get(
                  response,
                  "data.stepResponseObject.approvedCreditAmount",
                  0
                )
              )
            )} unlocked successfully!`,
            subTitle: "You will be redirected to next step in few seconds",
            type: "SUCCESS",
            ctaLabel: "Continue",
            primary: true,
            ctaAction: {
              type: PAGE_ACTION.NAV_NEXT,
              routeId: ROUTE.PLEDGE_VERIFY,
              payload: <NavigationNext>{
                stepId: _.get(mfPledgeStatusResponse, "data.currentStepId"),
              },
            },
          });
        }
      }, APP_CONFIG.POLLING_INTERVAL);
    }
  }
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const NavigateNext: ActionFunction<NavigationNext> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  if (action.payload.stepId) {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].currentStepId = action.payload.stepId;
    await SharedPropsService.setUser(user);
    navigate(ROUTE.KYC_STEPPER, {});
  }
};
