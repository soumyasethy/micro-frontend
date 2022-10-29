import { ActionFunction } from "@voltmoney/types";
import { BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
} from "@voltmoney/schema";
import { postBankRepo } from "./repo";
import { ROUTE } from "../../../routes";

let selectedWidget = undefined;
let ifscCode = undefined;
let bankAccountNumber = undefined;

export const ToggleSelectAction: ActionFunction<ToggleActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  ///unselected if any selected
  if (selectedWidget) {
    await setDatastore(action.routeId, selectedWidget, <SelectiveListItemProps>{
      state: SelectiveListItemStateTokens.NOT_SELECTED,
    });
    selectedWidget = undefined;
    ifscCode = undefined;
    bankAccountNumber = undefined;
  }
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    SelectiveListItemProps
  >{ state: SelectiveListItemStateTokens.SELECTED });
  selectedWidget = action.payload.targetWidgetId;

  await setDatastore(action.routeId, "continue", <ButtonProps>{
    type: ButtonTypeTokens.LargeFilled,
  });
  selectedWidget = action.payload.targetWidgetId;
  ifscCode = action.payload.bankIfscCode;
  bankAccountNumber = action.payload.bankAccountNumber;
};

export const BavVerifyAction: ActionFunction<BAVVerifyActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await postBankRepo(
    action.payload.applicationId,
    bankAccountNumber,
    ifscCode
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  console.warn("bavVerifyAction-->", response);
};
export const AddAccountNavAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  navigate(ROUTE.BANK_ACCOUNT_ADD);
};
