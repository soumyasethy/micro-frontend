import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";

export const saveAttribute = async (
  applicationId: string,
  key: string,
  value: string
) => {
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

  await fetch(`${api.accountAttributes}${applicationId}`, requestOptions)
    .then(async (response) => {
      const updatedUser: User = await response.json();
      await SharedPropsService.setUser(updatedUser);
      console.warn("updatedUser ", updatedUser);
    })
    .catch(async (error) => {
      console.log("error", error);
      return Promise.reject(error);
    });
};
