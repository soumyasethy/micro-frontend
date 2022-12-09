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
import { horizontalStepperRepo } from "../../../configs/utils";

export const template: (
  bankCode: string,
  bankName: string,
  accountNumber: string,
  stepper:StepperItem[]
) => TemplateSchema = (bankCode, bankName, accountNumber,stepper) => ({
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
      { id: "bankInput", type: WIDGET.INPUT },
      { id: "bankSpace", type: WIDGET.SPACE },
      { id: "accountInput", type: WIDGET.INPUT },
      { id: "IFSCSpace", type: WIDGET.SPACE },
      { id: "confirmAccountInput", type: WIDGET.INPUT },
      { id: "ConfirmSpace", type: WIDGET.SPACE },
      { id: "IFSCInput", type: WIDGET.INPUT },
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
    // stack: <StackProps>{
    //   type: StackType.row,
    //   alignItems: StackAlignItems.center,
    //   justifyContent: StackJustifyContent.flexStart,
    //   widgetItems: [
    //     { id: "leadIcon", type: WIDGET.IMAGE },
    //     { id: "leadIconSpace", type: WIDGET.SPACE },
    //     { id: "bankName", type: WIDGET.TEXT },
    //   ],
    // },
    // leadIcon: <ImageProps>{
    //   uri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${bankCode}.svg`,
    //   defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
    //   size: ImageSizeTokens.MD,
    //   padding: SizeTypeTokens.NONE,
    // },
    // leadIconSpace: <SpaceProps>{ size: SizeTypeTokens.LG },
    // bankName: <TypographyProps>{
    //   label: bankName,
    //   color: ColorTokens.Grey_Night,
    //   fontSize: FontSizeTokens.XL,
    //   fontWeight: "600",
    // },
    // trailIcon: <IconProps & WidgetProps>{
    //   name: IconTokens.Edit,
    //   size: IconSizeTokens.XXL,
    //   action: {
    //     type: ACTION.CHANGE_BANK_GO_BACK,
    //     routeId: ROUTE.BANK_ACCOUNT_ADD,
    //     payload: {},
    //   },
    // },
    accountSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    bankInput: <TextInputProps & WidgetProps>{
      isFocus: true,
      type: InputTypeToken.SEARCH,
      title: "",
      placeholder: "Select bank",
      value: `${accountNumber}`,
      caption: { success: "", error: "" },
      keyboardType: KeyboardTypeToken.default,
      action: {
        type: ACTION.ONCHANGE_ACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value: accountNumber },
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
      },
    },
    bankSpace: <SpaceProps>{ size: SizeTypeTokens.Size32 },
    accountInput: <TextInputProps & WidgetProps>{
      isFocus: true,
      type: InputTypeToken.DEFAULT,
      title: "",
      placeholder: "Account number",
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
    confirmAccountInput: <TextInputProps & WidgetProps>{
      isFocus: true,
      type: InputTypeToken.DEFAULT,
      title: "",
      placeholder: "Confirm Account number",
      value: `${accountNumber}`,
      caption: { success: "", error: "" },
      keyboardType: KeyboardTypeToken.email,
      action: {
        type: ACTION.ONCHANGE_ACCOUNT_NUMBER,
        payload: <InputNumberActionPayload>{ value: accountNumber },
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
      title: "",
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
      label: "Save & Contiune",
      type: ButtonTypeTokens.LargeFilled,
      width: ButtonWidthTypeToken.FULL,
      action: {
        type: ACTION.TRIGGER_CTA,
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
        payload: <BAVVerifyActionPayload>{
          applicationId: "",
        },
      },
    },
  },
});

export const distBankAccountAddMF: PageType<any> = {
  onLoad: async ({ }, { bankCode, bankName }) => {
    const stepper: StepperItem[] = await horizontalStepperRepo();
   
    const accountNumber = await SharedPropsService.getAccountNumber();
    return Promise.resolve(template(bankCode, bankName, accountNumber,stepper));
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
