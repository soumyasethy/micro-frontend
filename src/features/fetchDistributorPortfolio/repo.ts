import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../configs/api";
import { defaultHeaders, getAppHeader } from "../../configs/config";
import SharedPropsService from "../../SharedPropsService";

export const fetchPledgeLimitRepo = async () => {
    const user = await SharedPropsService.getUser();
  
    const requestOptions = {
      method: "GET",
      headers: await defaultHeaders(),
    };
    const applicationid = await SharedPropsService.getApplicationId();
    //const applicationid = user.linkedApplications[0].applicationId;
    return await fetch(`${partnerApi.pledgeLimit}${applicationid}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));
  };

  // export const fetchPledgeLimitRepo = async (
  //   action,
  //   { network}
  // ): Promise<any> => {
  //   const accountId = await SharedPropsService.getAccountId();
  //   const applicationid = await SharedPropsService.getApplicationId();
  //   const response = await network.get(
  //     `${partnerApi.pledgeLimit}${applicationid}`,
  //     { headers: await getAppHeader() }
  //   );
  //   if (response.status === 200) {
  //    return response.json();
  //   }
  
  // };
  