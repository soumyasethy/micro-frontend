import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { TypographyProps } from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";

let value = "";

export const OnChangeSlider: ActionFunction<any> = (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  value = action.payload.value;
  setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", <TypographyProps>{
    label: `₹${addCommasToNumber(parseInt(value))}`,
  });
};

export const goBack: ActionFunction<any> = (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  goBack();
  setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", <TypographyProps>{
    label: `₹${addCommasToNumber(1000)}`,
  });
};

export const goConfirmPledge: ActionFunction<any> = (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  navigate(ROUTE.PLEDGE_CONFIRMATION);
};

export const goToEditPortFolio: ActionFunction<any> = async(
    action,
    _datastore,
    { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject
  const updateAvailableCASMap = action.payload.updateAvailableCASMap
  await navigate(ROUTE.PORTFOLIO, { stepResponseObject, updateAvailableCASMap });
};
