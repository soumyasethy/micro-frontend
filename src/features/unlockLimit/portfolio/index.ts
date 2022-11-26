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
  CtaCardProps,
  HeaderProps,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  ListItemDataProps,
  ListProps,
  ListTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  CtaPayload,
  EditItemPayload,
  OtpPayload,
  PortfolioTogglePayload,
  SearchPortfolioPayload,
} from "./types";
import {
  TriggerCTA,
  goBack,
  ToggleSelectAction,
  getTotalLimit,
  EditItem,
  SearchPortfolio,
  ClearSearchPortfolio,
  getActualLimit,
} from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import { addCommasToNumber } from "../../../configs/utils";

export const template: (
  stepResponseObject: StepResponseObject
) => TemplateSchema = (stepResponseObject) => {
  const selectedItemMap = {};

  let dataUI: ListItemDataProps[] = [
    ...stepResponseObject.availableCAS.map((availableCASItem, index) => {
      selectedItemMap[index] = availableCASItem.pledgedUnits > 0;
      return {
        label: availableCASItem.schemeName, //"Axis Long Term Equity Mutual Funds",
        info: "",
        trailIcon: { name: IconTokens.CheckedSquare },
        trailTitle: `₹${getTotalLimit(
          [availableCASItem],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","), //"₹4,000",
        trailSubTitle: `/ ₹${getActualLimit(
          [availableCASItem],
          stepResponseObject.isinNAVMap,
          stepResponseObject.isinLTVMap
        )}`.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ","),
        action: "edit",
        trailIconAction: {
          type: ACTION.EDIT_ITEM,
          routeId: ROUTE.PORTFOLIO,
          payload: <EditItemPayload>{
            value: 0,
            stepResponseObject,
            selectedMap: {},
          },
        },
      };
    }),
  ];

  return {
    layout: <Layout>{
      id: ROUTE.PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "space0", type: WIDGET.SPACE },
        { id: "inputItem", type: WIDGET.INPUT },
        { id: "inputSpace", type: WIDGET.SPACE },
        { id: "listItem", type: WIDGET.LIST },
        { id: "listSpace", type: WIDGET.SPACE },
        {
          id: "totalItem",
          type: WIDGET.CTACARD,
          position: POSITION.STICKY_BOTTOM,
          padding:{
            left:0,right:0,horizontal:0
          }
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Select Portfolio",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        action: {
          type: ACTION.BACK_BUTTON,
          payload: <OtpPayload>{
            value: "",
            widgetId: "continue",
            isResend: false,
          },
          routeId: ROUTE.PORTFOLIO,
        },
      },
      space0: <SpaceProps>{ size: SizeTypeTokens.XL },
      inputItem: <TextInputProps & WidgetProps>{
        type: InputTypeToken.SEARCH,
        state: InputStateToken.DEFAULT,
        placeholder: "Search Portfolio",
        title: "",
        caption: { success: "", error: "" },
        keyboardType: KeyboardTypeToken.default,
        action: {
          type: ACTION.SEARCH_PORTFOLIO,
          payload: <SearchPortfolioPayload>{
            value: "",
            widgetId: "listItem",
            stepResponseObject,
          },
          routeId: ROUTE.PORTFOLIO,
        },
        clearAction: {
          type: ACTION.CLEAR_SEARCH_PORTFOLIO,
          routeId: ROUTE.PORTFOLIO,
          payload: {},
        },
      },
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      listItem: <ListProps & WidgetProps>{
        type: ListTypeTokens.CHECKLIST,
        data: [...dataUI],
        selectedMap: { ...selectedItemMap },
        action: {
          type: ACTION.TOGGLE_ITEM,
          routeId: ROUTE.PORTFOLIO,
          payload: <PortfolioTogglePayload>{
            stepResponseObject,
          },
        },
      },
      listSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
      totalItem: <CtaCardProps>{
        label: "Total credit limit",
        info:
          "₹" +
          addCommasToNumber(
            getTotalLimit(
              stepResponseObject.availableCAS,
              stepResponseObject.isinNAVMap,
              stepResponseObject.isinLTVMap
            )
          ),
        actionLabel: "Confirm & get OTP",
        action: {
          type: ACTION.PORTFOLIO,
          payload: <CtaPayload>{ value: stepResponseObject },
          routeId: ROUTE.PORTFOLIO,
        },
      },
    },
  };
};

export const portfolioMF: PageType<any> = {
  onLoad: async ({}, { stepResponseObject, updateAvailableCASMap }) => {
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    return Promise.resolve(template(stepResponseObject));
  },
  actions: {
    [ACTION.PORTFOLIO]: TriggerCTA,
    [ACTION.SEARCH_PORTFOLIO]: SearchPortfolio,
    [ACTION.CLEAR_SEARCH_PORTFOLIO]: ClearSearchPortfolio,
    [ACTION.BACK_BUTTON]: goBack,
    [ACTION.TOGGLE_ITEM]: ToggleSelectAction,
    [ACTION.EDIT_ITEM]: EditItem,
  },
  clearPrevious: true,
};
