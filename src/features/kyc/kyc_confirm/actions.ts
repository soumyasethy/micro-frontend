import { ActionFunction } from "@voltmoney/types";
import { fetchKycSummary } from "./repo";
import SharedPropsService from "../../../SharedPropsService";

export const fetchKycSummaryAction: ActionFunction<any> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);

  const response = await fetchKycSummary(
    SharedPropsService.getUser().linkedBorrowerAccounts[0].accountId
  );
  console.warn("response", response);
};
