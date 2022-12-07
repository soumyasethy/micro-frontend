import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { DisbursementOTPPayload } from "./types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";

export const DisbursalVerifyAction: ActionFunction<
  DisbursementOTPPayload
> = async (
  action,
  _datastore,
  { navigate, network, setDatastore }
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
      { headers: await getAppHeader() }
    );
    if (response.status === 200) {
      await setDatastore(ROUTE.WITHDRAWAL_OTP, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
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
  { goBack }
): Promise<any> => {
  goBack();
};
