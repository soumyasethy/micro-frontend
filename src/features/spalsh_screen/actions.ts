import { ActionFunction } from "@voltmoney/types";
import { api, partnerApi, StoreKey } from "../../configs/api";
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
  console.log("access Token", accessToken);
  if (accessToken) {
    const body = {}; /*** NOT PASSING REF CODE HERE ***/
    console.warn("SplashAction body", body);
    const userType = await SharedPropsService.getUserType();
    console.log("userType", userType);
    if (userType === "BORROWER") {


      const userContextResponse = await network.post(api.userContext, body, {
        headers: await getAppHeader(),
      });
      if (userContextResponse.status === 200) {
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);
        /****
         * ADD YOUR CUSTOM ROUTE TO NAVIGATE
         * ****/
        return await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST, {})

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
      const userContextResponse = await network.post(partnerApi.userContext, body, {
        headers: await getAppHeader(),
      });
      if (userContextResponse.status === 200) {
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);
        if (user.linkedPartnerAccounts[0].partnerName == null) {
          await navigate(ROUTE.ENTER_NAME);
        }else{
          await navigate(ROUTE.DIST_BANK_ACCOUNT_ADD);
        }
        
      }else{
        await navigate(ROUTE.PHONE_NUMBER);
      }
    }
  } else {
    await navigate(ROUTE.PHONE_NUMBER);
  }
  // } else {
  //   await navigate(ROUTE.LANDING_PAGE);
  // }
};
