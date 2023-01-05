import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import { fetchLinkRepo } from "./repo";
import { ButtonProps, IconTokens } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";

let stepResponseObject: string = null;
export const authenticateRepayment: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { showPopup }
): Promise<any> => {
  if (action.payload.value) {
    showPopup({
      type: "DEFAULT",
      iconName: IconTokens.Redirecting,
      title: "Redirecting you for AutoPay",
      subTitle: "Return to Volt after successful completion",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION.OPEN_TAB,
        routeId: ROUTE.LOAN_REPAYMENT,
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
  { goBack }
): Promise<any> => {
  goBack();
};

export const AutoPayPoll: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  props
): Promise<any> => {
  await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
    loading: true,
  });
  const timer = setInterval(async () => {
    const response = await fetchLinkRepo();
    if (response.stepResponseObject)
      stepResponseObject = response.stepResponseObject;
    if (stepResponseObject) {
      await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
        loading: false,
      });
      clearInterval(timer);
      await authenticateRepayment(
        {
          type: ACTION.REPAYMENT,
          payload: <LimitPayload>{
            value: stepResponseObject,
            widgetId: "input",
          },
          routeId: ROUTE.LOAN_REPAYMENT,
        },
        {},
        props
      );
    }
  }, 2000);
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

    const timer = setInterval(async () => {
      clearInterval(timer);
      showPopup({
        isAutoTriggerCta: true,
        type: "DEFAULT",
        iconName: IconTokens.Redirecting,
        title: "Waiting for response",
        subTitle: "Please wait while we process your request",
        ctaAction: {
          type: ACTION.POLL_MANDATE_STATUS,
          routeId: ROUTE.LOAN_REPAYMENT,
          payload: {},
        },
        primary: false,
      });
    }, APP_CONFIG.MODAL_TRIGGER_TIMEOUT);
  }
};

export const PollMandateStatus: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, showPopup, hidePopup }
): Promise<any> => {
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  const getApiLoad = async () => {
    await fetch(`${api.mandateStatus}${applicationId}`, {
      headers: await defaultHeaders(),
    })
      .then((response) => {
        // console.log("Loan WebView response status", response.status);
        return response.json();
      })
      .then(async (response) => {
        console.log("PollMandateStatus response", response);
        /// handle response
        if (response.stepResponseObject.toLowerCase() === "finished") {
          clearInterval(timer);
          const user: User = await SharedPropsService.getUser();
          user.linkedApplications[0] = response.updatedApplicationObj;
          await SharedPropsService.setUser(user);
          hidePopup();
          const refTimer = setInterval(async () => {
            clearInterval(refTimer);
            showPopup({
              isAutoTriggerCta: false,
              type: "SUCCESS",
              title: "AutoPay setup successful!",
              subTitle:
                "Interest charges will be paid automatically every month.",
              ctaLabel: "Proceed to review agreement",
              ctaAction: {
                type: ACTION.GO_LOAN_AGREEMENT,
                routeId: ROUTE.LOAN_REPAYMENT,
                payload: {},
              },
            });
          }, APP_CONFIG.MODAL_TRIGGER_TIMEOUT);
        } else if (response.stepResponseObject.toLowerCase() === "failed") {
          clearInterval(timer);
          hidePopup();
          const refTimer = setInterval(async () => {
            clearInterval(refTimer);
            showPopup({
              isAutoTriggerCta: false,
              type: "FAILED",
              title: "AutoPay setup failed!",
              subTitle:
                "Bank account must be linked for AutoPay. Please try again.",
              ctaLabel: "Continue to try again",
              ctaAction: {
                type: ACTION.GO_LOAN_REPAYMENT,
                routeId: ROUTE.LOAN_REPAYMENT,
                payload: {},
              },
            });
          }, APP_CONFIG.MODAL_TRIGGER_TIMEOUT);
        }
      });
  };
  const timer = setInterval(() => {
    getApiLoad();
  }, APP_CONFIG.POLLING_INTERVAL);
};

export const NavLoanAgreement: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.LOAN_AGREEMENT);
};

export const NavLoanRepayment: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.LOAN_REPAYMENT);
};

