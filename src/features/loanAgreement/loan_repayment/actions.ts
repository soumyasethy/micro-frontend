import {ActionFunction, OpenNewTabTargetType, POSITION} from "@voltmoney/types";
import {ROUTE} from "../../../routes";
import {ACTION, LimitPayload} from "./types";
import {IconTokens, SizeTypeTokens, SpaceProps, WebViewProps, WIDGET} from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import {api} from "../../../configs/api";
import {APP_CONFIG, defaultHeaders} from "../../../configs/config";
import {User} from "../../login/otp_verify/types";
import {POPUP_TARGET_NAME} from "../../../configs/constants";
import {PollAgreementStatusAction} from "../loan_agreement/actions";
import {Platform} from "react-native";

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
      title: "Please click continue for AutoPay",
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
  {  appendWidgets , removeWidgets,showPopup ,...props }
): Promise<any> => {
  if (action.payload.value) {


    if(Platform.OS === 'web'){
      showPopup({
        type: "DEFAULT",
        iconName: IconTokens.Redirecting,
        title: "Please click continue for AutoPay",
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
      return
    }


    await appendWidgets(
        ROUTE.LOAN_REPAYMENT,
        {
          repaymentWebView: <WebViewProps>{
            uri: action.payload.value
          },
        },
        [
          {id: "repaymentWebView", type: WIDGET.WEB_VIEW},
        ],
        "headerSpace"
    );
    await removeWidgets(ROUTE.LOAN_REPAYMENT, [
      {id: "contentItem", type: WIDGET.TEXT},
      {id: "contentSpace", type: WIDGET.SPACE},
      {id: "iconStack", type: WIDGET.STACK},
      {id: "iconSpace", type: WIDGET.SPACE},
      {id: "btnData", type: WIDGET.STACK},
    ]);

    await PollMandateStatus(action, {}, {appendWidgets, removeWidgets, showPopup, ...props})

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
          Platform.OS === 'web' && hidePopup()
          showPopup({
            isAutoTriggerCta: false,
            type: "SUCCESS",
            title: "AutoPay setup successful!",
            subTitle:
              "Interest charges will be deducted automatically every month.",
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
