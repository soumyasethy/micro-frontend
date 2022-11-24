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
  FontFamilyTokens,
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
import { AvailableCASItem, StepResponseObject } from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

export const template: (
  totalAmount: number,
  totalCharges: number,
  processingFeesBreakUp: { [key in string]: number },
  stepResponseObject: StepResponseObject
) => TemplateSchema = (
  totalAmount = 0,
  totalCharges = 0,
  processingFeesBreakUp = {},
  stepResponseObject
) => {
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
        title: "Pledge confirmation",
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
            title: "Total cash limit",
            amount: `₹${totalAmount}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ","
            ),
          },
          ...Object.keys(processingFeesBreakUp).map((key, index) => {
            return {
              id: `processingFeesBreakUp_${index}`,
              title: key,
              amount: `${processingFeesBreakUp[key] || 0}`.replace(
                /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                ","
              ),
            };
          }),
          {
            id: "total_charges",
            title: "Total charges",
            amount: `${totalCharges}`.replace(
              /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
              ","
            ),
          },
        ],
      },
      buttonSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      continue: <ButtonProps & WidgetProps>{
        fontFamily: FontFamilyTokens.Poppins,
        label: "Confirm & get OTP",
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
  onLoad: async ({ network }, { stepResponseObject }) => {
    /// Pledging
    const mutualFundPortfolioItems: AvailableCASItem[] = (
      stepResponseObject as StepResponseObject
    ).availableCAS;
    mutualFundPortfolioItems.forEach((_item, index) => {
      mutualFundPortfolioItems[index].is_pledged = _item.pledgedUnits > 0;
    });

    const applicationId = (await SharedPropsService.getUser())
      .linkedApplications[0].applicationId;

    /// fetch processing fee
    const response = await network.post(
      api.processingCharges,
      {
        applicationId: applicationId,
        mutualFundPortfolioItems,
      },
      { headers: await getAppHeader() }
    );

    const processingFeesBreakUp = _.get(
      response,
      "data.stepResponseObject.processingChargesBreakup",
      {}
    );
    const totalCharges = _.get(
      response,
      "data.stepResponseObject.totalCharges",
      0
    );

    const totalAmount = getTotalLimit(
      stepResponseObject.availableCAS,
      stepResponseObject.isinNAVMap,
      stepResponseObject.isinLTVMap
    );

    return Promise.resolve(
      template(
        totalAmount,
        totalCharges,
        processingFeesBreakUp,
        stepResponseObject as StepResponseObject
      )
    );
  },
  actions: {
    [ACTION.PLEDGE_CONFIRMATION]: sendOtp,
    [ACTION.BACK_BUTTON]: goBack,
  },
  clearPrevious: true,
};
