import {
  ActionFunction,
  Datastore,
  WidgetItem,
  WidgetProps,
} from "@voltmoney/types";
import { ACTION, IFSCCodePayload, IFSCSearchActionPayload } from "./types";
import { ROUTE } from "../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontSizeTokens,
  InputStateToken,
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
import { IFSCSearchActionRepo } from "./repo";
import { bankCodeX } from "./index";
import SharedPropsService from "../../../SharedPropsService";

let widgetItems: WidgetItem[] = [];

export const clearAction: ActionFunction<IFSCCodePayload> = async (
  action,
  _datastore,
  { removeWidgets }
): Promise<any> => {
  await removeWidgets(ROUTE.DIST_BANK_SEARCH_BRANCH, widgetItems);
};
export const GoBackAction: ActionFunction<IFSCCodePayload> = async (
  action,
  _datastore,
  { removeWidgets, goBack }
): Promise<any> => {
  await removeWidgets(ROUTE.DIST_BANK_SEARCH_BRANCH, widgetItems);
  await goBack();
};
export const OnSelectIFSCAction: ActionFunction<IFSCCodePayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
  await goBack();
  await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "IFSCInput", <TextInputProps>{
    state: InputStateToken.DISABLED,
    value: action.payload.ifscCode,
  });
  const accountNumber = await SharedPropsService.getAccountNumber();
  if (accountNumber) {
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "accountInput", <TextInputProps>{
      value: accountNumber,
    });
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  }
};

const widgetItemDs = (
  index: number,
  ifscCode: string,
  address: string,
  bankAccountNumber?: string
) => {
  return {
    [`listItemStack${index}`]: <StackProps & WidgetProps>{
      type: StackType.column,
      alignItems: StackAlignItems.flexStart,
      justifyContent: StackJustifyContent.flexStart,
      widgetItems: [
        { id: `title${index}`, type: WIDGET.TEXT },
        { id: `titleSpace${index}`, type: WIDGET.SPACE },
        { id: `subTitle${index}`, type: WIDGET.TEXT },
        { id: `spaceEnd${index}`, type: WIDGET.SPACE },
        { id: `dividerEnd${index}`, type: WIDGET.DIVIDER },
      ],
      action: {
        type: ACTION.ON_SELECT_IFSC,
        routeId: ROUTE.DIST_BANK_SEARCH_BRANCH,
        payload: <IFSCCodePayload>{ ifscCode: ifscCode, bankAccountNumber },
      },
    },
    [`title${index}`]: <TypographyProps>{
      label: `${ifscCode}`,
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
      fontWeight: "700",
    },
    [`titleSpace${index}`]: <SpaceProps>{ size: SizeTypeTokens.MD },
    [`subTitle${index}`]: <TypographyProps>{
      label: `${address}`,
      color: ColorTokens.Grey_Night,
      fontSize: FontSizeTokens.SM,
    },
    [`spaceEnd${index}`]: <SpaceProps>{ size: SizeTypeTokens.XL },
    [`dividerEnd${index}`]: <DividerProps>{
      size: DividerSizeTokens.SM,
      color: ColorTokens.Grey_Milk_1,
    },
  };
};

export const IFSCSearchAction: ActionFunction<IFSCSearchActionPayload> = async (
  action,
  _datastore,
  { appendWidgets, removeWidgets }
): Promise<any> => {
  const bankCode = action.payload.bankCode || bankCodeX; //HDFC
  let searchLength: number = 3;

  if (action.payload.value.length < searchLength) return;

  if (widgetItems.length > 0)
    await removeWidgets(ROUTE.DIST_BANK_SEARCH_BRANCH, widgetItems);

  const response = await IFSCSearchActionRepo(bankCode, action.payload.value);

  const bankBranchArr = [];

  Object.keys(response).map((bankCode) => {
    bankBranchArr.push({ bankCode: response[bankCode] });
  });
  widgetItems = [];

  let dataStore: Datastore = {};
  bankBranchArr.map((bank, index) => {
    if (!bank.bankCode.IFSC && !bank.bankCode.ADDRESS) return;
    widgetItems.push({
      id: `listItemStack${index}`,
      type: WIDGET.STACK,
    });
    dataStore = {
      ...dataStore,
      ...widgetItemDs(
        index,
        bank.bankCode.IFSC,
        bank.bankCode.ADDRESS,
        action.payload.bankAccountNumber
      ),
    };
  });

  await appendWidgets(ROUTE.DIST_BANK_SEARCH_BRANCH, { ...dataStore }, [
    ...widgetItems,
  ]);
};
