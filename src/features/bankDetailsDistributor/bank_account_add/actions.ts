import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  InputStateToken,
  StepperStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import {
  ACTION as ACTION_CURRENT,
  BAVVerifyActionPayload,
  InputPayload
} from './types';
import {
  ACTION,
  InputNumberActionPayload,
  NavigationSearchIFSCActionPayload,
} from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import _ from "lodash";
import { api, partnerApi } from "../../../configs/api";
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
let acc ="";



export const savebankDetails: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { network, setDatastore, navigate,showPopup }
): Promise<any> => {
   console.log(confirmAccountNumber)
  if (bankName &&
    bankIfsc &&
    bankAccountNumber) {
    await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: true });

    const applicationId = await SharedPropsService.getApplicationId()


  await network
  .post(
    `${partnerApi.bavAdd}`,
    {
      applicationId: applicationId,
      bankAccountNumber: bankAccountNumber,
      bankIfscCode: bankIfsc,
      confirmedBankAccountNumber:bankAccountNumber
    },
    { headers: await getAppHeader() }
  )
  .then(async (response) => {
      await showPopup({
        autoTriggerTimerInMilliseconds: APP_CONFIG.AUTO_REDIRECT,
        isAutoTriggerCta: true,
        title: "Bank details saved succesfully",
        subTitle: "You will be redirected to next step in few seconds",
        type: "SUCCESS",
        ctaLabel: "Continue",
        primary: true,
        ctaAction: {
          type: ACTION.NEXT_ROUTE,
          routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
          payload: <{}>{
           
          },
        },
      });
  })
  .catch(async (error) => {
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeOutline,
      loading: false,
    });
  });
  }
};

export const goNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
};


export const toggleCTA: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.log("in toogle")
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    ButtonProps
  >{
    type:
       bankName && bankAccountNumber && confirmAccountNumber && bankIfsc
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
  });
};


export const btnAction: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.log("in btnAction")
    await setDatastore(action.routeId, action.payload.targetWidgetId, <
      ButtonProps
    >{
      type: ButtonTypeTokens.LargeFilled,
    });
 
};


export const onChangeInput: ActionFunction<InputPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  switch (action.payload.widgetId) {
    case "bankInput": {
      bankName = action.payload.value;
      break;
    }
    case "IFSCInput": {
      bankIfsc = action.payload.value;
      break;
    }
    case "accountInput": {
      bankAccountNumber = action.payload.value;
      break;
    }
    case "confirmAccountInput": {
      confirmAccountNumber = action.payload.value;
      await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
        charLimit:bankAccountNumber.length
      });
      if(confirmAccountNumber === bankAccountNumber){
        acc = confirmAccountNumber;
         await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
            state: InputStateToken.SUCCESS,
          });
       }else{
        acc = confirmAccountNumber;
        await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
          state: InputStateToken.ERROR,
        });
       }
      break;
    }
  }

  if (
    bankName &&
    bankIfsc &&
    bankAccountNumber &&
    confirmAccountNumber) {
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    })
  }
};


export const onChangeBankDetails: ActionFunction<
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
  { setDatastore,...props }
): Promise<any> => {
  confirmAccountNumber = action.payload.value;
  console.log("account number",bankAccountNumber)
  console.log("conf account number",confirmAccountNumber)
   if(confirmAccountNumber === bankAccountNumber){
    console.log("matched")
     await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
   }else{
    console.log("not matched")
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
   }
  // if (confirmAccountNumber) {
  //   await toggleCTA(
  //     {
  //       type: ACTION.ENABLE_CONTINUE,
  //       routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
  //       payload: <EnableDisableCTA>{
  //         value: true,
  //         targetWidgetId: "continue",
  //       },
  //     },
  //     {},
  //     props
  //   );
  // } else {
  //   await toggleCTA(
  //     {
  //       type: ACTION.ENABLE_CONTINUE,
  //       routeId: ROUTE.DIST_BANK_ACCOUNT_ADD,
  //       payload: <EnableDisableCTA>{
  //         value: false,
  //         targetWidgetId: "continue",
  //       },
  //     },
  //     {},
  //     props
  //   );
  // }
};

export const onChangeAccountNumber: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { setDatastore,...props }
): Promise<any> => {
  bankAccountNumber = action.payload.value;
  // await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
  
  //   charLimit:action.payload.value.length-1
  // });
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
      {setDatastore,...props}
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
      {setDatastore,...props}
    );
  }
};




export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  console.log(action.payload);
  await navigate(ROUTE.DIST_BANK_SEARCH_BRANCH, {
    bankCode: action.payload.bankCode,
    bankName: action.payload.bankName,
    bankAccountNumber,
    confirmAccountNumber
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
  { navigate,goBack }
): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
};
export const GoToStepper: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.KYC_STEPPER);
};
