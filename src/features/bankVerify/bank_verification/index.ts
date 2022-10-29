import {
  Datastore,
  Layout,
  LAYOUTS,
  PageType,
  TemplateSchema,
  WidgetProps,
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
import { ROUTE } from "../../../routes";
import { ACTION, BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  AddAccountNavAction,
  BavVerifyAction,
  ToggleSelectAction,
} from "./actions";
import { fetchBankRepo } from "./repo";
import SharedPropsService from "../../../SharedPropsService";

export const template: (
  banks: { accountNumber: string; ifscCode: string; bankName: string }[]
) => Promise<TemplateSchema> = async (banks) => {
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
        { id: "space1", type: WIDGET.SPACE },
        { id: "titleStack", type: WIDGET.STACK },
        { id: "titleSpace", type: WIDGET.SPACE },
        ...buildUI(),
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
      add_account: <ButtonProps & WidgetProps>{
        label: "Add account",
        type: ButtonTypeTokens.LargeGhost,
        width: ButtonWidthTypeToken.CONTENT,
        icon: {
          name: IconTokens.AddUser,
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
            applicationId:
              SharedPropsService.getUser().linkedApplications[0].applicationId,
          },
        },
      },
    },
  };
};

export const bankVerifyMF: PageType<any> = {
  onLoad: async () => {
    const response = await fetchBankRepo();
    console.warn("response", response.stepResponseObject);
    const banks = response.stepResponseObject;
    console.warn("banks", response.stepResponseObject);
    const templateX = await template(banks);
    console.warn("templateX->", templateX);
    return Promise.resolve(templateX);
  },
  actions: {
    [ACTION.TOGGLE_SELECT]: ToggleSelectAction,
    [ACTION.TRIGGER_CTA]: BavVerifyAction,
    [ACTION.GO_ADD_ACCOUNT]: AddAccountNavAction,
  },
};
