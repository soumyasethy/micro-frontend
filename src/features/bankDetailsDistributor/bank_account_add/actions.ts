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



export const savebankDetails: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { network, setDatastore, navigate }
): Promise<any> => {
  if (bankName &&
    bankIfsc &&
    bankAccountNumber && confirmAccountNumber) {

    await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: true });

    const applicationId = await SharedPropsService.getApplicationId()


  await network
  .post(
    `${partnerApi.bavAdd}`,
    {
      applicationId: applicationId,
      bankAccountNumber: bankAccountNumber,
      bankIfscCode: bankIfsc,
      confirmedBankAccountNumber:confirmAccountNumber
    },
    { headers: await getAppHeader() }
  )
  .then(async (response) => {
    // await setDatastore(action.routeId, "continue", <ButtonProps>{
    //   label: "Continue",
    //   type: ButtonTypeTokens.LargeFilled,
    //   loading: false,
    // });
    // if (response?.data.stepResponseObject?.fullName) {
      // await setDatastore(action.routeId, "input", <TextInputProps>{
      //   state: InputStateToken.SUCCESS,
      // });
      // const currentStepId = await response?.data.updatedApplicationObj
      //   .currentStepId;
      // (
      //   await SharedPropsService.getUser()
      // ).linkedApplications[0].currentStepId = currentStepId;

      await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
   // }
  })
  .catch(async (error) => {
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      label: "Continue",
      type: ButtonTypeTokens.LargeOutline,
      loading: false,
    });
    // await setDatastore(action.routeId, "input", <TextInputProps>{
    //   state: InputStateToken.ERROR,
    // });
  });


    // const response = await network.post(
    //   `${partnerApi.customer}${accountId}${'/customer'}`,
    //   {
    //     email: email,
    //     panNumber: panNumber,
    //     phoneNumber: `+91${mobileNumber}`,
    //     dob:dob
    //   },
    //   { headers: await getAppHeader() }
    // );
    // console.log(response)


    // setTimeout(async () => {
    //   await setDatastore(action.routeId, "continue", <ButtonProps>{ loading: false });
    // }, 2000);

    // await navigate(ROUTE.PAN_CONFIRM_NAME, {
    //   name: response?.data.stepResponseObject?.fullName,
    //   panNumber: response?.data.stepResponseObject?.panNumber,
    //   targetRoute: action.payload.targetRoute,
    // });

  }
};


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

export const textOnChange: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { setDatastore,...props }
): Promise<any> => {
  bankAccountNumber = action.payload.value;
  await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
  
    charLimit:action.payload.value.length-1
  });
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
