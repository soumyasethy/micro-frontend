import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { config, defaultHeaders } from "../../../configs/config";
export const AadharInitRepo = async (
  applicationId: string,
  aadhaarNumber: string
) => {
  const raw = JSON.stringify({
    applicationId:
      applicationId ||
      SharedPropsService.getUser().linkedApplications[0].applicationId,
    aadhaarNumber:
      aadhaarNumber ||
      SharedPropsService.getUser().linkedBorrowerAccounts[0].accountHolderPhoneNumber.replaceAll(
        "+91",
        ""
      ),
  });

  const requestOptions = {
    method: "POST",
    headers: defaultHeaders(),
    body: raw,
  };

  return await fetch(api.aadharInit, requestOptions)
    .then((response) => response.json())
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
