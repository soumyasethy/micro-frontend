import {Datastore, Layout, LAYOUTS, PageType, POSITION, TemplateSchema, WidgetProps,} from "@voltmoney/types";
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
  KeyboardTypeToken,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  TextInputProps,
  TextInputTypeToken,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import {ROUTE} from "../../../routes";
import {ACTION, InputNumberActionPayload, NavigationSearchIFSCActionPayload,} from "./types";
import {
  BavVerifyManualAction,
  ChangeBankGoBackAction,
  NavigationSearchIFSCAction,
  onChangeAccountNumber,
  onChangeIFSCNumber,
  ToggleCTA,
} from "./actions";
import {BAVVerifyActionPayload} from "../bank_verification/types";

export const template: (bankCode: string) => TemplateSchema = (bankCode) => ({
  layout: <Layout>{
    id: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
    type: LAYOUTS.LIST,
    widgets: [
      { id: "cardStack", type: WIDGET.STACK },
      { id: "accountSpace", type: WIDGET.SPACE },
      { id: "accountInput", type: WIDGET.INPUT },
      { id: "IFSCSpace", type: WIDGET.SPACE },
      { id: "IFSCInputStack", type: WIDGET.STACK },
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
      label: bankCode,
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.XL,
      fontWeight: "600",
    },
    trailIcon: <IconProps & WidgetProps>{
      name: IconTokens.Edit,
      size: IconSizeTokens.XXL,
      action: {
        type: ACTION.CHANGE_BANK_GO_BACK,
        routeId: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
        payload: {},
      },
    },
    accountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    accountInput: <TextInputProps & WidgetProps>{
      type: InputTypeToken.DEFAULT,
      title: "Account number",
      placeholder: "Enter account number",
      value: "",
      caption: { success: "", error: "" },
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ONCHANGE_ACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value: "" },
        routeId: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
      },
    },
    IFSCSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    IFSCInputStack: <StackProps & WidgetProps>{
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      width: StackWidth.FULL,
      widgetItems: [{ id: "IFSCInput", type: WIDGET.INPUT }],
      action: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
        payload: <NavigationSearchIFSCActionPayload>{ bankCode: bankCode },
      },
    },
    IFSCInput: <TextInputProps & WidgetProps>{
      type: InputTypeToken.DEFAULT,
      title: "Branch or IFSC",
      placeholder: "Search",
      value: "",
      caption: { success: "", error: "" },
      width: TextInputTypeToken.FULL,
      action: {
        type: ACTION.ONCHANGE_IFSC_NUMBER,
        payload: <InputNumberActionPayload>{ value: "" },
        routeId: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
      },
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Verify bank",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TRIGGER_CTA,
        routeId: ROUTE.BANK_ACCOUNT_ADD_MANUALLY,
        payload: <BAVVerifyActionPayload>{
          applicationId: "",
        },
      },
    },
  },
});

export const addBankManuallyMF: PageType<any> = {
  onLoad: async ({}, { bankCode }) => {
    console.warn("addBankManuallyMF OnLoad bankCode->", bankCode);
    return Promise.resolve(template(bankCode));
  },
  actions: {
    [ACTION.NAVIGATION_SEARCH_IFSC]: NavigationSearchIFSCAction,
    [ACTION.ONCHANGE_ACCOUNT_NUMBER]: onChangeAccountNumber,
    [ACTION.ONCHANGE_IFSC_NUMBER]: onChangeIFSCNumber,
    [ACTION.TOGGLE_CTA]: ToggleCTA,
    [ACTION.TRIGGER_CTA]: BavVerifyManualAction,
    [ACTION.CHANGE_BANK_GO_BACK]: ChangeBankGoBackAction,
  },
};
