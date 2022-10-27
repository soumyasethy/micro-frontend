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
  FontSizeTokens,
  ImageProps,
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

const popularBankItem = (id: string, type: "COLUMN" | "ROW") => ({
  widgetItem: { id: `popular_bank_item_${id}`, type: WIDGET.STACK },
  datastore: <Datastore>{
    [`popular_bank_item_${id}`]: <StackProps>{
      type: type ? type : StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceEvenly,
      widgetItems: [
        { id: `bank_logo_${id}`, type: WIDGET.IMAGE },
        { id: `bank_space_${id}`, type: WIDGET.SPACE },
        { id: `bank_name_${id}`, type: WIDGET.TEXT },
      ],
    },
    [`bank_logo_${id}`]: <ImageProps>{
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    [`bank_space_${id}`]: <SpaceProps>{ size: SizeTypeTokens.MD },
    [`bank_name_${id}`]: <TypographyProps>{ label: "HDFC" },
  },
});

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.BANK_ACCOUNT_ADD,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "searchInput", type: WIDGET.INPUT },
      { id: "searchInputSpace", type: WIDGET.SPACE },
      { id: "title1", type: WIDGET.TEXT },
      { id: "spaceTitle", type: WIDGET.SPACE },
      { id: "stack1", type: WIDGET.STACK },
      { id: "stackSpace1", type: WIDGET.SPACE },
      { id: "stack2", type: WIDGET.STACK },
      { id: "stackSpace2", type: WIDGET.SPACE },
      { id: "title2", type: WIDGET.TEXT },
      { id: "titleSpace2", type: WIDGET.SPACE },
      { id: "stack3", type: WIDGET.STACK },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    searchInput: <TextInputProps & WidgetProps>{
      placeholder: "Search by bank name",
      type: InputTypeToken.DEFAULT,
      caption: { success: "", error: "" },
    },
    searchInputSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    title1: <TypographyProps>{
      label: "Popular banks",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      fontWeight: "600",
    },
    spaceTitle: <SpaceProps>{ size: SizeTypeTokens.XL },
    stack1: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [popularBankItem("hdfc", "COLUMN").widgetItem],
    },
    stackSpace1: <SpaceProps>{ size: SizeTypeTokens.XXL },
    stack2: <StackProps>{
      type: StackType.row,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [popularBankItem("axis", "COLUMN").widgetItem],
    },
    stackSpace2: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    title2: <TypographyProps>{
      label: "All other banks",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      fontWeight: "600",
    },
    titleSpace2: <SpaceProps>{ size: SizeTypeTokens.XL },
    stack3: <StackProps>{
      type: StackType.column,
      justifyContent: StackJustifyContent.spaceBetween,
      alignItems: StackAlignItems.flexStart,
      widgetItems: [popularBankItem("icici", "COLUMN").widgetItem],
    },
    ...popularBankItem("hdfc", "COLUMN").datastore,
    ...popularBankItem("axis", "COLUMN").datastore,
    ...popularBankItem("icici", "ROW").datastore,
  },
};

export const bankAddMF: PageType<any> = {
  onLoad: async () => {
    console.warn("template-----> ", JSON.stringify(template));
    return Promise.resolve(template);
  },
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
