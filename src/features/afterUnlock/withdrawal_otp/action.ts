import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { DisbursementOTPPayload } from "./types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import _ from "lodash";

export const CreateDisbursementRequest: ActionFunction<
DisbursementOTPPayload
> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  
  const resendOtpResponse = await network.post(
    api.lmsDisbursal,
    {
      creditId: (
        await SharedPropsService.getUser()
      ).linkedCredits[0].creditId,
      disbursalAmount: action.payload.disbursalAmount,
    },
    { headers: await getAppHeader() }
  );
  if (_.get(resendOtpResponse, "data.status") === "SUCCESS") {
    await setDatastore(ROUTE.WITHDRAWAL_OTP, "input", <TextInputProps>{
      state: InputStateToken.DEFAULT,
    });
  }
};

export const DisbursalVerifyAction: ActionFunction<
  DisbursementOTPPayload
> = async (
  action,
  _datastore,
  { navigate, network, setDatastore, goBack }
): Promise<any> => {
  if (`${action.payload.value}`.length > 3) {
    await setDatastore(ROUTE.WITHDRAWAL_OTP, "input", <TextInputProps>{
      state: InputStateToken.LOADING,
    });
    const response = await network.post(
      api.lmsDisbursalVerify,
      {
        otp: action.payload.value,
        phoneNo: (
          await SharedPropsService.getUser()
        ).linkedBorrowerAccounts[0].accountHolderPhoneNumber,
      },
      { headers: await getAppHeader() },
      async () => {
        await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountItem", <TextInputProps>{
          state: InputStateToken.DEFAULT,
          value: '0',
        });

      }
    );
    if (response.status === 200) {
      await setDatastore(ROUTE.WITHDRAWAL_OTP, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
      goBack()
      goBack()
      await navigate(ROUTE.WITHDRAWAL_SUCCESS, {
        disbursalAmount: action.payload.disbursalAmount,
        accountNumber: action.payload.accountNumber,
      });
    } else {
      await setDatastore(ROUTE.WITHDRAWAL_OTP, "input", <TextInputProps>{
        state: InputStateToken.ERROR,
      });
    }
  }
};

export const goBack: ActionFunction<DisbursementOTPPayload> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountItem", <TextInputProps>{
      state: InputStateToken.DEFAULT,
      value: '0',
    });
    await goBack();
};
