import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
export const AadharInitRepo = async (
  applicationId: string,
  aadhaarNumber?: string
) => {
  const raw = JSON.stringify({
    applicationId:
      applicationId ||
      (await SharedPropsService.getUser()).linkedApplications[0].applicationId,
    aadhaarNumber: aadhaarNumber,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  return await fetch(api.aadharInit, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
