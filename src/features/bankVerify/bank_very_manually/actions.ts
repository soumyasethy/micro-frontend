import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  StepperStateToken,
} from "@voltmoney/schema";
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
import { User } from "../../login/otp_verify/types";

let bankAccountNumber = "";
let bankIfsc = "";

export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.BANK_BRANCH_SEARCH, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
  });
};
export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  bankAccountNumber = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};
export const onChangeIFSCNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  console.warn("onChangeIFSCNumber auto triggered", action);
  bankIfsc = action.payload.value;
  await ToggleCTA(action, _datastore, props);
};

export const ToggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn(
    "bankAccountNumber->",
    bankAccountNumber,
    " bankIfsc->",
    bankIfsc
  );
  if (bankAccountNumber && bankIfsc) {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
  } else {
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeOutline,
    });
  }
};

export const BavVerifyManualAction: ActionFunction<
  BAVVerifyActionPayload
> = async (
  action,
  _datastore,
  { setDatastore, network, showPopup }
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

  if (_.get(response, "data.updatedApplicationObj.currentStepId")) {
    const user: User = await SharedPropsService.getUser();
    user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION =
      StepperStateToken.COMPLETED;
    await SharedPropsService.setUser(user);

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
