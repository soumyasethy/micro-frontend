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

export const template: (stepResponseObject) => TemplateSchema = (
  stepResponseObject = {}
) => ({
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
        payload: <{}>{
          // value: "",
          // widgetId: "continue",
          // isResend: false,
        },
        routeId: ROUTE.PORTFOLIO,
      },
    },
    space0: <SpaceProps>{ size: SizeTypeTokens.XL },
    lineItem: <LineItemCardProps>{
      data: [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "Total Cash Limit",
          amount: `${stepResponseObject.availableCreditAmount}`,
        },
        // {
        //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        //   title: "Processing Charge 1",
        //   amount: `${stepResponseObject.processingFees || 0}`,
        // },
        // {
        //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
        //   title: "Processing Charge 2	",
        //   amount: `${stepResponseObject.processingFees || 0}`,
        // },
        ...Object.keys(
          _.get(stepResponseObject, "processingFeesBreakUp", {})
        ).map((key) => {
          return {
            id: "58694a0f-3da1-471f-bd96-145571e29d72",
            title: key,
            amount: `${stepResponseObject.processingFeesBreakUp[key] || 0}`,
          };
        }),
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
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
      // loading: true,
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
});

export const pledgeConfirmationMF: PageType<any> = {
  onLoad: async ({}, { availableCAS }) => {
    console.log("pledgeConfirmationMF onload", availableCAS);
    return Promise.resolve(template(availableCAS));
  },
  actions: {
    [ACTION.PLEDGE_CONFIRMATION]: sendOtp,
    [ACTION.BACK_BUTTON]: goBack,
  },
};
