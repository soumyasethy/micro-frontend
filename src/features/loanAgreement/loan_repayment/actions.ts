import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import { IconTokens } from "@voltmoney/schema";
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
  { goBack, navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER, {});
};

// export const AutoPayPoll: ActionFunction<LimitPayload> = async (
//   action,
//   _datastore,
//   props
// ): Promise<any> => {
//   await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
//     loading: true,
//   });
//   const timer = setInterval(async () => {
//     const response = await fetchLinkRepo();
//     if (response.stepResponseObject)
//       stepResponseObject = response.stepResponseObject;
//     if (stepResponseObject) {
//       await props.setDatastore(ROUTE.LOAN_REPAYMENT, "btnItem", <ButtonProps>{
//         loading: false,
//       });
//       clearInterval(timer);
//       await authenticateRepayment(
//         {
//           type: ACTION.REPAYMENT,
//           payload: <LimitPayload>{
//             value: stepResponseObject,
//             widgetId: "input",
//           },
//           routeId: ROUTE.LOAN_REPAYMENT,
//         },
//         {},
//         props
//       );
//     }
//   }, 2000);
// };

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
        type: ACTION.POLL_MANDATE_STATUS,
        routeId: ROUTE.LOAN_REPAYMENT,
        payload: {},
      },
      primary: false,
    });
  }
};

export const PollMandateStatus: ActionFunction<any> = async (
  action,
  _datastore,
  { showPopup, hidePopup }
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
        if (response.stepResponseObject.toLowerCase() === "finished") {
          clearInterval(timer);
          const user: User = await SharedPropsService.getUser();
          user.linkedApplications[0] = response.updatedApplicationObj;
          await SharedPropsService.setUser(user);
          hidePopup();
          showPopup({
            isAutoTriggerCta: false,
            type: "SUCCESS",
            title: "AutoPay setup successful!",
            subTitle:
              "Interest charges will be paid automatically every month.",
            ctaLabel: "Proceed to dashboard",
            ctaAction: {
              type: ACTION.GO_T0_DASHBOARD,
              routeId: ROUTE.LOAN_REPAYMENT,
              payload: {},
            },
          });
        } else if (response.stepResponseObject.toLowerCase() === "failed") {
          clearInterval(timer);
          hidePopup();
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
  await navigate(ROUTE.LOAN_AGREEMENT);
};

export const NavLoanRepayment: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.LOAN_REPAYMENT);
};

export const GoToDashboard: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.DASHBOARD);
};
