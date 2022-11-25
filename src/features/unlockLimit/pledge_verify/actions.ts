import { ActionFunction } from "@voltmoney/types";
import { ACTION as PAGE_ACTION, OtpPledgePayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { ROUTE } from "../../../routes";
import { NavigationNext } from "../../kyc/kyc_init/types";
import { api } from "../../../configs/api";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  getAppHeader,
} from "../../../configs/config";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import { User } from "../../login/otp_verify/types";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { setDatastore, showPopup, network, goBack }
): Promise<any> => {
  if (
    action.payload.value.length !==
    AssetRepositoryMap[AssetRepositoryType.DEFAULT].OTP_LENGTH
  )
    return;
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
    await goBack();
    await showPopup({
      autoTriggerTimerInMilliseconds: 2000,
      isAutoTriggerCta: true,
      title: `Rs ${_.get(
        response,
        "data.stepResponseObject.approvedCreditAmount",
        0
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
