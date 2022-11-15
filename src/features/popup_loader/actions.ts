import { ActionFunction } from "@voltmoney/types";

export const ClosePopup: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  console.warn("**** ClosePopup ****", action);
  await goBack();
};
