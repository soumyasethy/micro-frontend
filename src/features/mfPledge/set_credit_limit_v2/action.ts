import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ListProps, TypographyProps } from "@voltmoney/schema";
import { addCommasToNumber } from "../../../configs/utils";
import SharedPropsService from "../../../SharedPropsService";
import sharedPropsService from "../../../SharedPropsService";
import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
} from "../unlock_limit/types";
import { getTotalLimit } from "../portfolio/actions";
import { AssetRepositoryType, ConfigTokens, ConfigValues } from "../../../configs/config";
import { listItemDataBuilder } from "./utils";
import { getDesiredValue } from "../portfolio_readonly/actions";
import { removeGetMorePortfolio } from "../unlock_limit_V2/actions";
import { GetMoreMfPortfolioPayload, pagePayload } from "./types";
let value = ConfigValues.MinimumAmountAllowed.toString();

export const goKfin: ActionFunction<pagePayload> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  console.log("action",action.payload);
  await navigate(ROUTE.PORTFOLIO_FROM_RTA,{
    pageType:action.payload.value
  });
};

export const goPortfolio: ActionFunction<pagePayload> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  console.log("action",action.payload);
  await navigate(ROUTE.SET_CREDIT_LIMIT);
};

export const getMoreMfPortfolio: ActionFunction<
  GetMoreMfPortfolioPayload
> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  /*** check if the user has pledged any mf portfolio */
console.log("action",action.payload);
  

  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < action.payload.casList.length; i++) {
    const item = action.payload.casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** Change page view type LAYOUT.LIST to LAYOUT.MODAL */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_BACK_ALLOWED,
    true
  );
  /*** switch between assetRepositoryType */
  const assetType = action.payload.value;
    if (assetType === AssetRepositoryType.KARVY) {
      await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
    } else if (assetType === AssetRepositoryType.CAMS) {

      await SharedPropsService.setAssetRepositoryType(
              AssetRepositoryType.KARVY
            );
  // for (const assetRepositoryType of Object.keys(assetRepoMap)) {
  //   if (assetRepositoryType === AssetRepositoryType.KARVY) {
  //     await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
  //   } else if (assetRepositoryType === AssetRepositoryType.CAMS) {
  //     await SharedPropsService.setAssetRepositoryType(
  //       AssetRepositoryType.KARVY
  //     );
  //   }
  // }
  }
  /*** disable pan edit option */
  await SharedPropsService.setConfig(ConfigTokens.IS_PAN_EDIT_ALLOWED, false);
  /*** Enable auto otp trigger when user lands on MF_Fetch */
  await SharedPropsService.setConfig(
    ConfigTokens.IS_MF_FETCH_AUTO_TRIGGER_OTP,
    true
  );
  /*** Go to re-fetch portfolio from other Asset Type **/
  await navigate(ROUTE.MF_FETCH_PORTFOLIO);
  /*** remove fetch more asset type option from UI */
  // await removeGetMorePortfolio(
  //   {
  //     type: ACTION.REMOVE_GET_MORE_MF_PORTFOLIO,
  //     routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
  //     payload: {},
  //   },
  //   {},
  //   { navigate, ...props }
  // );
};

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

export const OnChangeSlider: ActionFunction<any> = async (
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
  const updatedListProps = await listItemDataBuilder(stepResponseObject);
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "listItem", <ListProps>{
    data: updatedListProps,
  });
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "amount", <TypographyProps>{
    label: `${addCommasToNumber(parseInt(value))}`,
  });
  await SharedPropsService.setCreditLimit(parseInt(value));
  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "slider", <TypographyProps>{
    value: SharedPropsService.getCreditLimit(),
  });

  const portValue = getDesiredValue(
    stepResponseObject.availableCAS,
    stepResponseObject.isinNAVMap
  );

  await SharedPropsService.setDesiredPortfolio(portValue);

  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "bottomStackText", <
    TypographyProps
  >{
    label: `₹${addCommasToNumber(portValue)} out of ₹${addCommasToNumber(
      parseInt(stepResponseObject["totalPortfolioAmount"].toString())
    )} are selected for pledging.`,
  });

  await setDatastore(ROUTE.SET_CREDIT_LIMIT, "bottomSheetText2", <
    TypographyProps
  >{
    label: `₹${addCommasToNumber(portValue)} out of ₹${addCommasToNumber(
      parseInt(
        action.payload.stepResponseObject["totalPortfolioAmount"].toString()
      )
    )} are selected for pledging.`,
  });
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  console.log("here now");
  await navigate(ROUTE.MF_PLEDGE_PORTFOLIO);
};

// changed here
export const goConfirmPledge: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = await sharedPropsService.getAvailableCASMap();
  /*
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
   */
  await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  await navigate(ROUTE.PLEDGE_CONFIRMATION, { stepResponseObject });
};

export const goToEditPortFolio: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
) => {
  const stepResponseObject = action.payload.stepResponseObject;
  const updateAvailableCASMap = await sharedPropsService.getAvailableCASMap();
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
  const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
  await navigate(ROUTE.UPDATE_SLIDER_AMOUNT, {
    maxAmount: action.payload.maxAmount,
    stepResponseObject: action.payload.stepResponseObject,
    updateAvailableCASMap: updateAvailableCASMap,
  });
};
