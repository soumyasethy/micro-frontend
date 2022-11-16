import {
  AlertProps,
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  FontSizeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  VerificationCardButtonTypeToken,
  VerificationCardProps,
  VerificationCardTypeTokens,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION, AlertNavProps } from "./types";
import { ClosePopup } from "./actions";

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
}) => ({
  layout: <Layout>{
    id: ROUTE.ALERT_PAGE,
    type: LAYOUTS.MODAL,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "alert", type: WIDGET.VERIFICATIONCARD },
      // { id: "stack", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    alert: <VerificationCardProps & WidgetProps>{
      iconColor: ColorTokens.Primary_100,
      label: title || "",
      message: subTitle || "",
      type: _applyType(type),
      iconName: (iconName as IconTokens) || IconTokens.Alert,
      buttonText: ctaLabel,
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
    stack: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.center,
      alignItems: StackAlignItems.center,
      widgetItems: [
        { id: "messageIcon", type: WIDGET.ICON },
        { id: "iconSpace", type: WIDGET.SPACE },
        { id: "message", type: WIDGET.TEXT },
      ],
    },
    messageIcon: <IconProps>{ name: IconTokens.Fire, size: IconSizeTokens.MD },
    iconSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    message: <TypographyProps>{
      label: message,
      fontSize: FontSizeTokens.XS,
    },
  },
});
const alertPropsX: AlertNavProps = {
  title: "This is a Alert",
  subTitle: "Hello World",
  iconName: IconTokens.Alert,
  primary: true,
  ctaLabel: "continue",
  message: "Don’t worry your data is secured with Volt",
  ctaAction: {
    type: ACTION.CLOSE_POPUP,
    routeId: ROUTE.ALERT_PAGE,
    payload: { hello: "world" },
  },
  type: "DEFAULT",
};

export const alertMF: PageType<any> = {
  onLoad: async ({}, { alertProps }) => {
    console.warn("alertProps", alertProps);
    return Promise.resolve(template(alertProps));
  },
  actions: {
    [ACTION.CLOSE_POPUP]: ClosePopup,
  },
  clearPrevious: true,
};
