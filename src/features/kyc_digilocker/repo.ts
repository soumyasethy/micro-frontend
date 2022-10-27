import SharedPropsService, { mockUser } from "../../SharedPropsService";
import { api } from "../../configs/api";

export const AadharInitRepo = async (
  aadhaarNumber: string,
  applicationId: string
) => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("X-AppPlatform", "SDK_KFIN");
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    aadhaarNumber,
    applicationId: mockUser.linkedApplications[0].applicationId,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  return await fetch(api.aadharInit, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
