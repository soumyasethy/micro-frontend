import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  HeaderProps,
  LineItemCardProps,
  SizeTypeTokens,
  SpaceProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, OtpPayload } from "./types";
import { sendOtp, goBack } from "./actions";
import _ from "lodash";
import { StepResponseObject } from "../unlock_limit/types";

export const template: (
  stepResponseObject: StepResponseObject
) => TemplateSchema = (stepResponseObject) => {
  return {
    layout: <Layout>{
      id: ROUTE.PLEDGE_CONFIRMATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "space0", type: WIDGET.SPACE },
        { id: "lineItem", type: WIDGET.LINEITEMCARD },
        { id: "buttonSpace", type: WIDGET.SPACE },
        {
          id: "continue",
          type: WIDGET.BUTTON,
          position: POSITION.ABSOLUTE_BOTTOM,
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Pledge Confirmation",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        action: {
          type: ACTION.BACK_BUTTON,
          payload: {},
          routeId: ROUTE.PLEDGE_CONFIRMATION,
        },
      },
      space0: <SpaceProps>{ size: SizeTypeTokens.XL },
      lineItem: <LineItemCardProps>{
        data: [
          {
            id: "total_cash_imit",
            title: "Total Cash Limit",
            amount: `${stepResponseObject.availableCreditAmount}`,
          },
          ...Object.keys(
            _.get(stepResponseObject, "processingFeesBreakUp", {})
          ).map((key, index) => {
            return {
              id: `processingFeesBreakUp_${index}`,
              title: key,
              amount: `${stepResponseObject.processingFeesBreakUp[key] || 0}`,
            };
          }),
          {
            id: "total_charges",
            title: "Total Charges",
            amount: `${stepResponseObject.processingFees || 0}`,
          },
        ],
      },
      buttonSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      continue: <ButtonProps & WidgetProps>{
        label: "Confirm & Get OTP",
        type: ButtonTypeTokens.LargeFilled,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.PLEDGE_CONFIRMATION,
          payload: <OtpPayload>{
            value: stepResponseObject,
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.PLEDGE_CONFIRMATION,
        },
      },
    },
  };
};

export const pledgeConfirmationMF: PageType<any> = {
  onLoad: async ({}, { stepResponseObject }) => {
    // const updateAvailableCASMapX =
    //   await SharedPropsService.getAvailableCASMap();
    // const selectedCAS: AvailableCASItem[] = [];
    // Object.keys(updateAvailableCASMapX).forEach((key) => {
    //   selectedCAS.push(updateAvailableCASMapX[key]);
    // });
    return Promise.resolve(template(stepResponseObject as StepResponseObject));
  },
  actions: {
    [ACTION.PLEDGE_CONFIRMATION]: sendOtp,
    [ACTION.BACK_BUTTON]: goBack,
  },
};
