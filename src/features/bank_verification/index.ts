import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontSizeTokens,
  IconAlignmentTokens,
  IconSizeTokens,
  IconTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
  SelectiveListItemTypeTokens,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.BANK_ACCOUNT_VERIFICATION,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "space1", type: WIDGET.SPACE },
      { id: "titleStack", type: WIDGET.STACK },
      { id: "titleSpace", type: WIDGET.SPACE },
      { id: "listItem1", type: WIDGET.SELECTIVE_LIST_ITEM },
      { id: "spaceListItem1", type: WIDGET.SPACE },
      { id: "listItem2", type: WIDGET.SELECTIVE_LIST_ITEM },
      { id: "spaceListItem2", type: WIDGET.SPACE },
      { id: "listItem3", type: WIDGET.SELECTIVE_LIST_ITEM },
      { id: "spaceContinue", type: WIDGET.SPACE },
      { id: "continue", type: WIDGET.BUTTON },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    titleStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "bank_select", type: WIDGET.TEXT },
        { id: "add_account", type: WIDGET.BUTTON },
      ],
    },
    titleSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    bank_select: <TypographyProps>{
      label: "Select a bank account",
      fontSize: FontSizeTokens.SM,
      color: ColorTokens.Grey_Night,
      fontWeight: "600",
    },
    add_account: <ButtonProps>{
      label: "Add account",
      type: ButtonTypeTokens.LargeGhost,
      width: ButtonWidthTypeToken.CONTENT,
      icon: {
        name: IconTokens.AddUser,
        size: IconSizeTokens.XL,
        align: IconAlignmentTokens.left,
      },
    },
    listItem1: <SelectiveListItemProps>{
      type: SelectiveListItemTypeTokens.list,
      state: SelectiveListItemStateTokens.SELECTED,
      subTitle: "XXXX 0802",
      title: "AP Mahesh Co-operative Urban Bank",
      imageUrl:
        "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    spaceListItem1: <SpaceProps>{ size: SizeTypeTokens.LG },
    listItem2: <SelectiveListItemProps>{
      type: SelectiveListItemTypeTokens.list,
      state: SelectiveListItemStateTokens.NOT_SELECTED,
      subTitle: "XXXX 0802",
      title: "AP Mahesh Co-operative Urban Bank",
      imageUrl:
        "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    spaceListItem2: <SpaceProps>{ size: SizeTypeTokens.LG },
    listItem3: <SelectiveListItemProps>{
      type: SelectiveListItemTypeTokens.list,
      state: SelectiveListItemStateTokens.NOT_SELECTED,
      subTitle: "XXXX 0802",
      title: "AP Mahesh Co-operative Urban Bank",
      imageUrl:
        "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
    },
    spaceContinue: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
    continue: <ButtonProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
    },
  },
};

export const bankVerifyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
