import { User } from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { defaultAuthHeaders, defaultHeaders } from "../../../configs/config";
import { StepperItem } from "@voltmoney/schema";

export const stepperPayload = async () => {
  let KYCVerification = "";
  let message = "We’re processing. Check after sometime.";
  let status = "In progress";
  const user = await SharedPropsService.getUser();

  if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      "COMPLETED" ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC === "COMPLETED") &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      "COMPLETED"
  ) {
    KYCVerification = "In Progress";
  }

  const data: StepperItem[] = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      step: "1",
      title: "KYC Verification",
      subTitle: "lorme ipsum doler smit en",
      status: "", //KYCVerification === "COMPLETED" ? "" : KYCVerification,
      message: "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "bank Verification",
      subTitle: "lorme ipsum doler smit en",
      status:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION,
      message: "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      step: "3",
      title: "Mandate",
      subTitle: "lorme ipsum doler smit en",
      status: user.linkedApplications[0].stepStatusMap.MANDATE_SETUP,
      message: "Something Went Wrong",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      step: "4",
      title: "Loan Agreement",
      subTitle: "lorme ipsum doler smit en",
      status: user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN,
      message: "",
    },
  ];
  return data;
};

export const nextStepStepper = async (userObj?: User) => {
  const user: User = userObj ? userObj : await SharedPropsService.getUser();
  console.warn(
    "user.linkedApplications[0].currentStepId",
    user.linkedApplications[0].currentStepId
  );
  //need to land stepper check if any starts from kyc, bank, mandate,
  if (user.linkedApplications[0].currentStepId === "KYC_CKYC") {
    return { routeId: ROUTE.KYC_AADHAAR_VERIFICATION_OTP, params: {} };
  } else if (
    user.linkedApplications[0].currentStepId === ROUTE.KYC_AADHAAR_VERIFICATION
  ) {
    return { routeId: ROUTE.KYC_DIGILOCKER, params: {} };
  } else if (
    user.linkedApplications[0].currentStepId === "KYC_PHOTO_VERIFICATION"
  ) {
    return { routeId: ROUTE.CAMERA_OPEN, params: {} };
  } else if (
    user.linkedApplications[0].currentStepId === "BANK_ACCOUNT_VERIFICATION"
  ) {
    return { routeId: ROUTE.BANK_ACCOUNT_VERIFICATION, params: {} };
  }
};

export const nextStep = async (
  userObj?: User
): Promise<{ routeId: string; params: object }> => {
  const user: User = userObj ? userObj : await SharedPropsService.getUser();
  if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
    return {
      routeId: ROUTE.EMAIL_VERIFY,
      params: {
        applicationId: user.linkedBorrowerAccounts[0].accountId,
      },
    };
  }

  ///check if any application IN_PROGRESS
  else if (user.linkedApplications[0].applicationState === "IN_PROGRESS") {
    if (
      user.linkedApplications[0].currentStepId === ROUTE.KYC_PAN_VERIFICATION
    ) {
      return {
        routeId: ROUTE.KYC_PAN_VERIFICATION,
        params: {
          applicationId: user.linkedApplications[0].applicationId,
          targetRoute: ROUTE.MF_PLEDGING,
        },
      };
    } else if (user.linkedApplications[0].currentStepId === ROUTE.MF_PLEDGING) {
      return {
        routeId: ROUTE.MF_PLEDGING,
        params: {
          applicationId: user.linkedApplications[0].applicationId,
          email: user.linkedBorrowerAccounts[0].accountHolderEmail,
          panNumber: user.linkedBorrowerAccounts[0].accountHolderPAN,
          mobileNumber: user.linkedBorrowerAccounts[0].accountHolderPhoneNumber,
        },
      };
    } else {
      return { routeId: ROUTE.KYC_STEPPER, params: {} };
    }
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
    const raw = JSON.stringify({});

    const requestOptions = {
      method: "POST",
      headers: defaultHeaders(),
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
