import {ActionFunction, OpenNewTabTargetType, POSITION} from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ACTION, LimitPayload } from "./types";
import {
  ColorTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  TypographyProps,
  WebViewProps,
  WIDGET
} from "@voltmoney/schema";
import { APP_CONFIG, defaultHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { User } from "../../login/otp_verify/types";
import { POPUP_TARGET_NAME } from "../../../configs/constants";

export const authenticateRepayment: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { showPopup }
): Promise<any> => {
  if (action.payload.value) {
    showPopup({
      type: "DEFAULT",
      iconName: IconTokens.Redirecting,
      title: "Please click continue for agreement",
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
  {  appendWidgets, removeWidgets,...props }
): Promise<any> => {
  if (action.payload.value) {
    // /** manually opening tab to avoid popup blocker **/
    await removeWidgets(ROUTE.LOAN_AGREEMENT, [
      { id: "contentItem", type: WIDGET.TEXT },
      { id: "contentSpace", type: WIDGET.SPACE },
      { id: "iconStack", type: WIDGET.STACK },
      { id: "iconSpace", type: WIDGET.SPACE },
      { id: "btnData", type: WIDGET.STACK},
      { id: "btnItem", type: WIDGET.BUTTON },

    ]);
    await appendWidgets(
        ROUTE.LOAN_AGREEMENT,
        {
          agreementWebView: <WebViewProps>{
            uri: action.payload.value
          },
          amountSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
        },
        [
          { id: "agreementWebView", type: WIDGET.WEB_VIEW},
        ],
        "headerSpace"
    );

    await PollAgreementStatusAction(action,{},{appendWidgets, removeWidgets,...props})

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
      .then((response) => {
        // console.log("Loan WebView response status", response.status);
        return response.json();
      })
      .then(async (response) => {
        /// handle response

        if (response.stepResponseObject.toLowerCase() === "success") {
          clearInterval(timerRef);
          const user: User = await SharedPropsService.getUser();
          user.linkedApplications[0] = response.updatedApplicationObj;
          await SharedPropsService.setUser(user);
          console.log("Polling success")
          showPopup({
            isAutoTriggerCta: false,
            type: "SUCCESS",
            title: "Agreement submitted!",
            subTitle:
              "Continue to setup AutoPay to make your interest payments automatically",
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
  await navigate(ROUTE.LOAN_AUTOPAY);
};

export const NavToLoanAgreement: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.LOAN_AGREEMENT);
};
