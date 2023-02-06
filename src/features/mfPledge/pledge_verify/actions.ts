import { ActionFunction } from "@voltmoney/types";
import { ACTION, OtpPledgePayload } from "./types";
import SharedPropsService, {
  AssetRepositoryConfigItemType,
} from "../../../SharedPropsService";
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
import {
  IconTokens,
  InputStateToken,
  StepperStateToken,
  TextInputProps,
  TypographyProps,
} from "@voltmoney/schema";
import { User } from "../../login/otp_verify/types";
import {
  addCommasToNumber,
  roundDownToNearestHundred,
} from "../../../configs/utils";
import {AnalyticsEventTracker, TextConstants} from "../../../configs/constants";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { setDatastore, showPopup, network, goBack, analytics, ...props }
): Promise<any> => {
  /** get current asset repository globally**/
  const assetRepositoryType: AssetRepositoryType =
    await SharedPropsService.getAssetRepositoryType();

  /** reject if otp length is not matching as config */
  if (
    action.payload.value.length !==
    AssetRepositoryMap[assetRepositoryType].OTP_LENGTH
  ) {
    return;
  }

  /** verification done, init api call loader */
  await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  /** get current application id of user **/
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;

  /** Actual Api call for pledge verify **/
  const authPledgeResponse = await network.post(
    api.authPledge,
    {
      applicationId: applicationId,
      assetRepository: assetRepositoryType,
      otp: action.payload.value,
    },
    { headers: await getAppHeader() }
  );

  if (_.get(authPledgeResponse, "data.status") === "SUCCESS") {
    analytics(AnalyticsEventTracker.borrower_mf_pledge_complete["Event Name"], {
      ...AnalyticsEventTracker.borrower_mf_pledge_complete,
    });
    await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
      state: InputStateToken.SUCCESS,
    });
    await goBack();
    /*** update user application obj ***/
    user.linkedApplications[0] = _.get(
      authPledgeResponse,
      "data.updatedApplicationObj",
      user.linkedApplications[0]
    );
    /*** update user obj ***/
    await SharedPropsService.setUser(user);

    /*** Mark current asset repository pledging as completed ***/
    const assetRepositoryMap =
      await SharedPropsService.getAssetRepositoryFetchMap();
    /*** Current asset repository type item ***/
    const assetRepositoryConfigItemType: AssetRepositoryConfigItemType =
      assetRepositoryMap[assetRepositoryType];
    /*** mark pledging in current asset repo ***/
    assetRepositoryConfigItemType.isPledged = true;
    /*** update globally asset repository map ***/
    await SharedPropsService.setAssetRepositoryFetchMap(
      assetRepositoryConfigItemType
    );

    /*** update UI manually for next asset repository since we are not re-building the page ***/
    if (
      assetRepositoryType === AssetRepositoryType.KARVY &&
      AssetRepositoryMap[AssetRepositoryType.KARVY].LIST.length > 0
    ) {
      await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
      await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
        state: InputStateToken.DEFAULT,
        charLimit: AssetRepositoryMap[AssetRepositoryType.CAMS].OTP_LENGTH,
      });
      await setDatastore(ROUTE.PLEDGE_VERIFY, "subTitle", <TypographyProps>{
        label: `${AssetRepositoryType.CAMS} has sent ${
          AssetRepositoryMap[AssetRepositoryType.CAMS].OTP_LENGTH
        }-digit OTP was sent on `,
      });
    } else if (
      assetRepositoryType === AssetRepositoryType.CAMS &&
      AssetRepositoryMap[AssetRepositoryType.CAMS].LIST.length > 0
    ) {
      await SharedPropsService.setAssetRepositoryType(
        AssetRepositoryType.KARVY
      );
      await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
        state: InputStateToken.DEFAULT,
        charLimit: AssetRepositoryMap[AssetRepositoryType.KARVY].OTP_LENGTH,
      });
      await setDatastore(ROUTE.PLEDGE_VERIFY, "subTitle", <TypographyProps>{
        label: `${AssetRepositoryType.KARVY} has sent ${
          AssetRepositoryMap[AssetRepositoryType.KARVY].OTP_LENGTH
        }-digit OTP was sent on `,
      });
    }

    /*** check whether all asset repository is pledged or not ***/
    const refreshedAssetRepositoryMap =
      await SharedPropsService.getAssetRepositoryFetchMap();

    /*** check whether all asset repository is pledged or not ***/
    if (
      (refreshedAssetRepositoryMap[AssetRepositoryType.KARVY].isPledged &&
        AssetRepositoryMap[AssetRepositoryType.KARVY].LIST.length > 0 &&
        refreshedAssetRepositoryMap[AssetRepositoryType.CAMS].isPledged &&
        AssetRepositoryMap[AssetRepositoryType.CAMS].LIST.length > 0) ||
      (refreshedAssetRepositoryMap[AssetRepositoryType.KARVY].isPledged &&
        AssetRepositoryMap[AssetRepositoryType.KARVY].LIST.length > 0 &&
        AssetRepositoryMap[AssetRepositoryType.CAMS].LIST.length === 0) ||
      (refreshedAssetRepositoryMap[AssetRepositoryType.CAMS].isPledged &&
        AssetRepositoryMap[AssetRepositoryType.CAMS].LIST.length > 0 &&
        AssetRepositoryMap[AssetRepositoryType.KARVY].LIST.length === 0)
    ) {
      /*** if all pledged then continue normal flow ***/
      const mfPledgePortfolioStatus = _.get(
        authPledgeResponse,
        "data.updatedApplicationObj.stepStatusMap.MF_PLEDGE_PORTFOLIO"
      );

      if (mfPledgePortfolioStatus === "COMPLETED") {
        /*** close previous popup ***/
        await goBack();
        /*** show success popup ***/
        await showPopup({
          autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
          isAutoTriggerCta: false,
          title: `₹ ${addCommasToNumber(
            roundDownToNearestHundred(
              _.get(
                authPledgeResponse,
                "data.stepResponseObject.approvedCreditAmount",
                0
              )
            )
          )} unlocked successfully!`,
          subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
          type: "SUCCESS",
          ctaLabel: "Continue",
          primary: true,
          ctaAction: {
            type: ACTION.NAV_NEXT,
            routeId: ROUTE.PLEDGE_VERIFY,
            payload: <NavigationNext>{
              stepId: _.get(
                authPledgeResponse,
                "data.updatedApplicationObj.currentStepId"
              ),
            },
          },
        });
      } else if (
        mfPledgePortfolioStatus === StepperStateToken.PENDING_CALLBACK
      ) {
        /*** close previous popup ***/
        await goBack();
        /*** show popup for pending callback ***/
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
            ) === "COMPLETED" &&
            _.get(mfPledgeStatusResponse, "data.currentStepId") !==
              "MF_PLEDGE_PORTFOLIO"
          ) {
            clearInterval(PollerRef);
            await goBack();
            await showPopup({
              autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
              isAutoTriggerCta: false,
              title: `₹ ${addCommasToNumber(
                roundDownToNearestHundred(
                  _.get(
                    authPledgeResponse,
                    "data.stepResponseObject.approvedCreditAmount",
                    0
                  )
                )
              )} unlocked successfully!`,
              subTitle: TextConstants.GENERIC_PROCEED_MESSAGE,
              type: "SUCCESS",
              ctaLabel: "Continue",
              primary: true,
              ctaAction: {
                type: ACTION.NAV_NEXT,
                routeId: ROUTE.PLEDGE_VERIFY,
                payload: <NavigationNext>{
                  stepId: _.get(mfPledgeStatusResponse, "data.currentStepId"),
                },
              },
            });
          }
        }, APP_CONFIG.POLLING_INTERVAL);
      }
    } else {
      await showPopup({
        autoTriggerTimerInMilliseconds: APP_CONFIG.POLLING_INTERVAL,
        isAutoTriggerCta: false,
        title: `₹ ${addCommasToNumber(
          roundDownToNearestHundred(
            _.get(
              authPledgeResponse,
              "data.stepResponseObject.approvedCreditAmount",
              0
            )
          )
        )} unlocked successfully!`,
        subTitle: "Please continue to unlock the remaining amount",
        type: "SUCCESS",
        ctaLabel: "Continue",
        primary: true,
        ctaAction: action.payload.sendOtpForPledgeConfirmAction,
      });
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

export const resendOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { setDatastore, network }
): Promise<any> => {
  const assetRepositoryType = await SharedPropsService.getAssetRepositoryType();
  const resendOtpResponse = await network.post(
    api.pledgeCreate,
    {
      applicationId: (
        await SharedPropsService.getUser()
      ).linkedApplications[0].applicationId,
      assetRepository: assetRepositoryType,
      portfolioItemList: AssetRepositoryMap[assetRepositoryType].LIST,
    },
    { headers: await getAppHeader() }
  );
  if (_.get(resendOtpResponse, "data.status") === "SUCCESS") {
    await setDatastore(ROUTE.PLEDGE_VERIFY, "input", <TextInputProps>{
      state: InputStateToken.DEFAULT,
    });
  }
};
