import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { DisbursementOTPPayload } from "./types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";

export const DisbursalVerifyAction: ActionFunction<
  DisbursementOTPPayload
> = async (action, _datastore, { navigate, network }): Promise<any> => {
  if (`${action.payload.value}`.length > 3) {
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
      await navigate(ROUTE.WITHDRAWAL_SUCCESS, {
        disbursalAmount: action.payload.disbursalAmount,
        accountNumber: action.payload.accountNumber,
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
