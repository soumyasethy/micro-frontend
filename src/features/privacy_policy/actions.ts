import { ActionFunction } from "@voltmoney/types";

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
};
