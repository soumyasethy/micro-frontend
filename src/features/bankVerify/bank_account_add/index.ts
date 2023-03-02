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
  ButtonProps,
  ButtonTypeTokens,
  ButtonWidthTypeToken,
  ColorTokens,
  FontSizeTokens,
  HeaderProps,
  HeaderTypeTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  ImageProps,
  ImageSizeTokens,
  InputStateToken,
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
import { ROUTE } from "../../../routes";
import {
  ACTION,
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import {
  BavVerifyManualAction,
  ChangeBankGoBackAction,
  GoToStepper,
  NavigationSearchIFSCAction,
  onChangeAccountNumber,
  onChangeIFSCNumber,
  ToggleCTA,
} from "./actions";
import { BAVVerifyActionPayload } from "../bank_account_verification/types";
import SharedPropsService from "../../../SharedPropsService";
import { getBankDefaultPng, getBankPNGUrl } from "../../../configs/utils";

export const template: (
  bankCode: string,
  bankName: string,
  accountNumber: string
) => TemplateSchema = (bankCode, bankName, accountNumber) => ({
  layout: <Layout>{
    id: ROUTE.BANK_ACCOUNT_ADD,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      { id: "space1", type: WIDGET.SPACE },
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
    header: <HeaderProps & WidgetProps>{
      isBackButton: true,
      type: HeaderTypeTokens.DEFAULT,
      title: "Enter account details",
      action: {
        type: ACTION.CHANGE_BANK_GO_BACK,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: {},
      },
    },
    space1: <SpaceProps>{ size: SizeTypeTokens.XL },
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
      uri: getBankPNGUrl(bankCode),
      defaultUri: getBankDefaultPng(),
      size: ImageSizeTokens.MD,
      padding: SizeTypeTokens.NONE,
    },
    leadIconSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    bankName: <TypographyProps>{
      label: bankName,
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.XL,
      fontWeight: "600",
    },
    trailIcon: <IconProps & WidgetProps>{
      name: IconTokens.Edit,
      size: IconSizeTokens.XXL,
      action: {
        type: ACTION.CHANGE_BANK_GO_BACK,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: {},
      },
    },
    accountSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    accountInput: <TextInputProps & WidgetProps>{
      isFocus: true,
      type: InputTypeToken.DEFAULT,
      title: "Account number",
      placeholder: "Enter account number",
      value: `${accountNumber}`,
      caption: { success: "", error: "" },
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ONCHANGE_ACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value: accountNumber },
        routeId: ROUTE.BANK_ACCOUNT_ADD,
      },
    },
    IFSCSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    IFSCInputStack: <StackProps & WidgetProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "IFSCInput", type: WIDGET.INPUT }],
      action: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
    IFSCInput: <TextInputProps & WidgetProps>{
      isFocus: false,
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DISABLED,
      title: "Branch or IFSC",
      placeholder: "Search by branch or IFSC",
      keyboardType: KeyboardTypeToken.email,
      value: "",
      caption: { success: "", error: "" },
      width: TextInputTypeToken.FULL,
      action: {
        type: ACTION.ONCHANGE_IFSC_NUMBER,
        payload: <InputNumberActionPayload>{ value: "" },
        routeId: ROUTE.BANK_ACCOUNT_ADD,
      },
      onPressAction: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Verify bank",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TRIGGER_CTA,
        routeId: ROUTE.BANK_ACCOUNT_ADD,
        payload: <BAVVerifyActionPayload>{
          applicationId: "",
        },
      },
    },
  },
});

export const bankAccountAddMF: PageType<any> = {
  onLoad: async ({}, { bankCode, bankName }) => {
    const accountNumber = await SharedPropsService.getAccountNumber();
    return Promise.resolve(template(bankCode, bankName, accountNumber));
  },
  actions: {
    [ACTION.NAVIGATION_SEARCH_IFSC]: NavigationSearchIFSCAction,
    [ACTION.ONCHANGE_ACCOUNT_NUMBER]: onChangeAccountNumber,
    [ACTION.ONCHANGE_IFSC_NUMBER]: onChangeIFSCNumber,
    [ACTION.TOGGLE_CTA]: ToggleCTA,
    [ACTION.TRIGGER_CTA]: BavVerifyManualAction,
    [ACTION.CHANGE_BANK_GO_BACK]: ChangeBankGoBackAction,
    [ACTION.NAV_STEPPER]: GoToStepper,
  },
  clearPrevious: true,
};
