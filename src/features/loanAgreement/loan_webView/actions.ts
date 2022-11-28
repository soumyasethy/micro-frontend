import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import { ACTION, GoNextType } from "./types";
import { IconTokens, StepperStateToken } from "@voltmoney/schema";
import { User } from "../../login/otp_verify/types";

export const PollMandateStatus: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, showPopup }
): Promise<any> => {
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  const getApiLoad = async () => {
    await fetch(`${api.mandateStatus}${applicationId}`, {
      headers: await defaultHeaders(),
    })
      .then((response) => {
        console.log("Loan WebView response status", response.status);
        return response.json();
      })
      .then(async (response) => {
        console.log("PollMandateStatus response", response);
        /// handle response
        if (response.stepResponseObject.toLowerCase() === "finished") {
          const user: User = await SharedPropsService.getUser();
          user.linkedApplications[0].stepStatusMap.MANDATE_SETUP =
            StepperStateToken.COMPLETED;
          user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN =
            StepperStateToken.IN_PROGRESS;
          await SharedPropsService.setUser(user);
          clearInterval(timer);
          navigate(ROUTE.LOAN_REPAYMENT);
          showPopup({
            type: "SUCCESS",
            title: "AutoPay setup successful!",
            subTitle: "Interest charges will be paid automatically every month.",
            ctaLabel: "Proceed to review agreement",
            ctaAction: {
              ...action,
              payload: <GoNextType>{
                ...action.payload,
                currentStepId: response.updatedApplicationObj.currentStepId,
              },
            },
          });
        } else if (response.stepResponseObject.toLowerCase() === "failed") {
          clearInterval(timer);
          await navigate(ROUTE.ALERT_PAGE, {
            alertProps: {
              iconName: IconTokens.Failed,
              title: "AutoPay setup failed!",
              subTitle: "Bank account must be linked for AutoPay. Please try again.",
              type: "DEFAULT",
              ctaLabel: "Continue to try again",
              primary: true,
              ctaAction: {
                type: ACTION.GO_LOAN_AUTO_PAY,
                routeId: ROUTE.LOAN_WEBVIEW,
                payload: {},
              },
            },
          });
        }
      });
  };
  const timer = setInterval(() => {
    getApiLoad();
  }, APP_CONFIG.POLLING_INTERVAL);
};
export const GoNext: ActionFunction<GoNextType> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  // const route = await nextStepId(action.payload.currentStepId);
  // console.warn("GoNext", action.payload.currentStepId, route);
  // await navigate(route.routeId, route.params);
  await navigate(ROUTE.LOAN_AGREEMENT);
};
export const NavLoanAutoPay: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.LOAN_AUTOPAY);
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
};
