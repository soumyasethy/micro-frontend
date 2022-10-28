import { api } from "../../configs/api";
import SharedPropsService from "../../SharedPropsService";

export const aadharVerifyRepo = async (applicationId: string, otp: string) => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("X-AppPlatform", "SDK_KFIN");
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId,
    otp,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  return await fetch(api.aadharVerify, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
