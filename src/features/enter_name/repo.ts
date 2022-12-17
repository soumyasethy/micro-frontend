import { api } from "../../configs/api";
import { defaultHeaders } from "../../configs/config";
import { User } from "../login/otp_verify/types";
import SharedPropsService from "../../SharedPropsService";

export const saveAttribute = async (
  applicationId: string,
  key: string,
  value: string
): Promise<User> => {
  applicationId = (await SharedPropsService.getUser()).linkedBorrowerAccounts[0]
    .accountId;
  const body = JSON.stringify({
    secureDataAttributeDetailsMap: {
      [key]: {
        secureDataAttributeDetails: {
          value: value,
          sources: ["SELF"],
          verified: true,
          verificationSources: [`web`],
          collectedOn: `${Date.now()}`,
          verifiedOn: `${Date.now()}`,
        },
        isPrimary: true,
      },
    },
  });

  const requestOptions = {
    method: "PATCH",
    headers: await defaultHeaders(),
    body: body,
  };

  return await fetch(
    `${api.accountAttributes}${applicationId}`,
    requestOptions
  ).then((response) => response.json());
};
