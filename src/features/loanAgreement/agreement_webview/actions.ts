import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import { IconTokens } from "@voltmoney/schema";
import { ACTION } from "../loan_webView/types";
import { User } from "../../login/otp_verify/types";

export const AgreementStatusAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, showPopup }
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

          // await goBack();
          await showPopup({
            type: "SUCCESS",
            title: "Agreement submitted!",
            subTitle:
              "Congratulations! Your loan application is created successfully.",
            ctaLabel: "Go to AutoPay",
            ctaAction: action,
          });
        } else if (response.stepResponseObject.toLowerCase() === "failed") {
          clearInterval(timerRef);
          // await goBack();
          await navigate(ROUTE.ALERT_PAGE, {
            alertProps: {
              iconName: IconTokens.Failed,
              title: "Agreement submit failed!",
              subTitle: "Please try again",
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
  const timerRef = setInterval(() => {
    getApiLoad();
  }, APP_CONFIG.POLLING_INTERVAL);
};

export const GoNextSuccess: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  // await goBack();
  await navigate(ROUTE.DASHBOARD);
};
export const GoNextFailed: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const GoBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
