import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

export const fetchLinkRepo = async () => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;
  return await fetch(`${api.approvalCheck}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
