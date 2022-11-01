import { ActionFunction } from "@voltmoney/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { BAVVerifyActionPayload } from "../bank_verification/types";
import { postBankRepo } from "../bank_verification/repo";
import {
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";

let bankAccountNumber = "";
let bankIfsc = "";

export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  console.warn("**** NavigationSearchIFSCAction Triggered ****", action);
  await navigate(ROUTE.BANK_BRANCH_SEARCH, {
    bankCode: action.payload.bankCode,
  });
};
export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  console.warn("**** onChangeAccountNumber Action Triggered ****", action);
  bankAccountNumber = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};
export const onChangeIFSCNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  console.warn("**** onChangeIFSCNumber Action Triggered ****", action);
  bankIfsc = bankAccountNumber = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};

export const ToggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("**** ToggleCTA Action Triggered ****", action);
  if (bankAccountNumber && bankIfsc)
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
  else
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeOutline,
    });
};

export const BavVerifyManualAction: ActionFunction<
  BAVVerifyActionPayload
> = async (action, _datastore, { setDatastore }): Promise<any> => {
  console.warn("**** BavVerifyManualAction Action Triggered ****", action);
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await postBankRepo(
    (
      await SharedPropsService.getUser()
    ).linkedApplications[0].applicationId,
    bankAccountNumber,
    bankIfsc
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  console.warn("BavVerifyManualAction-->", response);
  console.warn(
    "currentStepId-->",
    response.updatedApplicationObj.currentStepId
  );
};
export const ChangeBankGoBackAction: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { goBack }): Promise<any> => {
  await goBack();
};
