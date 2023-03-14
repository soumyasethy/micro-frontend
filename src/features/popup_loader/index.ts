import {
  AlertProps,
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  VerificationCardButtonTypeToken,
  VerificationCardProps,
  VerificationCardTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, AlertNavProps } from "./types";
import { ClosePopup } from "./actions";
import { heightMap } from "../../configs/height";

const _applyType = (
  type: "SUCCESS" | "FAILED" | "IN_PROGRESS" | "LOADING" | "DEFAULT"
) => {
  switch (type) {
    case "DEFAULT":
      return VerificationCardTypeTokens.Default;
    case "SUCCESS":
      return VerificationCardTypeTokens.Success;
    case "IN_PROGRESS":
      return VerificationCardTypeTokens.InProgress;
    case "FAILED":
      return VerificationCardTypeTokens.Failed;
    case "LOADING":
      return VerificationCardTypeTokens.Default;
  }
};

export const template: (alertProps: AlertProps) => TemplateSchema = ({
  title,
  message,
  subTitle,
  iconName,
  primary,
  ctaLabel,
  ctaAction,
  type,
  isAutoTriggerCta = false,
  autoTriggerTimerInMilliseconds,
  titleFont= true
}) => ({
  layout: <Layout>{
    id: ROUTE.ALERT_PAGE,
    type: LAYOUTS.MODAL,
    style: {
      height: heightMap[ROUTE.ALERT_PAGE],
    },
    widgets: [
      {
        id: "alert",
        type: WIDGET.VERIFICATIONCARD,
        // position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    alert: <VerificationCardProps & WidgetProps>{
      isAutoTriggerCta,
      autoTriggerTimerInMilliseconds,
      iconColor: ColorTokens.Primary_100,
      label: title || "",
      message: subTitle || "",
      type: _applyType(type),
      iconName: (iconName as IconTokens) || IconTokens.Alert,
      buttonText: ctaLabel,
      titleFont: titleFont,
      action: ctaAction
        ? ctaAction
        : {
            type: ACTION.CLOSE_POPUP,
            routeId: ROUTE.ALERT_PAGE,
            payload: {},
          },
      buttonType: primary
        ? VerificationCardButtonTypeToken.FULL
        : VerificationCardButtonTypeToken.OUTLINE,
    },
  },
});
const alertPropsX: AlertNavProps = {
  title: "This is a Alert",
  subTitle: "Hello World",
  iconName: IconTokens.Alert,
  primary: true,
  ctaLabel: "continue",
  message: "Your data is secure with us",
  ctaAction: {
    type: ACTION.CLOSE_POPUP,
    routeId: ROUTE.ALERT_PAGE,
    payload: { hello: "world" },
  },
  type: "DEFAULT",
  isAutoTriggerCta: false,
  autoTriggerTimerInMilliseconds: 2000,
};

export const alertMF: PageType<any> = {
  onLoad: async ({}, { alertProps }) => {
    return Promise.resolve(template(alertProps));
  },
  actions: {
    [ACTION.CLOSE_POPUP]: ClosePopup,
  },
  clearPrevious: true,
};
