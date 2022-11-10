import { ActionFunction } from "@voltmoney/types";
import { BAVVerifyActionPayload, ToggleActionPayload } from "./types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  SelectiveListItemProps,
  SelectiveListItemStateTokens,
} from "@voltmoney/schema";
import { postBankRepo } from "./repo";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { AadharInitPayload } from "../../kyc/kyc_init/types";
import { showBottomSheet } from "../../../configs/utils";

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
  { setDatastore, navigate }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await postBankRepo(
    (
      await SharedPropsService.getUser()
    ).linkedApplications[0].applicationId,
    bankAccountNumber,
    ifscCode
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  console.warn("bavVerifyAction-->", response);
  if (response.hasOwnProperty("message")) {
    const route = showBottomSheet({
      // title: result.statusCode,
      message: response.message,
      primary: true,
      iconName: IconTokens.Error,
    });
    await navigate(route.routeId, route.params);
  }
};
export const AddAccountNavAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  navigate(ROUTE.BANK_VERIFY_MANUALLY);
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};