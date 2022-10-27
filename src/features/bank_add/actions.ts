import { ActionFunction } from "@voltmoney/types";

export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
};
