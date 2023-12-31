import { ActionFunction } from "@voltmoney/types";
import { api, partnerApi, StoreKey } from "../../configs/api";
import { nextStepId } from "../../configs/utils";
import { User } from "../login/otp_verify/types";
import { ROUTE } from "../../routes";
import SharedPropsService, { USERTYPE } from "../../SharedPropsService";

import { getAppHeader } from "../../configs/config";
import {ImportScriptSrc} from "../../configs/constants";

export const SplashAction: ActionFunction<any> = async (
  action,
  _datastore,
  { network, navigate, asyncStorage, importScript, metaData }
): Promise<any> => {
  // const isSeen = await SharedPropsService.getOnboarding();
  // if (isSeen) {
  if(metaData.platform.OS ==='web') {
    importScript(ImportScriptSrc.DIGIO_SCRIPT);
  }
  const accessToken = await asyncStorage.get(StoreKey.accessToken);
  if (accessToken) {
    const body = {}; /*** NOT PASSING REF CODE HERE ***/
    const userType = await SharedPropsService.getUserType();
    if (userType === USERTYPE.BORROWER) {
      const userContextResponse = await network.post(api.userContext, body, {
        headers: await getAppHeader(),
      });
      if (userContextResponse.status === 200) {
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);
        action?.payload?.setIsUserLoggedIn(user);
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
      } else {
        await navigate(ROUTE.PHONE_NUMBER, {
          mobileNumber: action?.payload?.mobileNumber,
        });
      }
    } else {
      const userContextResponse = await network.post(partnerApi.userContext, body, {
        headers: await getAppHeader(),
      });
      const partnerUser = await (await SharedPropsService.getPartnerUser()).panNumber;
      if (userContextResponse.status === 200) {
        const user: User = userContextResponse.data;
        await SharedPropsService.setUser(user);
        // await navigate(ROUTE.PORTFOLIO_UNLOCK);
        // return;
        if (user.linkedPartnerAccounts[0].partnerName == null || user.linkedPartnerAccounts[0].accountHolderEmail == null) {
          await navigate(ROUTE.ENTER_NAME);
        } else if (user.linkedPartnerAccounts[0].partnerName != null) {
          await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
        } else if (partnerUser !== '') {
          await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
        } else {
          await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
        }
      }
    }
  }
  else {
    await navigate(ROUTE.PHONE_NUMBER, {
      mobileNumber: action?.payload?.mobileNumber,
    });
  }
  // } else {
  //   await navigate(ROUTE.LANDING_PAGE);
  // }
};
