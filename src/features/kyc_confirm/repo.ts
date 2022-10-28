import { api } from "../../configs/api";
import SharedPropsService from "../../SharedPropsService";

export const fetchKycSummary = async (accountId: string) => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("X-AppPlatform", "SDK_KFIN");

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  return await fetch(`${api.kycSummary}${accountId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
