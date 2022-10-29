import { ActionFunction } from "@voltmoney/types";
import { SearchActionPayload } from "./types";
import { BanksRepo } from "./repo";
import { GridImageItemProps, GridItemTypeTokens } from "@voltmoney/schema";

let searchBankName = "";
let bankRepo = BanksRepo;
export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
};

export const SearchAction: ActionFunction<SearchActionPayload> = async (
  action,
  _datastore,
  { setDatastore }
): Promise<any> => {
  console.warn("**** Search Action Triggered ****", action.payload);
  const data = {};
  const dataPool = { ...bankRepo.POPULAR, ...bankRepo.ALLBANKS };
  Object.keys(dataPool).filter((item) => {
    if (
      item.toLowerCase().includes(action.payload.value.toLowerCase()) ||
      dataPool[item].toLowerCase().includes(action.payload.value.toLowerCase())
    ) {
      data[item] = bankRepo.ALLBANKS[item];
    }
  });
  console.warn("data -> ", data);
  await setDatastore(action.routeId, action.payload.targetWidgetId, <
    GridImageItemProps
  >{
    type: GridItemTypeTokens.HORIZONTAl_VERITICAL,
    title: "hello world",
    other: "Other",
    data: [],
    otherItem: [
      ...Object.values(BanksRepo.ALLBANKS).map((name) => ({
        label: name,
        image:
          "https://images.unsplash.com/photo-1652680882466-e83b0cccab34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2153&q=50",
      })),
    ],
  });
};
