import { ActionFunction, WidgetProps } from "@voltmoney/types";
import {
  ACTION,
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
  const banksMap = {
    ...action.payload.bankRepo.ALLBANKS,
    ...action.payload.bankRepo.POPULAR,
  };
  const bankCode = getKeyByValue(banksMap, action.payload.value);
  await navigate(ROUTE.BANK_ACCOUNT_ADD, {
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
  const allBankMap = {
    ...action.payload.bankRepo.POPULAR,
    ...action.payload.bankRepo.ALLBANKS,
  };
  Object.keys(allBankMap).filter((item) => {
    if (
      item.toLowerCase().includes(action.payload.value.toLowerCase()) ||
      allBankMap[item]
        .toLowerCase()
        .includes(action.payload.value.toLowerCase())
    ) {
      dataSearchMap[item] = action.payload.bankRepo.ALLBANKS[item];
    }
  });

  await setDatastore(action.routeId, "gridItem", <
    GridImageItemProps & WidgetProps
  >{
    type: GridItemTypeTokens.VERITICAL,
    title: "",
    other: "",
    data: [
      ...Object.keys(dataSearchMap).map((key) => ({
        label: allBankMap[key],
        image: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${key}.svg`,
        defaultUri: `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/default.svg`,
      })),
    ],
    otherItem: [],
    action: {
      type: ACTION.NAV_IFSC_SEARCH_BRANCH_INFO,
      routeId: ROUTE.BANK_SELECT,
      payload: <NavSearchIfscBranchInfoActionPayload>{
        value: action.payload.value,
        bankRepo: action.payload.bankRepo,
      },
    },
  });
};
