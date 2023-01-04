import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

export const fetchPledgeLimitRepo = async () => {
  const user = await SharedPropsService.getUser();

  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationid = user.linkedApplications[0].applicationId;
  return await fetch(`${api.pledgeLimit}${applicationid}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
