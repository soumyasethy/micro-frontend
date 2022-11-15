import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";

export const kycSummaryInitRepo = async (applicationId: string) => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };

  return await fetch(`${api.kycSummaryInit}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
export const kycSummaryVerifyRepo = async (applicationId: string,) => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };

  return await fetch(`${api.kycSummaryVerify}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
