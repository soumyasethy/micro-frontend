import {
    CtaCardProps,
    IconTokens,
    ListItemDataProps,
    ListProps,
    ListTypeTokens,
  } from "@voltmoney/schema";
  import {
    ACTION,
    CtaPayload,
    EditItemPayload,
    PortfolioTogglePayload,
  } from "./types";
  import { ROUTE } from "../../../routes";
  import { getActualLimit, getTotalLimit } from "./actions";
  import { StepResponseObject } from "../../unlockLimit/unlock_limit/types";
  import { Datastore, WidgetProps } from "@voltmoney/types";
  import SharedPropsService from "../../../SharedPropsService";
  import {
    addCommasToNumber,
    roundDownToNearestHundred,
  } from "../../../configs/utils";
  
  export const portfolioListDatastoreBuilder = async (
    stepResponseObject: StepResponseObject,
    searchKeyword: string = ""
  ): Promise<Datastore> => {
    const selectedMap = {};
    const listItemDataProps: ListItemDataProps[] = [];
    const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
  
    stepResponseObject.availableCAS.forEach((item, index) => {
      const key = `${item.isinNo}-${item.folioNo}`;
      selectedMap[index] = updateAvailableCASMap[key].pledgedUnits > 0;
      stepResponseObject.availableCAS[index] = updateAvailableCASMap[key];
  
      const title = `₹ ${addCommasToNumber(
        roundDownToNearestHundred(
          getTotalLimit(
            [updateAvailableCASMap[key]],
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
          )
        )
      )}`;
  
      const subTitle = `/ ₹ ${addCommasToNumber(
        roundDownToNearestHundred(
          getActualLimit(
            [updateAvailableCASMap[key]],
            stepResponseObject.isinNAVMap,
            stepResponseObject.isinLTVMap
          )
        )
      )}`;
  
      listItemDataProps.push({
        label: updateAvailableCASMap[key].schemeName,
        info: "",
        trailIcon: {
          name:
            updateAvailableCASMap[key].pledgedUnits > 0
              ? IconTokens.CheckedSquare
              : IconTokens.NotCheckedSquare,
        },
        trailTitle: title,
        trailSubTitle: subTitle,
        action: "edit",
        trailIconAction: {
          type: ACTION.EDIT_ITEM,
          routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
          payload: <EditItemPayload>{
            stepResponseObject,
            selectedMap: selectedMap,
          },
        },
      });
    });
  
    const props = <ListProps & WidgetProps>{
      type: ListTypeTokens.CHECKLIST,
      data: [
        ...listItemDataProps.filter((item) =>
          JSON.stringify(item.label.toUpperCase()).includes(
            searchKeyword.toUpperCase()
          )
        ),
      ],
      selectedMap: { ...selectedMap },
      action: {
        type: ACTION.TOGGLE_ITEM,
        routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
        payload: <PortfolioTogglePayload>{
          stepResponseObject,
          selectedMap,
        },
      },
    };
  
    const datastoreObj: Datastore = {
      listItem: <ListProps & WidgetProps>props,
      totalItem: <CtaCardProps>{
        label: "Total credit limit",
        info: addCommasToNumber(
          roundDownToNearestHundred(
            getTotalLimit(
              stepResponseObject.availableCAS,
              stepResponseObject.isinNAVMap,
              stepResponseObject.isinLTVMap
            )
          )
        ),
        actionLabel: "Confirm & share link",
        action: {
          type: ACTION.PORTFOLIO,
          payload: <CtaPayload>{ value: stepResponseObject },
          routeId: ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO,
        },
      },
    };
    return datastoreObj;
  };
  
  export const togglePortfolio = async (
    index: number,
    isPledged: boolean,
    stepResponseObject: StepResponseObject
  ) => {
    const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
    const item = stepResponseObject.availableCAS[index];
    const key = `${item.isinNo}-${item.folioNo}`;
    updateAvailableCASMap[key].pledgedUnits = isPledged
      ? updateAvailableCASMap[key].totalAvailableUnits
      : 0;
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
    return updateAvailableCASMap;
  };
  
  export const customEditPortfolio = async (
    index: number,
    amount: number,
    stepResponseObject: StepResponseObject
  ) => {
    const updateAvailableCASMap = await SharedPropsService.getAvailableCASMap();
    const item = stepResponseObject.availableCAS[index];
    const key = `${item.isinNo}-${item.folioNo}`;
  
    updateAvailableCASMap[key].pledgedUnits =
      amount /
      (stepResponseObject.isinNAVMap[updateAvailableCASMap[key].isinNo] *
        stepResponseObject.isinLTVMap[updateAvailableCASMap[key].isinNo]);
    await SharedPropsService.setAvailableCASMap(updateAvailableCASMap);
  };
  