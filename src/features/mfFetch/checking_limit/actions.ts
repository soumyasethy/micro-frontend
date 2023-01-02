import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { buildDataStore, listItems } from "./utils";

export const navigateToNext: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.UNLOCK_LIMIT_LANDING);
};
export const addListItemsOnUI: ActionFunction<any> = async (
  action,
  _datastore,
  { appendWidgets, ...props }
): Promise<any> => {
  await appendWidgets(
    ROUTE.CHECKING_LIMIT,
    buildDataStore(),
    [listItems[0], listItems[1]],
    "title"
  );

  const count = listItems.length - 1;
  for (let i = 2; i < count; i++) {
    setTimeout(async () => {
      await appendWidgets(
        ROUTE.CHECKING_LIMIT,
        buildDataStore(),
        [listItems[i], listItems[i + 1]],
        listItems[i - 1].id
      );
    }, 1000 * i);
  }
  setTimeout(() => {
    navigateToNext(null, null, { appendWidgets, ...props });
  }, 1000 * (count + 1));
};
