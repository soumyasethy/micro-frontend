import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {ListProps, TypographyProps} from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";
import SharedPropsService from "../../../SharedPropsService";
import {AvailableCASItem, IsinLTVMap, IsinNAVMap} from "../unlock_limit/types";
import {getTotalLimit} from "../portfolio/actions";
import sharedPropsService from "../../../SharedPropsService";
import { ConfigValues } from "../../../configs/config";
import {listItemDataBuilder, portfolioListDatastoreBuilderSetCreditLimit} from "./utils";
import {ACTION} from "./types";

let value = ConfigValues.MinimumAmountAllowed.toString();

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

export const OnChangeSlider: ActionFunction<any> = async(
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  value = action.payload.value;
  /** On change of value update updateAvailableCASMap **/
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = await sharedPropsService.getAvailableCASMap();
  if (parseInt(value) > 0) {
    stepResponseObject.availableCAS.forEach((item, index) => {
      stepResponseObject.availableCAS[index].pledgedUnits =
          item.totalAvailableUnits;
    });
    stepResponseObject.availableCAS = getUpdateAvailableCAS(
        parseInt(value),
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
  /** **/
  const updatedListProps = await listItemDataBuilder(stepResponseObject)
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, 'listItem', <ListProps> {
    data: updatedListProps
  })
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", <TypographyProps>{
    label: `${addCommasToNumber(parseInt(value))}`,
  });
  await SharedPropsService.setCreditLimit(parseInt(value));
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "slider", <TypographyProps>{
    value: SharedPropsService.getCreditLimit(),
  });

  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "bottomStackText", <TypographyProps> {
      label: `₹${addCommasToNumber(parseInt(value))} out of ₹${addCommasToNumber(
          parseInt(stepResponseObject["totalPortfolioAmount"].toString())
      )} are selected for pledging.`
  })
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO)
};

// changed here
export const goConfirmPledge: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = await sharedPropsService.getAvailableCASMap();
  if (parseInt(value) > 0) {
    stepResponseObject.availableCAS.forEach((item, index) => {
      stepResponseObject.availableCAS[index].pledgedUnits =
          item.totalAvailableUnits;
    });
    stepResponseObject.availableCAS = getUpdateAvailableCAS(
        parseInt(value),
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
  await navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
};

export const goToEditPortFolio: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = await sharedPropsService.getAvailableCASMap()
  //const editAmount = await SharedPropsService.getCreditLimit()
  /*
  if (editAmount > 0) {
    stepResponseObject.availableCAS.forEach((item, index) => {
      stepResponseObject.availableCAS[index].pledgedUnits =
          item.totalAvailableUnits;
    });
    stepResponseObject.availableCAS = getUpdateAvailableCAS(
        editAmount,
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
   */
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
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
  const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap()
  await navigate(ROUTE.UPDATE_SLIDER_AMOUNT, {
    maxAmount: action.payload.maxAmount,
    stepResponseObject: action.payload.stepResponseObject,
    updateAvailableCASMap: updateAvailableCASMap,
  });
};
