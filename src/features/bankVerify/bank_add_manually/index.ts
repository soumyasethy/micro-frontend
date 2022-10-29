import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  POSITION,
  TemplateSchema,
} from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontSizeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
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
import { ROUTE } from "../../../routes";
import { ACTION } from "./types";
import { TestAction } from "./actions";

export const template: TemplateSchema = {
  layout: <Layout>{
    id: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "cardStack", type: WIDGET.STACK },
      { id: "accountSpace", type: WIDGET.SPACE },
      { id: "accountInput", type: WIDGET.INPUT },
      { id: "IFSCSpace", type: WIDGET.SPACE },
      { id: "IFSCInput", type: WIDGET.INPUT },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    cardStack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.spaceBetween,
      widgetItems: [
        { id: "stack", type: WIDGET.STACK },
        { id: "trailIcon", type: WIDGET.ICON },
      ],
    },
    stack: <StackProps>{
      type: StackType.row,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: "leadIcon", type: WIDGET.IMAGE },
        { id: "leadIconSpace", type: WIDGET.SPACE },
        { id: "bankName", type: WIDGET.TEXT },
      ],
    },
    leadIcon: <ImageProps>{
      uri: "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
      size: ImageSizeTokens.XXS,
    },
    leadIconSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    bankName: <TypographyProps>{
      label: "hello",
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.XL,
      fontWeight: "600",
    },
    trailIcon: <IconProps>{
      name: IconTokens.Edit,
      size: IconSizeTokens.XXL,
    },
    accountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    accountInput: <TextInputProps>{
      type: InputTypeToken.DEFAULT,
      title: "Account number",
      placeholder: "Enter account number",
      caption: { success: "", error: "" },
    },
    IFSCSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    IFSCInput: <TextInputProps>{
      type: InputTypeToken.DEFAULT,
      title: "Branch or IFSC",
      placeholder: "Search",
      caption: { success: "", error: "" },
    },
    continue: <ButtonProps>{
      label: "Verify bank",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
    },
  },
};

export const addBankManuallyMF: PageType<any> = {
  onLoad: async () => Promise.resolve(template),
  actions: {
    [ACTION.TEST_ACTION]: TestAction,
  },
};
