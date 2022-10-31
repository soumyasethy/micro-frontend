import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

export const fetchKycSummaryRepo = async (accountId: string) => {
  const requestOptions = {
    method: "GET",
    headers: defaultHeaders(),
  };

  return await fetch(`${api.kycSummary}${accountId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
