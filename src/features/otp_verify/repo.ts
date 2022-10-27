import { User } from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import { api } from "../../configs/api";

export const nextStep = async (
  userObj?: User
): Promise<{ routeId: string; params: object }> => {
  const user: User = userObj ? userObj : await SharedPropsService.getUser();
  if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
    console.info("should go accountHolderEmail");
    return {
      routeId: ROUTE.EMAIL_VERIFY,
      params: {
        applicationId: user.linkedBorrowerAccounts[0].accountId,
      },
    };
  } else if (
    user.linkedApplications[0].currentStepId === ROUTE.KYC_PAN_VERIFICATION
  ) {
    console.info("should go KYC_PAN_VERIFICATION");
    return {
      routeId: ROUTE.KYC_PAN_VERIFICATION,
      params: {
        applicationId: user.linkedApplications[0].applicationId,
        targetRoute: ROUTE.MF_PLEDGING,
      },
    };
  } else if (user.linkedApplications[0].currentStepId === ROUTE.MF_PLEDGING) {
    console.info("should go MF_PLEDGING");
    return {
      routeId: ROUTE.MF_PLEDGING,
      params: {
        applicationId: user.linkedApplications[0].applicationId,
        email: user.linkedBorrowerAccounts[0].accountHolderEmail,
        panNumber: user.linkedBorrowerAccounts[0].accountHolderPAN,
        mobileNumber: user.linkedBorrowerAccounts[0].accountHolderPhoneNumber,
      },
    };
  }
};

export const fetchUserDetails: (
  currentStepId?: string,
  panNumber?: string
) => Promise<User> = async (currentStepId, panNumber) => {
  let user: User = await SharedPropsService.getUser();
  if (currentStepId && panNumber && Object.values(user).length > 0) {
    user.linkedApplications[0].currentStepId = currentStepId;
    user.linkedBorrowerAccounts[0].accountHolderPAN = panNumber;
  } else {
    const headers = new Headers();
    headers.append("X-AppMode", "INVESTOR_VIEW");
    headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
    headers.append("Authorization", `Bearer ${SharedPropsService.getToken()}`);
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({});

    const requestOptions = {
      method: "POST",
      headers: headers,
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
  const headers = new Headers();
  headers.append("accept", "*/*");
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    otp,
    phoneNo,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
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
