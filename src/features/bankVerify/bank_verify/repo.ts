import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { defaultHeaders } from "../../../configs/config";

export const fetchBankRepo = async () => {
  const requestOptions = {
    method: "GET",
    headers: await defaultHeaders(),
  };
  const applicationId = (await SharedPropsService.getUser())
    .linkedApplications[0].applicationId;

  return await fetch(`${api.bav}${applicationId}`, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

export const postBankRepo = async (
  applicationId,
  bankAccountNumber,
  bankIfscCode
) => {
  const raw = JSON.stringify({
    applicationId,
    bankAccountDetails: {
      bankAccountNumber,
      bankIfscCode,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  return await fetch(api.bavVerify, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
