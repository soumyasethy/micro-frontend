import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import { IconTokens } from "@voltmoney/schema";
import { ACTION } from "../loan_webView/types";

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
        console.warn("AgreementStatusAction", response);
        /// handle response
        if (response.stepResponseObject === "Success") {
          clearInterval(timerRef);
          await goBack();
          await showPopup({
            type: "SUCCESS",
            title: "Agreement submitted!",
            subTitle:
              "Congratulations! Your loan application is created successfully.",
            ctaLabel: "Go to dashboard",
            ctaAction: action,
          });
        } else if (response.stepResponseObject === "Failed") {
          clearInterval(timerRef);
          await goBack();
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
  }, 5000);
};

export const GoNextSuccess: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
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
