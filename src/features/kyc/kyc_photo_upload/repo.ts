import { defaultHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { User } from "../../login/otp_verify/types";
import { api } from "../../../configs/api";

export const photoInitRepo = async () => {
  const user: User = await SharedPropsService.getUser();
  const raw = JSON.stringify({
    applicationId: user.linkedApplications[0].applicationId,
    imageName: `${user.linkedApplications[0].applicationId}_${user.linkedBorrowerAccounts[0].accountHolderPhoneNumber}.txt`,
    imageType: "image/jpeg",
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };

  return await fetch(`${api.photoInit}`, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      console.warn(response);
      return response.stepResponseObject;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
};
