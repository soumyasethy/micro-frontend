import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { TypographyProps } from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";
import SharedPropsService from "../../../SharedPropsService";

let value = "";

export const OnChangeSlider: ActionFunction<any> = (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  value = action.payload.value;
  setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", <TypographyProps>{
    label: `${addCommasToNumber(parseInt(value))}`,
  });
  SharedPropsService.setCreditLimit(parseInt(value));
  setDatastore(ROUTE.SET_CREDIT_LIMIT, "slider", <TypographyProps>{
    value: SharedPropsService.getCreditLimit(),
  });
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO)
};

export const goConfirmPledge: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  await navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
};

export const goToEditPortFolio: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = action.payload.updateAvailableCASMap;
  await navigate(ROUTE.PORTFOLIO, {
    stepResponseObject,
    updateAvailableCASMap,
  });
};

export const editSliderAmount: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, ...props }
): Promise<any> => {
  await navigate(ROUTE.UPDATE_SLIDER_AMOUNT, {
    maxAmount: action.payload.maxAmount,
    stepResponseObject: action.payload.stepResponseObject,
    updateAvailableCASMap: action.payload.updateAvailableCASMap,
  });
};
