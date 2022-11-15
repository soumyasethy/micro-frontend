import { ActionFunction } from "@voltmoney/types";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import {
  ACTION as ACTION_CURRENT,
  BAVVerifyActionPayload,
} from "../bank_verify/types";
import {
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

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
  bankIfsc = action.payload.value;
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
> = async (
  action,
  _datastore,
  { setDatastore, network, showPopup, goBack }
): Promise<any> => {
  // await showPopup({
  //   title: "Depositing Rs 1",
  //   subTitle: "We’re doing this to verify your account.",
  //   type: "LOADING",
  // });
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });

  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  const response = await network.post(
    api.bavVerify,
    {
      applicationId,
      bankAccountDetails: {
        bankAccountNumber,
        bankIfscCode: bankIfsc,
      },
    },
    { headers: await getAppHeader() }
  );

  if (
    _.get(
      response,
      "data.updatedApplicationObj.currentStepId",
      "NOT_COMPLETED"
    ) === null
  ) {
    await showPopup({
      type: "SUCCESS",
      title: "Account verified successfully!",
      subTitle: "You will be redirected to next step in few seconds",
      ctaLabel: "Continue",
      ctaAction: {
        type: ACTION_CURRENT.GO_NEXT,
        routeId: ROUTE.BANK_ACCOUNT_VERIFICATION,
        payload: {
          currentStepId: _.get(
            response,
            "data.updatedApplicationObj.currentStepId"
          ),
        },
      },
    });
  }
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
};
export const ChangeBankGoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
