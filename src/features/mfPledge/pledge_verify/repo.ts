import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";
import { ACTION } from "./types";

export const AuthPledgeRepo = async (
  assetRepository: string, otp: string
) => {

  const raw = JSON.stringify({
    "applicationId": (await (SharedPropsService.getUser())).linkedApplications[0].applicationId,
    assetRepository,
    otp
  });

  const requestOptions = {
    method: 'POST',
    headers: await defaultHeaders(),
    body: raw,
  };

  return await fetch(api.authPledge, requestOptions)
    .then(response => response.json())
    .catch(error => {
      console.log('error', error)
      return error
    });
};

export const fetchUserRepo = async () => {
  return await SharedPropsService.getUser();
};

