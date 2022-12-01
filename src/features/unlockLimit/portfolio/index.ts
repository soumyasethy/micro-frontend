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
  HeaderProps,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, OtpPayload, SearchPortfolioPayload } from "./types";
import {
  TriggerCTA,
  goBack,
  ToggleSelectAction,
  EditItem,
  SearchPortfolio,
  ClearSearchPortfolio,
} from "./actions";
import { StepResponseObject } from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import { portfolioListDatastoreBuilder } from "./utils";

export const template: (
  stepResponseObject: StepResponseObject
) => Promise<TemplateSchema> = async (stepResponseObject) => {
  return {
    layout: <Layout>{
      id: ROUTE.PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        // { id: "inputItem", type: WIDGET.INPUT },
        // { id: "inputSpace", type: WIDGET.SPACE },
        { id: "listItem", type: WIDGET.LIST },
        { id: "listSpace", type: WIDGET.SPACE },
        {
          id: "totalItem",
          type: WIDGET.CTACARD,
          position: POSITION.STICKY_BOTTOM,
          padding: {
            left: 0,
            right: 0,
            horizontal: 0,
          },
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
      listSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
      ...(await portfolioListDatastoreBuilder(stepResponseObject)),
    },
  };
};

export const portfolioMF: PageType<any> = {
  onLoad: async ({}, { stepResponseObject, updateAvailableCASMap }) => {
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    return Promise.resolve(await template(stepResponseObject));
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
