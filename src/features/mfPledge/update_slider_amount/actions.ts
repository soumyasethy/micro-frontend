import { ActionFunction } from "@voltmoney/types";
import { UpdateMobileNumber } from "./types";
import { ContinuePayload } from "../../login/phone_number/types";
import { User } from "../../login/otp_verify/types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import {ButtonProps, ButtonTypeTokens, TextInputProps} from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";
import {AvailableCASItem, IsinLTVMap, IsinNAVMap} from "../unlock_limit/types";
import {getTotalLimit} from "../portfolio/actions";
import { ConfigValues } from "../../../configs/config";

let editedAmount = ConfigValues.MinimumAmountAllowed.toString();

const getUpdateAvailableCAS = (
    amountRequired: number,
    availableCAS: AvailableCASItem[],
    isinNavMap: IsinNAVMap,
    isinLTVMap: IsinLTVMap
) => {
    const updateAvailableCAS = [];
    for (let i = 0; i < availableCAS.length; i++) {
        let item: AvailableCASItem = availableCAS[i];
        let individualAmount = getTotalLimit([item], isinNavMap, isinLTVMap);
        if (amountRequired >= individualAmount) {
            updateAvailableCAS.push(item);
            amountRequired = amountRequired - individualAmount;
        } else {
            let ratio = amountRequired / individualAmount;
            let newItem = {
                ...item,
                pledgedUnits: Math.ceil(item.totalAvailableUnits * ratio * 100) / 100,
            };
            updateAvailableCAS.push(newItem);
            amountRequired = 0;
        }
    }

    if (amountRequired > 0) {
        /// throw error
        return [];
    }
    return updateAvailableCAS;
};

export const updateSliderAmount: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, goBack, ...props }
): Promise<any> => {
    const stepResponseObject = action.payload.stepResponseObject;
    const updateAvailableCASMap = {};

    if (parseInt(editedAmount) > 0) {
        stepResponseObject.availableCAS.forEach((item, index) => {
            stepResponseObject.availableCAS[index].pledgedUnits =
                item.totalAvailableUnits;
        });
        stepResponseObject.availableCAS = getUpdateAvailableCAS(
            parseInt(editedAmount),
            stepResponseObject.availableCAS,
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
        );
        stepResponseObject.availableCAS.map((item, index) => {
            let key = `${item.isinNo}-${item.folioNo}`;
            updateAvailableCASMap[key] = item;
        });
    } else {
        stepResponseObject.availableCAS.map((item, index) => {
            let key = `${item.isinNo}-${item.folioNo}`;
            item.pledgedUnits = item.totalAvailableUnits;
            updateAvailableCASMap[key] = item;
        });
    }
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    // updateAvailableCASMap ends here

    await SharedPropsService.setCreditLimit(parseInt(editedAmount))
  await navigate(ROUTE.SET_CREDIT_LIMIT, {
    maxAmount: action.payload.maxAmount,
    stepResponseObject: stepResponseObject,
    updateAvailableCASMap: updateAvailableCASMap,
  });
};

export const sliderAmountOnChange: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  editedAmount = action.payload.value;
  if(parseInt(editedAmount) >= 25000 && parseInt(editedAmount) <= action.payload.maxAmount) {
      //need to update the updateAvailableCASMap here

      await SharedPropsService.setCreditLimit(parseInt(editedAmount))
        await setDatastore(
            action.routeId,
            action.payload.targetWidgetId,
            <ButtonProps>{
                type: ButtonTypeTokens.LargeFilled,
            }
    );
  } else {
    await setDatastore(
        action.routeId,
        action.payload.targetWidgetId,
        <ButtonProps>{
          type: ButtonTypeTokens.LargeOutline,
        }
    );
  }
};

/*
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
*/
export const getEditAmountOnLoad: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    const editAmount = await SharedPropsService.getCreditLimit()
    await setDatastore(
        ROUTE.UPDATE_SLIDER_AMOUNT,
        "input",
        <TextInputProps> {
            value: `${editAmount}`
        }
    )
}