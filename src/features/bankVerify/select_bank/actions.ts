import { ActionFunction } from "@voltmoney/types";
import {
  NavSearchIfscBranchInfoActionPayload,
  SearchActionPayload,
} from "./types";
import {
  GridImageItemProps,
  GridItemTypeTokens,
  HeaderProps,
} from "@voltmoney/schema";
import { ROUTE } from "../../../routes";

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

export const GoBackAction: ActionFunction<
  NavSearchIfscBranchInfoActionPayload
> = async (action, _datastore, { goBack }): Promise<any> => {
  await goBack();
};
export const NavSearchIfscBranchInfoAction: ActionFunction<
  NavSearchIfscBranchInfoActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  const pool = {
    ...action.payload.bankRepo.ALLBANKS,
    ...action.payload.bankRepo.POPULAR,
  };
  const bankCode = getKeyByValue(pool, action.payload.value);
  await navigate(ROUTE.BANK_SELECT, {
    bankCode,
    bankName: action.payload.value,
  });
};

export const SearchAction: ActionFunction<SearchActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "header", <HeaderProps>{
    title: "Search bank",
  });
  await setDatastore(action.routeId, "gridItem", <GridImageItemProps>{
    type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
    title: "Popular banks",
    other: "All other banks",
    data: [],
    otherItem: [],
  });

  const dataSearchMap = {};
  const dataPool = {
    ...action.payload.bankRepo.POPULAR,
    ...action.payload.bankRepo.ALLBANKS,
  };
  Object.keys(dataPool).filter((item) => {
    if (
      item.toLowerCase().includes(action.payload.value.toLowerCase()) ||
      dataPool[item].toLowerCase().includes(action.payload.value.toLowerCase())
    ) {
      dataSearchMap[item] = action.payload.bankRepo.ALLBANKS[item];
    }
  });

  await setDatastore(action.routeId, "gridItem", <GridImageItemProps>{
    type: GridItemTypeTokens.VERITICAL,
    title: "",
    other: "",
    data: [
      ...Object.keys(dataSearchMap).map((key) => ({
        label: dataPool[key],
        image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
        defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
      })),
    ],
    otherItem: [],
  });
};
