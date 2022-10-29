import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";

export const panVerifyRepo = async ({ applicationId, panNumber }) => {
  const headers = new Headers();
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId: applicationId,
    panNumber: panNumber,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  return await fetch(api.panVerify, requestOptions).then(
    async (response) => await response.json()
  );
};
