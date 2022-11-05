import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";

export const fetchKycSummaryRepo = async (applicationId: string) => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };

  return await fetch(`${api.kycSummary}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
