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
  MessageAlignType,
  MessageProps,
  SizeTypeTokens,
  SpaceProps,
  StackAlignItems,
  StackJustifyContent,
  StackProps,
  StackType,
  StackWidth,
  StepperItem,
  StepperProps,
  StepperStateToken,
  StepperTypeTokens,
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
  ChangeBankGoBackAction,
  GoToStepper,
  NavigationSearchBankAction,
  NavigationSearchIFSCAction,
  onChangeBankDetailse,
  onChangeIfscDetails,
  onConfirmAccountNumber,
  savebankDetails,
  skipBankVerification,
  textOnChange,
  toggleCTA,
  ToggleCTA,
} from "./actions";
import { BAVVerifyActionPayload } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { horizontalDistributorStepperRepo, horizontalStepperRepo } from "../../../configs/utils";
import { onChangeAccountNumber } from "../../bankVerify/bank_account_add/actions";
import { RegexConfig } from "../../../configs/config";

export const template: (
  bankCode: string,
  bankName: string,
  accountNumber: string,
  stepper:StepperItem[]
) => TemplateSchema = (bankCode, bankName="BOB", accountNumber,stepper) => ({
  layout: <Layout>{
    id: ROUTE.DIST_BANK_ACCOUNT_ADD,
    type: LAYOUTS.LIST,
    widgets: [
      {
        id: "header",
        type: WIDGET.HEADER,
        position: POSITION.ABSOLUTE_TOP,
      },
      {
        id: "cardStack", type: WIDGET.MESSAGE, position: POSITION.STICKY_TOP, padding: {
          left: 0, right: 0, top: 0
        }
      },
      { id: "accountSpace", type: WIDGET.SPACE },
      { id: "bankInputStack", type: WIDGET.STACK },
      { id: "bankSpace", type: WIDGET.SPACE },
      { id: "accountInput", type: WIDGET.INPUT },
      { id: "IFSCSpace", type: WIDGET.SPACE },
      { id: "confirmAccountInput", type: WIDGET.INPUT },
      { id: "ConfirmSpace", type: WIDGET.SPACE },
      { id: "IFSCInputStack", type: WIDGET.STACK },
      {
        id: "continue",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
      { id: "skipSpace", type: WIDGET.SPACE },
      {
        id: "skip",
        type: WIDGET.BUTTON,
        position: POSITION.ABSOLUTE_BOTTOM,
      },
    ],
  },
  datastore: <Datastore>{
    header: <HeaderProps & WidgetProps>{
      isBackButton: true,
      type: HeaderTypeTokens.verification,
      stepperProps: <StepperProps>{
        data: stepper,
        type: StepperTypeTokens.HORIZONTAL,
      },
      title: "Create new application",
      action: {
        type: ACTION.CHANGE_BANK_GO_BACK,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: {},
      },
      
    },
    // space1: <SpaceProps>{ size: SizeTypeTokens.SM },
    cardStack: <MessageProps>{
      label: 'Bank account holder name & details must match with investor',
      actionText: '',
      labelColor: ColorTokens.Grey_Charcoal,
      bgColor: ColorTokens.Grey_Milk,
      alignText: MessageAlignType.CENTER,
      icon: <IconProps>{
        name: IconTokens.Info,
        color: ColorTokens.Grey_Smoke
      }
    },
    accountSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    bankInputStack: <StackProps & WidgetProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "bankInput", type: WIDGET.INPUT }],
      action: {
        type: ACTION.NAVIGATION_SEARCH_BANK,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
    
    bankInput: <TextInputProps & WidgetProps>{
      isFocus: false,
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DEFAULT,
      title: "Bank Name",
      placeholder: "Select bank",
      keyboardType: KeyboardTypeToken.email,
      value:`${bankName}`,
      caption: { success: "", error: "" },
      width: TextInputTypeToken.FULL,
      action: {
        type: ACTION.ONCHANGE_BANK_DETAILS,
        payload: <InputNumberActionPayload>{ value: "", widgetId:"bankInput" },
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
      },
      onPressAction: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
   
    bankSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    accountInput: <TextInputProps & WidgetProps>{
      isFocus: false,
      type: InputTypeToken.DEFAULT,
      title: "Account Number",
      placeholder: "Account number",
      caption: { success: "", error: "" },
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ONCHANGE_ACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value:"", widgetId:"accountInput" },
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
      },
    },
    IFSCSpace: <SpaceProps>{ size: SizeTypeTokens.XXXL },
    confirmAccountInput: <TextInputProps & WidgetProps>{
      regex: RegexConfig.MOBILE,
      type: InputTypeToken.DEFAULT,
      state:InputStateToken.DEFAULT,
     
      title: "Confirm Account Number",
      placeholder: "Confirm Account number",
      caption: { success: "", error: "" }, 
      successAction:{
        type: ACTION.ONCHANGE_CONFIRMACCOUNT_NUMBER,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload:  <InputNumberActionPayload>{ value: "", widgetId: "confirmAccountInput" },
      },
      errorAction:{
        type: ACTION.ONCHANGE_CONFIRMACCOUNT_NUMBER,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload:  <InputNumberActionPayload>{ value: "", widgetId: "confirmAccountInput" },
      },
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ONCHANGE_CONFIRMACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value: "", widgetId: "confirmAccountInput" },
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
      },
    },
    ConfirmSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    IFSCInputStack: <StackProps & WidgetProps>{
      width: StackWidth.FULL,
      type: StackType.column,
      alignItems: StackAlignItems.center,
      justifyContent: StackJustifyContent.center,
      widgetItems: [{ id: "IFSCInput", type: WIDGET.INPUT }],
      action: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
    
    IFSCInput: <TextInputProps & WidgetProps>{
      isFocus: false,
      type: InputTypeToken.DEFAULT,
      state: InputStateToken.DEFAULT,
      title: "Search by branch or IFSC",
      placeholder: "Search by branch or IFSC",
      keyboardType: KeyboardTypeToken.email,
      caption: { success: "", error: "" },
      width: TextInputTypeToken.FULL,
      action: {
        type: ACTION.ONCHANGE_IFSC_DETAILS,
        payload: <InputNumberActionPayload>{ value: "",widgetId:"IFSCInput" },
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
      },
      onPressAction: {
        type: ACTION.NAVIGATION_SEARCH_IFSC,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <NavigationSearchIFSCActionPayload>{
          bankCode: bankCode,
          bankName,
        },
      },
    },
    continue: <ButtonProps & WidgetProps>{
      label: "Save & Contiune",
      type: ButtonTypeTokens.LargeOutline,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.SAVE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <BAVVerifyActionPayload>{
          applicationId: "",
        },
      },
    },
    skipSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
    skip: <ButtonProps & WidgetProps>{
      label: "Skip for now",
      type: ButtonTypeTokens.LargeGhost,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TRIGGER_CTA,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <{}>{},
      },
    },
  },
});

export const distBankAccountAddMF: PageType<any> = {
  onLoad: async ({ }, { bankCode, bankName }) => {
    console.log("code",bankCode);
    console.log("name",bankName);
    const accountNumber = await SharedPropsService.getAccountNumber();
    const stepper: StepperItem[] = await horizontalDistributorStepperRepo();
    return Promise.resolve(template(bankCode, bankName, accountNumber,stepper));
  },
  actions: {
    [ACTION.NAVIGATION_SEARCH_IFSC]: NavigationSearchIFSCAction,
    [ACTION.NAVIGATION_SEARCH_BANK]: NavigationSearchBankAction,
    [ACTION.ONCHANGE_BANK_DETAILS]: onChangeBankDetailse,
    [ACTION.ONCHANGE_IFSC_DETAILS]: onChangeIfscDetails,
   // [ACTION.ONCHANGE_ACCOUNT_NUMBER]: onChangeAccountNumber,
   [ACTION.ONCHANGE_ACCOUNT_NUMBER]: textOnChange,
   [ACTION.ONCHANGE_CONFIRMACCOUNT_NUMBER]: onConfirmAccountNumber,
    //[ACTION.TOGGLE_CTA]: ToggleCTA,
    [ACTION.ENABLE_CONTINUE]: toggleCTA,
    [ACTION.DISABLE_CONTINUE]: toggleCTA,
    [ACTION.TRIGGER_CTA]: skipBankVerification,
    [ACTION.SAVE]: savebankDetails,
    [ACTION.CHANGE_BANK_GO_BACK]: ChangeBankGoBackAction,
    [ACTION.NAV_STEPPER]: GoToStepper,
  },
  clearPrevious: false,
};
