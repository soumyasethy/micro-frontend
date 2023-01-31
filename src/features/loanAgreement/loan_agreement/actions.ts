import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import { IconTokens } from "@voltmoney/schema";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { User } from "../../login/otp_verify/types";

export const authenticateRepayment: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { showPopup }
): Promise<any> => {
  if (action.payload.value) {
    showPopup({
      type: "DEFAULT",
      iconName: IconTokens.Redirecting,
      title: "Redirecting you for agreement",
      subTitle: "Return to Volt after successful completion",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION.OPEN_TAB,
        routeId: ROUTE.LOAN_AGREEMENT,
        payload: {
          value: action.payload.value,
        },
      },
      primary: false,
    });
  }
};

export const goBack: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER, {});
};

export const openLinkInNewTab: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, openNewTab, showPopup, hidePopup }
): Promise<any> => {
  if (action.payload.value) {
    // /** manually opening tab to avoid popup blocker **/
    openNewTab(action.payload.value);

    hidePopup();
    showPopup({
      isAutoTriggerCta: true,
      type: "DEFAULT",
      iconName: IconTokens.Redirecting,
      title: "Waiting for response",
      subTitle: "Please wait while we process your request",
      ctaAction: {
        type: ACTION.POLL_AGREEMENT_STATUS,
        routeId: ROUTE.LOAN_AGREEMENT,
        payload: {},
      },
      primary: false,
    });
  }
};

export const PollAgreementStatusAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, showPopup, hidePopup }
): Promise<any> => {
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  const getApiLoad = async () => {
    await fetch(`${api.agreementStatus}${applicationId}`, {
      headers: await defaultHeaders(),
    })
      .then((response) => response.json())
      .then(async (response) => {
        /// handle response

        if (response.stepResponseObject.toLowerCase() === "success") {
          clearInterval(timerRef);
          const user: User = await SharedPropsService.getUser();
          user.linkedApplications[0] = response.updatedApplicationObj;
          await SharedPropsService.setUser(user);
          hidePopup();
          showPopup({
            isAutoTriggerCta: false,

            type: "SUCCESS",
            title: "Agreement submitted!",
            subTitle:
              "Congratulations! Your loan application is created successfully.",
            ctaLabel: "Go to AutoPay",
            ctaAction: {
              type: ACTION.GO_TO_AUTOPAY,
              routeId: ROUTE.LOAN_AGREEMENT,
              payload: {},
            },
          });
        } else if (response.stepResponseObject.toLowerCase() === "failed") {
          clearInterval(timerRef);
          hidePopup();
          showPopup({
            isAutoTriggerCta: false,
            type: "FAILED",
            title: "AutoPay setup failed!",
            subTitle:
              "Bank account must be linked for AutoPay. Please try again.",
            ctaLabel: "Continue to try again",
            ctaAction: {
              type: ACTION.GO_TO_AUTOPAY,
              routeId: ROUTE.LOAN_AGREEMENT,
              payload: {},
            },
          });
        }
      });
  };
  const timerRef = setInterval(() => {
    getApiLoad();
  }, APP_CONFIG.POLLING_INTERVAL);
};

export const NavToAutoPay: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.LOAN_AUTOPAY);
};

export const NavToLoanAgreement: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.LOAN_AGREEMENT);
};
