import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontSizeTokens,
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
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.BANK_BRANCH_SEARCH,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "headerStack",
        type: WIDGET.STACK /*position: POSITION.FIXED_TOP*/,
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
    searchInput: <TextInputProps>{
      placeholder: "Search by branch or IFSC",
      type: InputTypeToken.DEFAULT,
      title: "Search",
      state: InputStateToken.DEFAULT,
      caption: { success: "", error: "" },
    },
    dividerSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    listItemStack: <StackProps>{
      type: StackType.column,
      alignItems: StackAlignItems.flexStart,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "title", type: WIDGET.TEXT },
        { id: "titleSpace", type: WIDGET.SPACE },
        { id: "subTitle", type: WIDGET.TEXT },
        { id: "spaceEnd", type: WIDGET.SPACE },
        { id: "dividerEnd", type: WIDGET.DIVIDER },
      ],
    },
    title: <TypographyProps>{
      label: "HDFC0005531",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      fontWeight: "700",
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
    subTitle: <TypographyProps>{
      label:
        "24/3 51, Kasturba Rd, Mahatma Gandhi Rd, Bengaluru, Karnataka 560001",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
    },
    spaceEnd: <SpaceProps>{ size: SizeTypeTokens.XL },
    dividerEnd: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
      // margin: { horizontal: -SizeTypeTokens.XXL },
    },
  },
};

export const bankSearchBranchMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
