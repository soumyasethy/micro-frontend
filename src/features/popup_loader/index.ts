import {Datastore, Layout, LAYOUTS, PageType, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
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
import {ROUTE} from "../../routes";
import {ACTION, AlertNavProps} from "./types";
import {TestAction} from "./actions";

export const template: (alertProps: AlertNavProps) => TemplateSchema = (
  alertProps
) => ({
  layout: <Layout>{
    id: ROUTE.ALERT_PAGE,
    type: LAYOUTS.MODAL,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "alert", type: WIDGET.VERIFICATIONCARD },
      { id: "stack", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    alert: <VerificationCardProps & WidgetProps>{
      label: alertProps.title,
      message: alertProps.subTitle,
      type: VerificationCardTypeTokens.Default,
      iconName: IconTokens.Fire,
      buttonText: alertProps.ctaLabel,
      action: {
        type: ACTION.TEST_ACTION,
        routeId: ROUTE.ALERT_PAGE,
        payload: {},
      },
      buttonType: VerificationCardButtonTypeToken.FULL
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
      label: alertProps.message,
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
    type: ACTION.TEST_ACTION,
    routeId: ROUTE.ALERT_PAGE,
    payload: { hello: "world" },
  },
};

export const alertMF: PageType<any> = {
  onLoad: async ({}, { alertProps }) => {
    return Promise.resolve(template(alertProps));
  },
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
