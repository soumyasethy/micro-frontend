import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { config, defaultHeaders } from "../../../configs/config";

export const aadharVerifyRepo = async (applicationId: string, otp: string) => {
  const raw = JSON.stringify({
    applicationId,
    otp,
  });

  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: raw,
  };

  return await fetch(api.aadharVerify, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
