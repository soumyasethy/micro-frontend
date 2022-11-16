import { ActionFunction } from "@voltmoney/types";
import {
  NavSearchIfscBranchInfoActionPayload,
  SearchActionPayload,
} from "./types";
import { BanksRepo } from "./repo";
import { GridImageItemProps, GridItemTypeTokens } from "@voltmoney/schema";
import { ROUTE } from "../../../routes";

let bankRepo = BanksRepo;

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
  const pool = { ...bankRepo.ALLBANKS, ...bankRepo.POPULAR };
  const bankCode = getKeyByValue(pool, action.payload.value);
  await navigate(ROUTE.BANK_SELECT, { bankCode });
};

export const SearchAction: ActionFunction<SearchActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "gridItem", <GridImageItemProps>{
    type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
    title: "Popular banks",
    other: "All other banks",
    data: [],
    otherItem: [],
  });

  const dataSearchMap = {};
  const dataPool = { ...bankRepo.POPULAR, ...bankRepo.ALLBANKS };
  Object.keys(dataPool).filter((item) => {
    if (
      item.toLowerCase().includes(action.payload.value.toLowerCase()) ||
      dataPool[item].toLowerCase().includes(action.payload.value.toLowerCase())
    ) {
      dataSearchMap[item] = bankRepo.ALLBANKS[item];
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
      })),
    ],
    otherItem: [],
  });
};
