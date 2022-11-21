import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../../routes";
import { AmountPayload, CreateDisbursementRequestPayload } from "./types";
import { api } from "../../../../configs/api";
import { getAppHeader } from "../../../../configs/config";
import SharedPropsService from "../../../../SharedPropsService";
import {
  ColorTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  MessageProps,
  TextInputProps,
} from "@voltmoney/schema";
import { User } from "../../../login/otp_verify/types";

let disbursalAmount: number = 0;
export const CreateDisbursementRequest: ActionFunction<
  CreateDisbursementRequestPayload
> = async (
  action,
  _datastore,
  { network, navigate, setDatastore, asyncStorage }
): Promise<any> => {
  if (disbursalAmount > 0) {
    await network
      .post(
        api.lmsDisbursal,
        {
          creditId: (
            await SharedPropsService.getUser()
          ).linkedCredits[0].creditId,
          disbursalAmount: disbursalAmount,
        },
        { headers: await getAppHeader() }
      )
      .then(async (response) => {
        console.log(
          "CreateDisbursementRequest->",
          JSON.stringify(response.data)
        );
        await navigate(ROUTE.WITHDRAWAL_OTP, { disbursalAmount });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};

export const goBack: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
export const OnAmountChange: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  disbursalAmount = parseFloat(action.payload.value);
  const currentApplicableInterestRate = (await SharedPropsService.getUser())
    .linkedCredits[0].currentApplicableInterestRate;
  const monthlyInterest =
    Math.round(
      ((disbursalAmount * currentApplicableInterestRate) / 1200) * 100
    ) / 100;
  await setDatastore(ROUTE.WITHDRAW_AMOUNT, "interestItem", <TextInputProps>{
    value: `${monthlyInterest || 0}`.replace(
      /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
      ","
    ),
  });
  const user: User = await SharedPropsService.getUser();
  const actualLoanAmount = user.linkedCredits[0].actualLoanAmount;
  const availableCreditAmount = user.linkedCredits[0].availableCreditAmount;
  const alreadyWithdrawAmount = actualLoanAmount - availableCreditAmount;
  const recommendedAmount = 0.9 * actualLoanAmount;
  const currentRecommendedAmount = recommendedAmount - alreadyWithdrawAmount;
  if (disbursalAmount > currentRecommendedAmount) {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountMessage", <MessageProps>{
      label: "Recommended to use 90% of the limit",
      actionText: "Confirm",
      icon: <IconProps>{
        name: IconTokens.Info,
        size: IconSizeTokens.SM,
        color: ColorTokens.Grey_Charcoal,
      },
      labelColor: ColorTokens.Grey_Charcoal,
      bgColor: ColorTokens.Grey_Milk_1,
    });
  } else {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountMessage", null);
  }
};
