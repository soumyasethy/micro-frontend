import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";

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
    headers: defaultHeaders(),
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
