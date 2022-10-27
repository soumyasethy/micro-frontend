import SharedPropsService from "../../SharedPropsService";
import { api } from "../../configs/api";

export const saveAttribute = async (
  applicationId: string,
  key: string,
  value: string
) => {
  const headers = new Headers();
  headers.append("X-AppMode", "INVESTOR_VIEW");
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
  headers.append("Content-Type", "application/json");

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
    headers: headers,
    body: body,
  };

  await fetch(`${api.accountAttributes}${applicationId}`, requestOptions)
    .then(async (response) => {
      return Promise.resolve(response.json());
    })
    .catch(async (error) => {
      console.log("error", error);
      return Promise.reject(error);
    });
};
