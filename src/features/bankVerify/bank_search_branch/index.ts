import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
} from "@voltmoney/types";
import {
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  InputStateToken,
  InputTypeToken,
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
import { IFSCSearchAction, OnSelectIFSCAction } from "./actions";
import _ from "lodash";
export let bankCodeX = "";
export const template: (bankCode: string) => TemplateSchema = (bankCode) => ({
  layout: <Layout>{
    id: ROUTE.BANK_BRANCH_SEARCH,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "searchInput",
        type: WIDGET.INPUT /*position: POSITION.FIXED_TOP*/,
      },
      {
        id: "space",
        type: WIDGET.SPACE /*position: POSITION.FIXED_TOP*/,
      },
      {
        id: "dividerHeader",
        type: WIDGET.DIVIDER /*position: POSITION.FIXED_TOP*/,
      },
      {
        id: "dividerSpace",
        type: WIDGET.SPACE /*position: POSITION.FIXED_TOP*/,
      },
      {
        id: "listItemStack",
        type: WIDGET.STACK /*position: POSITION.FIXED_TOP*/,
      },
    ],
  },
  datastore: <Datastore>{
    space: <SpaceProps>{ size: SizeTypeTokens.XL },
    dividerHeader: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
      // margin: { horizontal: -SizeTypeTokens.XXL },
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
      caption: { success: "", error: "" },
      action: {
        type: ACTION.SEARCH_IFSC_ACTION,
        routeId: ROUTE.BANK_BRANCH_SEARCH,
        payload: <IFSCSearchActionPayload>{
          bankCode: `${bankCode}`,
          value: "",
        },
      },
    },
    dividerSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
  },
});

export const bankSearchBranchMF: PageType<any> = {
  onLoad: async ({}, { bankCode }) => {
    bankCodeX = bankCode;
    return Promise.resolve(template(bankCode));
  },
  actions: {
    [ACTION.ON_SELECT_IFSC]: OnSelectIFSCAction,
    [ACTION.SEARCH_IFSC_ACTION]: _.debounce(IFSCSearchAction, 250),
  },
};
