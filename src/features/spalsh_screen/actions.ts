import { ActionFunction } from "@voltmoney/types";
import { StoreKey } from "../../configs/api";
import { clearAllData, nextStepId } from "../../configs/utils";
import { User } from "../login/otp_verify/types";
import { ROUTE } from "../../routes";
import { fetchUserDetails } from "./repo";

export const SplashAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, asyncStorage }
): Promise<any> => {
  const accessToken = await asyncStorage.get(StoreKey.accessToken);
  if (accessToken) {
    try {
      const user: User = await fetchUserDetails();
      if (Object.keys(user).length > 0) {
        const nextRoute = await nextStepId(
          user.linkedApplications[0].currentStepId
        );
        // await navigate(nextRoute.routeId, nextRoute.params);
        await navigate(ROUTE.BANK_ACCOUNT_VERIFICATION, {});
      } else {
        await clearAllData();
        await navigate(ROUTE.PHONE_NUMBER);
      }
    } catch (e) {
      await clearAllData();
      await navigate(ROUTE.PHONE_NUMBER);
    }
  } else {
    await navigate(ROUTE.PHONE_NUMBER);
  }
};
