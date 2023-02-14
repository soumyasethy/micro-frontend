import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import {
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
import { partnerApi } from "../../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../../configs/config";
import { EnableDisableCTA } from "../../login/phone_number/types";
import { BankData } from "../../login/otp_verify/types";
import { Share } from "react-native"
import { getScreenType } from "../../../configs/platfom-utils";
import { Dimensions } from "react-native";

let bankAccountNumber = "";
let bankName = "";
let confirmAccountNumber = "";
let bankIfsc = "";



export const savebankDetails: ActionFunction<EnableDisableCTA> = async (
  action,
  _datastore,
  { network, setDatastore, navigate, showPopup }
): Promise<any> => {
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
          confirmedBankAccountNumber: confirmAccountNumber
        },
        { headers: await getAppHeader() }
      )
      .then(async (response) => {
        if (response.status == 200) {
          let data1 = [];
          let stepper_data = [];
          Object.keys(response.data.partnerViewStepperMap).map(key => {
            const value = response.data.partnerViewStepperMap[key];
            const stepData: any = new Object();
            if (value.isEditable === true) {
              stepData.title = value.verticalDisplayName;
              stepData.subTitle = value.verticalDescription;
              stepData.id = value.order;
              stepData.horizontalTitle = value.horizontalDisplayName;
              stepData.status = value.status;
              data1.push(stepData);
            }
          })
          stepper_data = data1.sort(function (a, b) {
            return a.id - b.id;
          });
          await SharedPropsService.setStepperData(stepper_data);

          await SharedPropsService.setAccountId(response.data.updatedApplicationObj.accountId);
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




        }
      })
      .catch(async (error) => {
        console.log("error", error);
      });
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        label: "Save & Continue",
        type: ButtonTypeTokens.LargeFilled,
        loading: false,
      });
  }
};

export const onShare: ActionFunction<{}> =
  async (action, _datastore, { network, clipboard, setDatastore, ...props }): Promise<any> => {

    const applicationId = await SharedPropsService.getApplicationId();
    const Linkresponse = await network.get(
      `${partnerApi.referalLink}${applicationId}`,
      {
        headers: await getAppHeader(),
      }
    );
    const link = Linkresponse.data.link;
    const name = await SharedPropsService.getInvestorName();
    const screenType = getScreenType(Dimensions.get("window").width);
    if (
      screenType === SCREEN_SIZE.X_SMALL ||
      screenType === SCREEN_SIZE.SMALL
    ) {
      try {
        const result = await Share.share({
          message: `Hi\n\nUse Volt to open a credit line(OD) against mutual funds in 5 minutes with trusted lenders such as Bajaj Finance.\n\nInterest rates starting at 9%. Use this link to apply now.\n${link}\n\nRegards,\n${name}`,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      clipboard.set(link);
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
      const bank: BankData = await SharedPropsService.getBankData();
      bank.bankName = bankName;
      await SharedPropsService.setBankData(bank);
      break;
    }
    case "IFSCInput": {
      bankIfsc = action.payload.value;
      const bank: BankData = await SharedPropsService.getBankData();
      bank.bankIfsc = bankIfsc;
      await SharedPropsService.setBankData(bank);
      break;
    }
    case "accountInput": {
      bankAccountNumber = action.payload.value;
      const bank: BankData = await SharedPropsService.getBankData();
      bank.accountNumber = bankAccountNumber;
      await SharedPropsService.setBankData(bank);
      break;
    }
    case "confirmAccountInput": {
      let confirmAccountNumbers = action.payload.value;

      const bank: BankData = await SharedPropsService.getBankData();

      await SharedPropsService.setBankData(bank);
      const acc_regex = bankAccountNumber;
      await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
        regex: acc_regex
      });
      await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
        charLimit: bankAccountNumber.length
      });
      if (confirmAccountNumbers === bankAccountNumber) {
        await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
          state: InputStateToken.SUCCESS,
        });
        confirmAccountNumber = action.payload.value;
        bank.confirmAccountNumber = confirmAccountNumber;
      } else {
        await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
          state: InputStateToken.ERROR,
        });
        bank.confirmAccountNumber = "";
        confirmAccountNumber = "";
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
  { setDatastore, ...props }
): Promise<any> => {
  confirmAccountNumber = action.payload.value;
  if (confirmAccountNumber === bankAccountNumber) {
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
      state: InputStateToken.SUCCESS,
    });
  } else {
    await setDatastore(ROUTE.DIST_BANK_ACCOUNT_ADD, "confirmAccountInput", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
};

export const onChangeAccountNumber: ActionFunction<InputNumberActionPayload> = async (
  action,
  _datastore,
  { setDatastore, ...props }
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
      { setDatastore, ...props }
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
      { setDatastore, ...props }
    );
  }
};




export const NavigationSearchIFSCAction: ActionFunction<
  NavigationSearchIFSCActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
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
  { setDatastore, navigate }
): Promise<any> => {

  let filtered_stepper = [];
  let stepper_data = await SharedPropsService.getStepperData();
  stepper_data.forEach((item, index) => {
    if (item.horizontalTitle === "Bank Details") {
      item.status = "NOT_STARTED";
    }
    filtered_stepper.push(item);
  })

  await SharedPropsService.setStepperData(filtered_stepper);

  await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);

};
export const ChangeBankGoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
};
export const GoToStepper: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
};
