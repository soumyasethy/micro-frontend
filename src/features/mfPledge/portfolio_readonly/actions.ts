import { ActionFunction } from "@voltmoney/types";
import {
  OtpPayload,
} from "./types";
import {
  AvailableCASItem,
  IsinLTVMap,
  IsinNAVMap,
  StepResponseObject,
} from "../unlock_limit/types";
import { roundDownToNearestHundred } from "../../../configs/utils";
let portfolioSearchKeyword = "";
let listBeforeSearchUI = [];

export const getTotalLimit = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
      sum +
      roundDownToNearestHundred(
        item.pledgedUnits * isinNavMap[item.isinNo] * isinLTVMap[item.isinNo]
      );
  });
  return sum;
};

export const getActualLimit = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
  isinLTVMap: IsinLTVMap
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
      sum +
      roundDownToNearestHundred(
        item.totalAvailableUnits *
          isinNavMap[item.isinNo] *
          isinLTVMap[item.isinNo]
      );
  });
  return sum;
};

export const getPortfolioValue = (
    availableCAS: AvailableCASItem[],
    isinNavMap: IsinNAVMap,
) => {
  let sum = 0;
  availableCAS.forEach((item) => {
    sum =
        sum +
        roundDownToNearestHundred(
            item.totalAvailableUnits * isinNavMap[item.isinNo]
        );
  });
  return sum;
};

export const getDesiredValue = (
  availableCAS: AvailableCASItem[],
  isinNavMap: IsinNAVMap,
) => {
let sum = 0;
availableCAS.forEach((item) => {
  sum =
      sum +
      roundDownToNearestHundred(
          item.pledgedUnits * isinNavMap[item.isinNo]
      );
});
return sum;
};

export const goBack: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

