import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { config, defaultHeaders } from "../../../configs/config";

export const fetchBankRepo = async () => {
  const requestOptions = {
    method: "GET",
    headers: defaultHeaders(),
  };
  return await fetch(
    `${api.bav}${
      SharedPropsService.getUser().linkedApplications[0].applicationId
    }`,
    requestOptions
  )
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
    headers: defaultHeaders(),
    body: raw,
  };

  return await fetch(api.bavVerify, requestOptions)
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
