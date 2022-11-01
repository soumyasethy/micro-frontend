import { StepperItem, StepperStateToken } from "@voltmoney/schema";
import SharedPropsService from "../SharedPropsService";
import { User } from "../features/login/otp_verify/types";
import { ROUTE } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllData = async () => {
  await AsyncStorage.getAllKeys()
    .then((keys) => AsyncStorage.multiRemove(keys))
    .then(() => console.warn("Clear data"));
};

export const stepperRepo = async () => {
  let KYC_VERIFICATION: StepperStateToken;
  let message = "We’re processing. Check after sometime.";
  const user = await SharedPropsService.getUser();

  if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      "COMPLETED" ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC === "COMPLETED") &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      "COMPLETED"
  ) {
    KYC_VERIFICATION = StepperStateToken.COMPLETED;
  } else {
    KYC_VERIFICATION = StepperStateToken.IN_PROGRESS;
  }

  const data: StepperItem[] = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      step: "1",
      title: "KYC Verification",
      subTitle: "lorme ipsum doler smit en",
      status: KYC_VERIFICATION,
      message:
        KYC_VERIFICATION === StepperStateToken.COMPLETED
          ? ""
          : user.linkedApplications[0].stepStatusMap
              .KYC_AADHAAR_VERIFICATION === StepperStateToken.IN_PROGRESS
          ? message
          : "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "bank Verification",
      subTitle: "lorme ipsum doler smit en",
      status:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION,
      message:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION ===
        StepperStateToken.COMPLETED
          ? ""
          : user.linkedApplications[0].stepStatusMap
              .BANK_ACCOUNT_VERIFICATION === StepperStateToken.IN_PROGRESS
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      step: "3",
      title: "Mondate",
      subTitle: "lorme ipsum doler smit en",
      status: user.linkedApplications[0].stepStatusMap.MANDATE_SETUP,
      message:
        user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
        StepperStateToken.COMPLETED
          ? ""
          : user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
            StepperStateToken.IN_PROGRESS
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      step: "4",
      title: "Loan Agreement",
      subTitle: "lorme ipsum doler smit en",
      status: user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN,
      message:
        user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN ===
        StepperStateToken.COMPLETED
          ? ""
          : user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN ===
            StepperStateToken.IN_PROGRESS
          ? message
          : "",
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
