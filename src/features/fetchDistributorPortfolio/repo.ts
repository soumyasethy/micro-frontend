import { partnerApi } from "../../configs/api";
import { defaultHeaders } from "../../configs/config";
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