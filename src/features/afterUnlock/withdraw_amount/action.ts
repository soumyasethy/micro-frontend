import { ActionFunction, WidgetProps } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  ACTION,
  AmountPayload,
  CreateDisbursementRequestPayload,
} from "./types";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import {
  ButtonProps,
  ButtonTypeTokens,
  ColorTokens,
  IconProps,
  IconSizeTokens,
  IconTokens,
  MessageProps,
  SizeTypeTokens,
  SpaceProps,
  TextInputProps,
  TypographyProps,
  WIDGET,
} from "@voltmoney/schema";
import { User } from "../../login/otp_verify/types";

let disbursalAmount: number = 0;
export const CreateDisbursementRequest: ActionFunction<
  CreateDisbursementRequestPayload
> = async (
  action,
  _datastore,
  { network, navigate, setDatastore, showPopup }
): Promise<any> => {
  if (disbursalAmount > 4999) {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "continue", <ButtonProps>{
      loading: true,
    });
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
        await navigate(ROUTE.WITHDRAWAL_OTP, {
          disbursalAmount,
          accountNumber: action.payload.accountNumber,
        });
      });
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "continue", <ButtonProps>{
      loading: false,
    });
  } else {
    await showPopup({
      title: "Withdrawal amount must be more than ₹5,000",
      type: "DEFAULT",
      iconName: IconTokens.Alert,
      ctaLabel: "OK",
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
export const SetRecommendedAmount: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { setDatastore, removeWidgets }
): Promise<any> => {
  await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountItem", <TextInputProps>{
    value: action.payload.value,
  });

  await setDatastore(ROUTE.WITHDRAW_AMOUNT, "continue", <ButtonProps>{
    type: ButtonTypeTokens.LargeFilled,
  });

  await removeWidgets(ROUTE.WITHDRAW_AMOUNT, [
    { id: "amountMessage", type: WIDGET.MESSAGE },
    { id: "amountSpace", type: WIDGET.SPACE },
  ]);
};

export const priceInWords = (price) => {
  var sglDigit = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ],
    dblDigit = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ],
    tensPlace = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ],
    handle_tens = function (dgt, prevDgt) {
      return 0 == dgt
        ? ""
        : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt]);
    },
    handle_utlc = function (dgt, nxtDgt, denom) {
      return (
        (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") +
        (0 != nxtDgt || dgt > 0 ? " " + denom : "")
      );
    };

  var str = "",
    digitIdx = 0,
    digit = 0,
    nxtDigit = 0,
    words = [];
  if (((price += ""), isNaN(parseInt(price)))) str = "";
  else if (parseInt(price) > 0 && price.length <= 10) {
    for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--)
      switch (
        ((digit = price[digitIdx] - 0),
        (nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0),
        price.length - digitIdx - 1)
      ) {
        case 0:
          words.push(handle_utlc(digit, nxtDigit, ""));
          break;
        case 1:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 2:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " Hundred" +
                  (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2]
                    ? " and"
                    : "")
              : ""
          );
          break;
        case 3:
          words.push(handle_utlc(digit, nxtDigit, "Thousand"));
          break;
        case 4:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 5:
          words.push(handle_utlc(digit, nxtDigit, "Lakh"));
          break;
        case 6:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 7:
          words.push(handle_utlc(digit, nxtDigit, "Crore"));
          break;
        case 8:
          words.push(handle_tens(digit, price[digitIdx + 1]));
          break;
        case 9:
          words.push(
            0 != digit
              ? " " +
                  sglDigit[digit] +
                  " Hundred" +
                  (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2]
                    ? " and"
                    : " Crore")
              : ""
          );
      }
    str = words.reverse().join("");
  } else str = "";
  return str ? "Rupees" + str : str;
};
export const OnAmountChange: ActionFunction<AmountPayload> = async (
  action,
  _datastore,
  { setDatastore, appendWidgets, removeWidgets }
): Promise<any> => {
  disbursalAmount = parseFloat(action.payload.value);

  const user: User = await SharedPropsService.getUser();
  const availableCreditAmount = user.linkedCredits[0].availableCreditAmount;
  const recommendedAmount = 0.9 * availableCreditAmount;

  await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountItem", <TextInputProps>{
    valueInText: priceInWords(action.payload.value),
  });

  if (
    action.payload.value.length > 0 &&
    parseFloat(action.payload.value) < availableCreditAmount
  ) {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeFilled,
    });
  } else {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "continue", <ButtonProps>{
      type: ButtonTypeTokens.LargeOutline,
    });
  }

  const currentApplicableInterestRate = (await SharedPropsService.getUser())
    .linkedCredits[0].currentApplicableInterestRate;
  const monthlyInterest =
    Math.round(
      ((disbursalAmount * currentApplicableInterestRate) / 1200) * 100
    ) / 100;
  await setDatastore(ROUTE.WITHDRAW_AMOUNT, "interestItem", <TextInputProps>{
    value: `${monthlyInterest || 0}`,
  });
  if (disbursalAmount > recommendedAmount) {
    await appendWidgets(
      ROUTE.WITHDRAW_AMOUNT,
      {
        amountMessage: <TypographyProps>{
          label: `Amount available for withdrawal is Rs ${availableCreditAmount}. Enter a lower amount`,
          color: ColorTokens.Red_50,
        },
        amountSpace: <SpaceProps>{ size: SizeTypeTokens.XL },
      },
      [
        { id: "amountMessage", type: WIDGET.TEXT, padding: {top:40} },
        { id: "amountSpace", type: WIDGET.SPACE },
      ],
      "amountMsgSpace"
    );
  } else {
    await setDatastore(ROUTE.WITHDRAW_AMOUNT, "amountMessage", null);
    await removeWidgets(ROUTE.WITHDRAW_AMOUNT, [
      { id: "amountMessage", type: WIDGET.MESSAGE },
      { id: "amountSpace", type: WIDGET.SPACE },
    ]);
  }
};
