import { User } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultAuthHeaders, defaultHeaders } from "../../../configs/config";

export const loginRepo = async (otp: string, phoneNo: string) => {
  const raw = JSON.stringify({
    otp,
    phoneNo,
  });

  const requestOptions = {
    method: "POST",
    headers: defaultAuthHeaders(),
    body: raw,
  };
  type Response = {
    status: string;
    message: string;
    jwt: string;
  };

  return await fetch(api.verifyOtp, requestOptions)
    .then((response) => response.json())
    .then(async (response: Response) => {
      return response;
    })
    .catch(async (error) => {
      console.log("error", error);
      return error;
    });
};
