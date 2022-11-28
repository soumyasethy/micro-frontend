import { ActionFunction } from "@voltmoney/types";
import { api, StoreKey } from "../../configs/api";
import { nextStepId } from "../../configs/utils";
import { User } from "../login/otp_verify/types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import { getAppHeader } from "../../configs/config";

export const SplashAction: ActionFunction<any> = async (
  action,
  _datastore,
  { network, navigate, asyncStorage }
): Promise<any> => {
  // const isSeen = await SharedPropsService.getOnboarding();
  // if (isSeen) {
    const accessToken = await asyncStorage.get(StoreKey.accessToken);
    if (accessToken) {
      const userContextResponse = await network.post(
        api.userContext,
        {},
        { headers: await getAppHeader() }
      );
      if (userContextResponse.status === 200) {
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);

        /****
         * ADD YOUR CUSTOM ROUTE TO NAVIGATE
         * ****/


        if (user.linkedApplications[0].applicationState === "COMPLETED") {
          await navigate(ROUTE.DASHBOARD);
        } else {
          const nextRoute = await nextStepId(
            user.linkedApplications[0].currentStepId
          );
          await navigate(nextRoute.routeId, nextRoute.params);
        }
      }
    } else {
      await navigate(ROUTE.PHONE_NUMBER);
    }
  // } else {
  //   await navigate(ROUTE.LANDING_PAGE);
  // }
};
