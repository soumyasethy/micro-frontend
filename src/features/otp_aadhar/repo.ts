import { api } from "../../configs/api";

export const aadharVerifyRepo = async (applicationId: string, otp: string) => {
  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("Authorization", "Bearer access_token");
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
    .then((response) => response.text())
    .catch((error) => console.log("error", error));
};
