import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
import {
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontFamilyTokens,
  FontSizeTokens,
  HeaderProps,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION, OtpPayload, SearchPortfolioPayload} from "./types";
import {ClearSearchPortfolio, EditItem, goBack, SearchPortfolio, ToggleSelectAction, TriggerCTA,} from "./actions";
import {StepResponseObject} from "../unlock_limit/types";
import SharedPropsService from "../../../SharedPropsService";
import {portfolioListDatastoreBuilderV2} from "./utils";
import { addCommasToNumber } from "../../../configs/utils";

export const template: (
  stepResponseObject: StepResponseObject
) => Promise<TemplateSchema> = async (stepResponseObject) => {
  return {
    layout: <Layout>{
      id: ROUTE.PORTFOLIO,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.ABSOLUTE_TOP},
        // { id: "inputItem", type: WIDGET.INPUT },
        { id: "inputSpace", type: WIDGET.SPACE },
        { id: "titleText", type: WIDGET.TEXT },
        { id: "space0", type: WIDGET.SPACE },
        { id: "subTitleText", type: WIDGET.TEXT },
        { id: "space1", type: WIDGET.SPACE },
        { id: "divider0", type: WIDGET.DIVIDER },
        { id: "space2", type: WIDGET.SPACE },
        { id: "infoRow", type: WIDGET.STACK },
        { id: "listItem", type: WIDGET.LIST },
        { id: "listSpace", type: WIDGET.SPACE },
        {
          id: "totalItem",
          type: WIDGET.STACK,
          position: POSITION.STICKY_BOTTOM,
          padding: {
            left: 0,
            right: 0,
          },
        },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps>{
        title: "Set Credit Limit",
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        isBackButton: true,
        type: "DEFAULT",
        margin: {
          right: SizeTypeTokens.NONE,
          left: SizeTypeTokens.NONE,
        },
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
      titleText: <TypographyProps> {
        label: 'Select mutual funds for pledging',
        fontSize: FontSizeTokens.MD,
        fontFamily: FontFamilyTokens.Poppins,
        fontWeight: '700',
        color: ColorTokens.Grey_Night,
        lineHeight: 24
      },
      space0: <SpaceProps> { size: SizeTypeTokens.MD },
      space1: <SpaceProps> { size: SizeTypeTokens.XL },
      space2: <SpaceProps> { size: SizeTypeTokens.XL},
      subTitleText: <TypographyProps> {
        label: `${addCommasToNumber(
          parseInt(stepResponseObject["totalPortfolioAmount"].toString())
        )} are selected for pledging.`,
        fontSize: FontSizeTokens.SM,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: '400',
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 24
      },
      divider0: <DividerProps> {
        size: DividerSizeTokens.MD,
        type: 'solid',
        color: ColorTokens.Grey_Milk_1,
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
      inputSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      listSpace: <SpaceProps>{ size: SizeTypeTokens.XS },
      ...(await portfolioListDatastoreBuilderV2(stepResponseObject)),
      infoRow: <StackProps> {
        type: StackType.row,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id:"col1Header", type: WIDGET.TEXT },
          { id:"col2Header", type: WIDGET.TEXT }
        ]
      },
      col1Header: <TypographyProps> {
        label: 'Asset details',
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: '500',
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
      },
      col2Header: <TypographyProps> {
        label: 'Credit limit',
        fontSize: FontSizeTokens.XS,
        fontFamily: FontFamilyTokens.Inter,
        fontWeight: '500',
        color: ColorTokens.Grey_Charcoal,
        lineHeight: 18,
      },
    },
  };
};

export const portfolioMFV2: PageType<any> = {
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
