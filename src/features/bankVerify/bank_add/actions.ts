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

export const NavSearchIfscBranchInfoAction: ActionFunction<
  NavSearchIfscBranchInfoActionPayload
> = async (action, _datastore, { navigate }): Promise<any> => {
  console.warn(
    "**** NavSearchIfscBranchInfoAction Action Triggered ****",
    action
  );
  const pool = { ...bankRepo.ALLBANKS, ...bankRepo.POPULAR };
  const bankCode = getKeyByValue(pool, action.payload.value);
  console.warn("bankCode->", bankCode);
  await navigate(ROUTE.BANK_ACCOUNT_ADD_MANUALLY, { bankCode });
};

export const SearchAction: ActionFunction<SearchActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("**** Search Action Triggered ****", action.payload);
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
      ...Object.values(dataSearchMap).map((name) => ({
        label: name,
        image:
          "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
      })),
    ],
    otherItem: [],
  });
};
