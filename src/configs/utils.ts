import { IconTokens, StepperItem, StepperStateToken } from "@voltmoney/schema";
import SharedPropsService from "../SharedPropsService";
import { User } from "../features/login/otp_verify/types";
import { ROUTE } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertNavProps } from "../features/popup_loader/types";

export const showBottomSheet = ({
  title = "Verification Failed!",
  subTitle,
  message,
  iconName,
  ctaAction,
  ctaLabel,
  primary,
}: AlertNavProps) => {
  return {
    routeId: ROUTE.ALERT_PAGE,
    params: {
      alertProps: <AlertNavProps>{
        title,
        subTitle,
        message,
        iconName,
        ctaAction,
        ctaLabel,
        primary,
      },
    },
  };
};
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
      "COMPLETED" &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY === "COMPLETED"
  ) {
    KYC_VERIFICATION = StepperStateToken.COMPLETED;
  } else if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      "PENDING_MANUAL_VERIFICATION" ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
        "PENDING_MANUAL_VERIFICATION") &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      "PENDING_MANUAL_VERIFICATION" &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      "PENDING_MANUAL_VERIFICATION"
  ) {
    KYC_VERIFICATION = StepperStateToken.PENDING_MANUAL_VERIFICATION;
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
        KYC_VERIFICATION === StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "Bank verification",
      subTitle: "lorme ipsum doler smit en",
      status:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION,
      message:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      step: "3",
      title: "Repayment",
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
      title: "Loan agreement",
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

export const nextStepCredStepper = async (currentStepId?: string) => {
  if (!currentStepId) {
    currentStepId = (await SharedPropsService.getUser()).linkedApplications[0]
      .currentStepId;
  }
  if (currentStepId === ROUTE.KYC_AADHAAR_VERIFICATION) {
    return { routeId: ROUTE.KYC_DIGILOCKER, params: {} };
  } else if (currentStepId === "KYC_PHOTO_VERIFICATION") {
    return { routeId: ROUTE.KYC_PHOTO_VERIFICATION, params: {} };
  } else if (currentStepId === "KYC_SUMMARY") {
    return { routeId: ROUTE.KYC_SUMMARY, params: {} };
  } else if (currentStepId === "BANK_ACCOUNT_VERIFICATION") {
    return { routeId: ROUTE.BANK_ACCOUNT_VERIFICATION, params: {} };
  } else {
  }
};

export const nextStepId = async (
  currentStepId: string
): Promise<{ routeId: string; params: object }> => {
  const user: User = await SharedPropsService.getUser();
  if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
    return {
      routeId: ROUTE.EMAIL_VERIFY,
      params: {
        applicationId: user.linkedBorrowerAccounts[0].accountId,
      },
    };
  }

  ///check if any application IN_PROGRESS
  else if (
    currentStepId ||
    user.linkedApplications[0].applicationState === "IN_PROGRESS"
  ) {
    if (currentStepId === ROUTE.KYC_PAN_VERIFICATION) {
      return {
        routeId: ROUTE.KYC_PAN_VERIFICATION,
        params: {
          applicationId: user.linkedApplications[0].applicationId,
          targetRoute: ROUTE.MF_FETCH_PORTFOLIO,
        },
      };
    } else if (currentStepId === ROUTE.MF_FETCH_PORTFOLIO) {
      return {
        routeId: ROUTE.MF_FETCH_PORTFOLIO,
        params: {
          applicationId: user.linkedApplications[0].applicationId,
          email: user.linkedBorrowerAccounts[0].accountHolderEmail,
          panNumber: user.linkedBorrowerAccounts[0].accountHolderPAN,
          mobileNumber: user.linkedBorrowerAccounts[0].accountHolderPhoneNumber,
        },
      };
    } else if (currentStepId === ROUTE.MF_PLEDGE_PORTFOLIO) {
      return {
        routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
        params: {},
      };
    } else if (
      currentStepId === "KYC_CKYC" ||
      currentStepId === "KYC_PHOTO_VERIFICATION" ||
      currentStepId === "KYC_AADHAAR_VERIFICATION" ||
      currentStepId === "KYC_SUMMARY" ||
      currentStepId === "BANK_ACCOUNT_VERIFICATION" ||
      currentStepId === "MANDATE_SETUP" ||
      currentStepId === "AGREEMENT_SIGN"
    ) {
      return { routeId: ROUTE.KYC_STEPPER, params: {} };
    } else if (currentStepId === ROUTE.KYC_SUMMARY) {
      return { routeId: ROUTE.KYC_SUMMARY, params: {} };
    }
  }
};
export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(async () => {
      return await callback.apply(null, args);
    }, wait);
  };
};
