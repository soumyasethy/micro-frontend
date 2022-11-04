import { ActionFunction } from "@voltmoney/types";
// import { fetchKycSummaryRepo } from "./repo";
// import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";

/*export const fetchKycSummaryAction: ActionFunction<any> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);

  const response = await fetchKycSummaryRepo(
    (
      await SharedPropsService.getUser()
    ).linkedBorrowerAccounts[0].accountId
  );
  console.warn("response", response);
};*/
export const NavToBankAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.BANK_ACCOUNT_VERIFICATION);
};
