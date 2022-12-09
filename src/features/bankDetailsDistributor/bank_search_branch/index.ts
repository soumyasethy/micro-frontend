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
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TextInputProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, IFSCSearchActionPayload } from "./types";
import {
  clearAction,
  GoBackAction,
  IFSCSearchAction,
  OnSelectIFSCAction,
} from "./actions";
import _ from "lodash";

export let bankCodeX = "";
export const template: (
  bankCode: string,
  bankName: string,
  bankAccountNumber?: string
) => TemplateSchema = (bankCode, bankName, bankAccountNumber) => ({
  layout: <Layout>{
    id: ROUTE.DIST_BANK_SEARCH_BRANCH,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      {
        id: "dividerSpace",
        type: WIDGET.SPACE,
      },
      {
        id: "listItemStack",
        type: WIDGET.STACK,
      },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps & WidgetProps>{
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      title: "Search IFSC or Branch",
      action: {
        type: ACTION.GO_BACK,
        routeId: ROUTE.BANK_SEARCH_BRANCH,
        payload: {},
      },
      widgetItem: {
        id: "searchInput",
        type: WIDGET.INPUT,
      },
    },
    space: <SpaceProps>{ size: SizeTypeTokens.XL },
    dividerHeader: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
    },
    headerStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "leadIcon", type: WIDGET.ICON },
        { id: "searchInput", type: WIDGET.INPUT },
      ],
    },
    leadIcon: <IconProps>{ name: IconTokens.Fire, size: IconSizeTokens.MD },
    searchInput: <TextInputProps & WidgetProps>{
      placeholder: "Search by branch or IFSC",
      type: InputTypeToken.SEARCH,
      title: "Search",
      state: InputStateToken.DEFAULT,
      keyboardType: KeyboardTypeToken.default,
      caption: { success: "", error: "" },
      action: {
        type: ACTION.SEARCH_IFSC_ACTION,
        routeId: ROUTE.DIST_BANK_SEARCH_BRANCH,
        payload: <IFSCSearchActionPayload>{
          bankCode: `${bankCode}`,
          bankName: `${bankName}`,
          bankAccountNumber: `${bankAccountNumber}`,
          value: "",
        },
      },
      clearAction: {
        type: ACTION.CLEAR_SEARCH,
        routeId: ROUTE.DIST_BANK_SEARCH_BRANCH,
        payload: {},
      },
    },
    dividerSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
});

export const distBankSearchBranchMF: PageType<any> = {
  onLoad: async ({}, { bankCode, bankName, bankAccountNumber }) => {
    bankCodeX = bankCode;
    return Promise.resolve(template(bankCode, bankName, bankAccountNumber));
  },
  actions: {
    [ACTION.ON_SELECT_IFSC]: OnSelectIFSCAction,
    [ACTION.CLEAR_SEARCH]: clearAction,
    [ACTION.SEARCH_IFSC_ACTION]: _.debounce(IFSCSearchAction, 250),
    [ACTION.GO_BACK]: GoBackAction,
  },
  clearPrevious: true,
};
