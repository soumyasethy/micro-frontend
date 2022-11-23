import { StepperItem, StepperStateToken } from "@voltmoney/schema";
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

export const horizontalStepperRepo = async () => {
  let KYC_VERIFICATION: StepperStateToken;
  let MANDATE_SETUP: StepperStateToken;
  let AGREEMENT_SIGN: StepperStateToken;
  let message = "We’re processing. Check after sometime.";
  const user = await SharedPropsService.getUser();

  if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      StepperStateToken.COMPLETED ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
        StepperStateToken.COMPLETED) &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      StepperStateToken.COMPLETED &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.COMPLETED
  ) {
    KYC_VERIFICATION = StepperStateToken.COMPLETED;
  } else if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION) &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    KYC_VERIFICATION = StepperStateToken.PENDING_MANUAL_VERIFICATION;
  } else {
    KYC_VERIFICATION = StepperStateToken.IN_PROGRESS;
  }

  if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.COMPLETED ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.COMPLETED
  ) {
    MANDATE_SETUP = StepperStateToken.COMPLETED;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.NOT_STARTED ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.NOT_STARTED
  ) {
    MANDATE_SETUP = StepperStateToken.NOT_STARTED;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.IN_PROGRESS ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.IN_PROGRESS
  ) {
    MANDATE_SETUP = StepperStateToken.IN_PROGRESS;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    MANDATE_SETUP = StepperStateToken.PENDING_MANUAL_VERIFICATION;
  } else {
    MANDATE_SETUP = StepperStateToken.IN_PROGRESS;
  }

  if (
    user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN ===
    StepperStateToken.COMPLETED
  ) {
    AGREEMENT_SIGN = StepperStateToken.COMPLETED;
  } else if (
    user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN ===
    StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    AGREEMENT_SIGN = StepperStateToken.PENDING_MANUAL_VERIFICATION;
  } else {
    AGREEMENT_SIGN = StepperStateToken.IN_PROGRESS;
  }

  const data: StepperItem[] = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      step: "1",
      title: "KYC",
      subTitle: "",
      status: KYC_VERIFICATION,
      message:
        KYC_VERIFICATION === StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "Bank account",
      subTitle: "",
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
      title: "AutoPay",
      subTitle: "",
      status: MANDATE_SETUP,
      message:
        MANDATE_SETUP === StepperStateToken.COMPLETED
          ? ""
          : MANDATE_SETUP === StepperStateToken.IN_PROGRESS
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      step: "4",
      title: "Agreement",
      subTitle: "",
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

export const stepperRepo = async () => {
  let KYC_VERIFICATION: StepperStateToken;
  let message = "We’re processing. Check after sometime.";
  const user = await SharedPropsService.getUser();

  if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      StepperStateToken.COMPLETED ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
        StepperStateToken.COMPLETED) &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      StepperStateToken.COMPLETED &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.COMPLETED
  ) {
    KYC_VERIFICATION = StepperStateToken.COMPLETED;
  } else if (
    (user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
      user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION) &&
    user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION &&
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    KYC_VERIFICATION = StepperStateToken.PENDING_MANUAL_VERIFICATION;
  } else {
    KYC_VERIFICATION = StepperStateToken.IN_PROGRESS;
  }
  let MANDATE_SETUP: StepperStateToken;
  if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.COMPLETED ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.COMPLETED
  ) {
    MANDATE_SETUP = StepperStateToken.COMPLETED;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.NOT_STARTED ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.NOT_STARTED
  ) {
    MANDATE_SETUP = StepperStateToken.NOT_STARTED;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.IN_PROGRESS ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.IN_PROGRESS
  ) {
    MANDATE_SETUP = StepperStateToken.IN_PROGRESS;
  } else if (
    user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.CREDIT_APPROVAL ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION
  ) {
    MANDATE_SETUP = StepperStateToken.PENDING_MANUAL_VERIFICATION;
  } else {
    MANDATE_SETUP = StepperStateToken.IN_PROGRESS;
  }

  const data: StepperItem[] = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      step: "1",
      title: "KYC Verification",
      subTitle: "Verify Aadhaar to confirm your identity",
      status: KYC_VERIFICATION,
      message:
        KYC_VERIFICATION === StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "Bank account verification",
      subTitle: "Provide bank account for receiving money",
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
      subTitle: "Link your bank account for auto repayment",
      status: MANDATE_SETUP,
      message:
        MANDATE_SETUP === StepperStateToken.COMPLETED
          ? ""
          : MANDATE_SETUP === StepperStateToken.IN_PROGRESS
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      step: "4",
      title: "Loan agreement",
      subTitle: "Review the key terms and confirm",
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
  } else if (currentStepId === ROUTE.KYC_PHOTO_VERIFICATION) {
    return { routeId: ROUTE.KYC_PHOTO_VERIFICATION, params: {} };
  } else if (currentStepId === ROUTE.KYC_SUMMARY) {
    return { routeId: ROUTE.KYC_SUMMARY, params: {} };
  } else if (currentStepId === ROUTE.BANK_ACCOUNT_VERIFICATION) {
    return { routeId: ROUTE.BANK_ACCOUNT_VERIFICATION, params: {} };
  } else if (
    currentStepId === "MANDATE_SETUP" ||
    currentStepId === "CREDIT_APPROVAL"
  ) {
    return { routeId: ROUTE.LOAN_AUTOPAY, params: {} };
  } else if (currentStepId === "AGREEMENT_SIGN") {
    return { routeId: ROUTE.LOAN_AGREEMENT, params: {} };
  }
};

export const nextStepId = async (
  currentStepId: string
): Promise<{ routeId: string; params: object }> => {
  const user: User = await SharedPropsService.getUser();

  if (user.linkedApplications[0].applicationState === "COMPLETED") {
    return { routeId: ROUTE.DASHBOARD, params: {} };
  } else if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
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
    } else if (
      currentStepId === "MANDATE_SETUP" ||
      currentStepId === "CREDIT_APPROVAL"
    ) {
      return { routeId: ROUTE.LOAN_AUTOPAY, params: {} };
    } else if (currentStepId === "AGREEMENT_SIGN") {
      return { routeId: ROUTE.LOAN_AGREEMENT, params: {} };
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
