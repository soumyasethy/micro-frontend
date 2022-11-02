import { User } from "./types";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultAuthHeaders, defaultHeaders } from "../../../configs/config";

export const fetchUserDetails: (
  currentStepId?: string,
  panNumber?: string
) => Promise<User> = async (currentStepId, panNumber) => {
  let user: User = await SharedPropsService.getUser();
  if (currentStepId && panNumber && Object.values(user).length > 0) {
    user.linkedApplications[0].currentStepId = currentStepId;
    user.linkedBorrowerAccounts[0].accountHolderPAN = panNumber;
  } else {
    const raw = JSON.stringify({});

    const requestOptions = {
      method: "POST",
      headers: await defaultHeaders(),
      body: raw,
    };
    user = await fetch(api.userContext, requestOptions).then((response) =>
      response.json()
    );
  }
  await SharedPropsService.setUser(user);
  return Promise.resolve(user);
};

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
