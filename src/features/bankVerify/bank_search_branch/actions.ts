import {
  ActionFunction,
  Datastore,
  WidgetItem,
  WidgetProps,
} from "@voltmoney/types";
import { IFSCSearchActionPayload, IFSCCodePayload, ACTION } from "./types";
import { ROUTE } from "../../../routes";
import {
  ButtonProps,
  ButtonTypeTokens,
  ColorTokens,
  DividerProps,
  DividerSizeTokens,
  FontSizeTokens,
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

export const OnSelectIFSCAction: ActionFunction<IFSCCodePayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
  console.warn("**** OnSelectIFSCAction Action Triggered ****", action);
  await setDatastore(ROUTE.BANK_ACCOUNT_ADD_MANUALLY, "IFSCInput", <
    TextInputProps
  >{
    value: action.payload.ifscCode,
  });
  await setDatastore(ROUTE.BANK_ACCOUNT_ADD_MANUALLY, "continue", <ButtonProps>{
    type: ButtonTypeTokens.LargeFilled,
  });
  await goBack();
};

const widgetItemDs = (index: number, ifscCode: string, address: string) => {
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
        routeId: ROUTE.BANK_BRANCH_SEARCH,
        payload: <IFSCCodePayload>{ ifscCode: ifscCode },
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
  { appendWidgets }
): Promise<any> => {
  console.warn("**** IFSCSearchActionPayload Action Triggered ****", action);

  const bankCode = action.payload.bankCode || bankCodeX;
  if (bankCode.length < 3) return;
  const response = await IFSCSearchActionRepo(bankCode, action.payload.value);
  const bankBranchArr = [];
  Object.keys(response).map((bankCode) => {
    bankBranchArr.push({ bankCode: response[bankCode] });
  });

  const widgetItems: WidgetItem[] = [];
  let dataStore: Datastore = {};
  bankBranchArr.map((bank, index) => {
    if (!bank.bankCode.IFSC && !bank.bankCode.ADDRESS) return;
    widgetItems.push({
      id: `listItemStack${index}`,
      type: WIDGET.STACK,
    });
    dataStore = {
      ...dataStore,
      ...widgetItemDs(index, bank.bankCode.IFSC, bank.bankCode.ADDRESS),
    };
  });

  await appendWidgets(ROUTE.BANK_BRANCH_SEARCH, { ...dataStore }, [
    ...widgetItems,
  ]);
};
