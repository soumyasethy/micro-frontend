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
  IconAlignmentTokens,
  IconProps,
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
  StackWidth,
  StepperItem,
  StepperProps,
  StepperStateToken,
  StepperTypeTokens,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";
import { ACTION, BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  AddAccountNavAction,
  BavVerifyAction,
  GoBackAction,
  GoNext,
  ToggleSelectAction,
} from "./actions";
import { fetchBankRepo } from "./repo";
import { stepperRepo } from "../../../configs/utils";

export const template: (
  banks: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
    stepper: StepperItem[];
  }[],
  stepper: StepperItem[]
) => Promise<TemplateSchema> = async (banks, stepper) => {
  const buildDS = (
    index: number,
    name: string,
    accountNo: string,
    ifscCode: string
  ) => {
    return {
      [`listItem${index}`]: <SelectiveListItemProps & WidgetProps>{
        type: SelectiveListItemTypeTokens.list,
        state: SelectiveListItemStateTokens.NOT_SELECTED,
        subTitle: accountNo,
        title: name,
        imageUrl:
          "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
        action: {
          type: ACTION.TOGGLE_SELECT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: <ToggleActionPayload>{
            value: SelectiveListItemStateTokens.SELECTED,
            targetWidgetId: `listItem${index}`,
            bankIfscCode: ifscCode,
            bankAccountNumber: accountNo,
          },
        },
      },
      [`spaceListItem${index}`]: <SpaceProps>{ size: SizeTypeTokens.LG },
    };
  };
  let ds = {};
  banks.map((bank, index) => {
    ds = {
      ...ds,
      ...buildDS(index, bank.bankName, bank.accountNumber, bank.ifscCode),
    };
  });
  const buildUI = () => {
    const UIArr = [];
    banks.map((bank, index) => {
      UIArr.push(
        { id: `listItem${index}`, type: WIDGET.SELECTIVE_LIST_ITEM },
        { id: `spaceListItem${index}`, type: WIDGET.SPACE }
      );
    });
    return UIArr;
  };
  return {
    layout: <Layout>{
      id: ROUTE.BANK_ACCOUNT_VERIFICATION,
      type: LAYOUTS.LIST,
      widgets: [
        { id: "header", type: WIDGET.HEADER, position: POSITION.FIXED_TOP },
        { id: "space1", type: WIDGET.SPACE },
        { id: "titleStack", type: WIDGET.STACK },
        { id: "titleSpace", type: WIDGET.SPACE },
        ...buildUI(),
        { id: "spaceContinue", type: WIDGET.SPACE },
        { id: "continue", type: WIDGET.BUTTON },
      ],
    },
    datastore: <Datastore>{
      header: <HeaderProps & WidgetProps>{
        isBackButton: true,
        leadIcon: "https://reactnative.dev/img/tiny_logo.png",
        subTitle:
          "Volt Protects your financial information with Bank Grade Security",
        title: "Bank Verification",
        type: HeaderTypeTokens.verification,
        stepperProps: <StepperProps>{
          type: StepperTypeTokens.HORIZONTAL,
          data: stepper,
        },
        action: {
          type: ACTION.GO_BACK,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      space1: <SpaceProps>{ size: SizeTypeTokens.XXXL },
      titleStack: <StackProps>{
        width: StackWidth.FULL,
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.spaceBetween,
        widgetItems: [
          { id: "bank_select", type: WIDGET.TEXT },
          { id: "addAccountStack", type: WIDGET.STACK },
        ],
      },
      addAccountStack: <StackProps>{
        type: StackType.row,
        alignItems: StackAlignItems.center,
        justifyContent: StackJustifyContent.flexStart,
        widgetItems: [
          { id: "icon", type: WIDGET.ICON },
          { id: "iconSpace", type: WIDGET.SPACE },
          { id: "addUser", type: WIDGET.TEXT },
        ],
        action: {
          type: ACTION.GO_ADD_ACCOUNT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      titleSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      bank_select: <TypographyProps>{
        label: "Select a bank account",
        fontSize: FontSizeTokens.SM,
        color: ColorTokens.Grey_Night,
        fontWeight: "600",
      },
      icon: <IconProps>{
        name: IconTokens.Add,
        size: IconSizeTokens.XL,
      },
      iconSpace: <SpaceProps>{ size: SizeTypeTokens.MD },
      addUser: <TypographyProps>{
        label: "Add account",
        color: ColorTokens.Primary_100,
        fontSize: FontSizeTokens.SM,
        fontWeight: "600",
      },
      add_account: <ButtonProps & WidgetProps>{
        label: "Add account",
        type: ButtonTypeTokens.LargeGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon: {
          name: IconTokens.Add,
          size: IconSizeTokens.XL,
          align: IconAlignmentTokens.left,
        },
        action: {
          type: ACTION.GO_ADD_ACCOUNT,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: {},
        },
      },
      ...ds,
      spaceContinue: <SpaceProps>{ size: SizeTypeTokens.XXXXXXL },
      continue: <ButtonProps & WidgetProps>{
        label: "Continue",
        type: ButtonTypeTokens.LargeOutline,
        width: ButtonWidthTypeToken.FULL,
        action: {
          type: ACTION.TRIGGER_CTA,
          routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
          payload: <BAVVerifyActionPayload>{
            applicationId: "",
          },
        },
      },
    },
  };
};

export const bankVerifyMF: PageType<any> = {
  onLoad: async () => {
    const response = await fetchBankRepo();
    const banks = response.stepResponseObject;
    const stepper: StepperItem[] = await stepperRepo();
    const templateX = await template(banks, stepper);

    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TOGGLE_SELECT]: ToggleSelectAction,
    [ACTION.TRIGGER_CTA]: BavVerifyAction,
    [ACTION.GO_ADD_ACCOUNT]: AddAccountNavAction,
    [ACTION.GO_BACK]: GoBackAction,
    [ACTION.GO_NEXT]: GoNext,
  },
};
