import { ActionFunction } from "@voltmoney/types";
import { UpdateMobileNumber } from "./types";
import { ContinuePayload } from "../../login/phone_number/types";
import { User } from "../../login/otp_verify/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { ButtonProps, ButtonTypeTokens } from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";

let editedAmount = "";
export const updateSliderAmount: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
  // if (!phoneNumber.includes("+91")) {
  //   phoneNumber = `+91${phoneNumber}`;
  // }
  // const user: User = await SharedPropsService.getUser();

  // user.linkedBorrowerAccounts[0].accountHolderPhoneNumber = phoneNumber;
  // await SharedPropsService.setUser(user);

  // await setDatastore(ROUTE.MF_FETCH_PORTFOLIO, action.payload.targetWidgetId, {
  //   subTitle: phoneNumber.substring(3),
  // });
  // await goBack();

  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", {
    label: `${addCommasToNumber(parseInt(editedAmount))}`,
  });

  navigate(ROUTE.SET_CREDIT_LIMIT, {
    maxAmount: action.payload.maxAmount,
    stepResponseObject: action.payload.stepResponseObject,
    updateAvailableCASMap: action.payload.updateAvailableCASMap,
  });
};

export const sliderAmountOnChange: ActionFunction<any> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  editedAmount = action.payload.value;
  console.log("phoneNumber", editedAmount);
};

export const toggleCTA: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.log("was toggle cta called?", editedAmount);
  await setDatastore(
    action.routeId,
    action.payload.targetWidgetId,
    <ButtonProps>{
      type:
      editedAmount >= action.payload.minAmount
        ? ButtonTypeTokens.LargeFilled
        : ButtonTypeTokens.LargeOutline,
    }
  );
};
