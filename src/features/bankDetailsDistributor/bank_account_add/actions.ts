import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  StepperStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import {
  ACTION as ACTION_CURRENT,
  BAVVerifyActionPayload
} from './types';
import {
  ACTION,
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { StepStatusMap, User } from "../../login/otp_verify/types";
import {
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../../configs/utils";
import { EnableDisableCTA } from "../../login/phone_number/types";

let bankAccountNumber = "";
let bankName = "";
let confirmAccountNumber = "";
let bankIfsc = "";

export const onChangeBankDetailse: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  bankName = action.payload.value;
  if (bankName) {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: true,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  } else {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: false,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  }
   
};


export const onChangeIfscDetails: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { ...props }
): Promise<any> => {
  bankIfsc = action.payload.value;
  if (bankIfsc) {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: true,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  } else {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: false,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  }
};


export const onConfirmAccountNumber: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { ...props }
): Promise<any> => {
  confirmAccountNumber = action.payload.value;
   if(confirmAccountNumber === bankAccountNumber){
    console.log("mateched")
   }else{
    console.log("not matched")
   }
  if (confirmAccountNumber) {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: true,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  } else {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: false,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  }
};

export const textOnChange: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { ...props }
): Promise<any> => {
  bankAccountNumber = action.payload.value;
  if (bankAccountNumber) {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: true,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  } else {
    await toggleCTA(
      {
        type: ACTION.ENABLE_CONTINUE,
        routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
        payload: <EnableDisableCTA>{
          value: false,
          targetWidgetId: "continue",
        },
      },
      {},
      props
    );
  }
};

export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    ButtonProps
  >{
    type:
      action.payload.value && bankName && bankAccountNumber && confirmAccountNumber && bankIfsc
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
  });
};

export const onChangeAccountNumber: ActionFunction<
  InputNumberActionPayload
> = async (action, _datastore, { ...props }): Promise<any> => {
  
  console.log(action.payload.value);

   
};


export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.DIST_BANK_SEARCH_BRANCH, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
    bankAccountNumber,
  });
};

export const NavigationSearchBankAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.DIST_BANK_SELECT, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
    bankAccountNumber,
  });
};




export const ToggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
 
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
 
};

export const skipBankVerification: ActionFunction<{}> = async (
  action,
  _datastore,
  { setDatastore, navigate}
): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
};
export const ChangeBankGoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const GoToStepper: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER);
};
