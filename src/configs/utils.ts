import { StepperItem, StepperStateToken } from "@voltmoney/schema";
import SharedPropsService from "../SharedPropsService";
import { StepStatusMap, User } from "../features/login/otp_verify/types";
import { ROUTE } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertNavProps } from "../features/popup_loader/types";
import { StoreKey } from "./api";
import {
  AssetRepositoryMap,
  AssetRepositoryType,
  ConfigTokens,
} from "./config";

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
export const getBankIconUrl = (bankCode) =>
  `https://volt-images.s3.ap-south-1.amazonaws.com/bank-logos/${bankCode}.svg`;

export const updateStepStatusMap = async (stepStatusMap: StepStatusMap) => {
  const user: User = await SharedPropsService.getUser();
  user.linkedApplications[0].stepStatusMap = stepStatusMap;
  await SharedPropsService.setUser(user);
};
export const updateCurrentStepId = async (currentStepId: string) => {
  const user: User = await SharedPropsService.getUser();
  user.linkedApplications[0].currentStepId = currentStepId;
  await SharedPropsService.setUser(user);
};

/*** don't call this  ****/
export const clearAllData = async () => {
  await AsyncStorage.removeItem(StoreKey.isPledgeFirstTime);
  await AsyncStorage.removeItem(StoreKey.accessToken);
  // await AsyncStorage.getAllKeys()
  //   .then((keys) => AsyncStorage.multiRemove(keys))
  //   .then(() => console.warn("Clear data"));
};

export const stepperRepo = async () => {
  let KYC_VERIFICATION: StepperStateToken;
  let message = "We’re processing. Check after sometime.";
  const user = await SharedPropsService.getUser();

  if (
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.COMPLETED &&
    user.linkedApplications[0].stepStatusMap.KYC_ADDITIONAL_DETAILS ===
      StepperStateToken.COMPLETED
  ) {
    KYC_VERIFICATION = StepperStateToken.COMPLETED;
  } else if (
    user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
    StepperStateToken.NOT_STARTED
  ) {
    KYC_VERIFICATION = StepperStateToken.NOT_STARTED;
  } else if (
    user.linkedApplications[0].stepStatusMap.KYC_AADHAAR_VERIFICATION ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.KYC_CKYC ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    // user.linkedApplications[0].stepStatusMap.KYC_PHOTO_VERIFICATION ===
    //   StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.KYC_SUMMARY ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.KYC_ADDITIONAL_DETAILS ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION ||
    user.linkedApplications[0].stepStatusMap.KYC_DOCUMENT_UPLOAD ===
      StepperStateToken.PENDING_MANUAL_VERIFICATION
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
      subTitle: "Verify Aadhaar & other details to complete KYC",
      horizontalTitle: "KYC",
      status: KYC_VERIFICATION,
      message:
        KYC_VERIFICATION === StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      step: "2",
      title: "Verify Bank Account ",
      subTitle: "Provide bank account for receiving money",
      horizontalTitle: "Bank account",
      status:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION,
      message:
        user.linkedApplications[0].stepStatusMap.BANK_ACCOUNT_VERIFICATION ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      step: "3",
      title: "Review Agreement",
      subTitle: "Verify the key usage terms and confirm",
      horizontalTitle: "Agreement",
      status: user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN,
      message:
        user.linkedApplications[0].stepStatusMap.AGREEMENT_SIGN ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      step: "4",
      title: "Setup AutoPay",
      subTitle: "Link your account for hassle-free repayments",
      horizontalTitle: "AutoPay",
      status: user.linkedApplications[0].stepStatusMap.MANDATE_SETUP,
      message:
        user.linkedApplications[0].stepStatusMap.MANDATE_SETUP ===
        StepperStateToken.PENDING_MANUAL_VERIFICATION
          ? message
          : "",
    },
  ];
  return data;
};
export const horizontalStepperRepo = stepperRepo;

export const nextStepCredStepper = async (currentStepId?: string) => {
  const user: User = await SharedPropsService.getUser();
  if (!currentStepId) {
    currentStepId = user.linkedApplications[0].currentStepId;
  }

  if (user.linkedApplications[0].applicationState === "COMPLETED") {
    return { routeId: ROUTE.DASHBOARD, params: {} };
  }

  const stepStatusMap = user.linkedApplications[0].stepStatusMap;

  console.log("currentStepId", currentStepId);
  console.log("stepStatusMap", stepStatusMap);

  if (currentStepId === ROUTE.KYC_AADHAAR_VERIFICATION) {
    return { routeId: ROUTE.KYC_DIGILOCKER, params: {} };
  } else if (currentStepId === ROUTE.KYC_PHOTO_VERIFICATION) {
    return { routeId: ROUTE.KYC_PHOTO_VERIFICATION, params: {} };
  } else if (currentStepId === ROUTE.KYC_ADDITIONAL_DETAILS) {
    return { routeId: ROUTE.KYC_ADDITIONAL_DETAILS, params: {} };
  } else if (currentStepId === ROUTE.KYC_DOCUMENT_UPLOAD_POA) {
    return { routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POA, params: {} };
  } else if (currentStepId === ROUTE.KYC_DOCUMENT_UPLOAD_POI) {
    return { routeId: ROUTE.KYC_DOCUMENT_UPLOAD_POI, params: {} };
  } else if (currentStepId === ROUTE.KYC_DOCUMENT_UPLOAD) {
    return { routeId: ROUTE.KYC_DOCUMENT_UPLOAD, params: {} };
  } else if (currentStepId === ROUTE.KYC_SUMMARY) {
    return { routeId: ROUTE.KYC_SUMMARY, params: {} };
  } else if (currentStepId === ROUTE.BANK_ACCOUNT_VERIFICATION) {
    return { routeId: ROUTE.BANK_ACCOUNT_VERIFICATION, params: {} };
  } else if (stepStatusMap.AGREEMENT_SIGN === StepperStateToken.NOT_STARTED) {
    return { routeId: ROUTE.LOAN_AGREEMENT_POLLING, params: {} };
  } else if (stepStatusMap.AGREEMENT_SIGN === StepperStateToken.IN_PROGRESS) {
    return { routeId: ROUTE.LOAN_AGREEMENT, params: {} };
  } else if (stepStatusMap.MANDATE_SETUP === StepperStateToken.IN_PROGRESS) {
    return { routeId: ROUTE.LOAN_REPAYMENT, params: {} };
  } else if (stepStatusMap.MANDATE_SETUP === StepperStateToken.NOT_STARTED) {
    return { routeId: ROUTE.LOAN_AUTOPAY, params: {} };
  }
};

export const nextStepId = async (
  currentStepId: string
): Promise<{ routeId: string; params: object }> => {
  const user: User = await SharedPropsService.getUser();

  if (user.linkedApplications[0].applicationState === "COMPLETED") {
    return { routeId: ROUTE.DASHBOARD, params: {} };
  }

  ///check if any application IN_PROGRESS
  else if (
    currentStepId ||
    user.linkedApplications[0].applicationState === "IN_PROGRESS"
  ) {
    if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
      // ***  Comment Email Verify FLow since google login is not working ***//

      const isGoogleLoginEnabled = await SharedPropsService.getConfig(
        ConfigTokens.IS_GOOGLE_LOGIN_ENABLED
      );
      return {
        // routeId: ROUTE.EMAIL_VERIFY,
        routeId: isGoogleLoginEnabled ? ROUTE.EMAIL_VERIFY : ROUTE.ENTER_EMAIL,
        params: {
          applicationId: user.linkedBorrowerAccounts[0].accountId,
        },
      };
    }
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
      const isPledgeFirstTime = await SharedPropsService.isPledgeFirstTime();
      if (isPledgeFirstTime) {
        return {
          routeId: ROUTE.CHECKING_LIMIT,
          params: {},
        };
      } else {
        return {
          routeId: ROUTE.MF_PLEDGE_PORTFOLIO,
          params: {},
        };
      }
    } else if (
      currentStepId === "KYC_CKYC" ||
      currentStepId === "KYC_PHOTO_VERIFICATION" ||
      currentStepId === "KYC_AADHAAR_VERIFICATION" ||
      currentStepId === "KYC_ADDITIONAL_DETAILS" ||
      currentStepId === "KYC_DOCUMENT_UPLOAD" ||
      currentStepId === "KYC_SUMMARY" ||
      currentStepId === "BANK_ACCOUNT_VERIFICATION" ||
      currentStepId === "MANDATE_SETUP" ||
      currentStepId === "CREDIT_APPROVAL" ||
      currentStepId === "AGREEMENT_SIGN" ||
      currentStepId === "KYC_DOCUMENT_UPLOAD_POA" ||
      currentStepId === "KYC_DOCUMENT_UPLOAD_POI"
    ) {
      return { routeId: ROUTE.KYC_STEPPER, params: {} };
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

export const stopCamera = () => {
  const video = document.querySelector("video");
  const mediaStream = video.srcObject;
  if ("getTracks" in mediaStream) {
    const tracks = mediaStream.getTracks();
    tracks[0].stop();
    tracks.forEach((track) => track.stop());
  }
};

export const maskSensitiveDetails = (
  str: string,
  start: number,
  end: number
) => {
  // if length is 13 then start = 4 and end = 9
  let maskedString = "";
  const len = str.length;
  const iterate = len - end;
  const lastDigit = str.substring(iterate);
  for (let i = 0; i < iterate; i++) {
    maskedString += "*";
  }
  return maskedString + lastDigit;
};

export const maskString = (str: string, start: number, end: number) => {
  // if length is 13 then start = 4 and end = 9
  let maskedString = "";
  if (str.startsWith("+91")) {
    str = str.substring(3);
  }
  for (let i = 0; i < str.length; i++) {
    if (i >= start && i <= end) {
      maskedString += "*";
    } else {
      maskedString += str[i];
    }
  }
  return maskedString;
};

export const addCommasToNumber = (num: number) => {
  return num.toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ",");
};

export const roundDownToNearestHundred = (num: number) => {
  return Math.floor(num / 100) * 100;
};

export const ceilToNearestHundred = (num: number) => {
  return Math.ceil(num / 100) * 100;
};

export const maskBankAccountNumber = (accountNo: string) => {
  if (accountNo.length > 4) {
    let showString = accountNo.slice(accountNo.length - 4);
    let maskString = "";
    let index = accountNo.length - 4;
    while (index > 0) {
      maskString += "X";
      index--;
    }
    return maskString.concat(showString);
  }
  return "Account number less than 4 digits";
};

export const isMorePortfolioRenderCheck = async () => {
  const casList = await SharedPropsService.getCasListOriginal();
  /*** check if the user has pledged any mf portfolio */
  const assetRepoMap = {};
  /*** Get unique asset repository from the cas list */
  for (let i = 0; i < casList.length; i++) {
    const item = casList[i];
    assetRepoMap[item.assetRepository] = true;
  }
  /*** remove if both Karvy and Cams are present */
  return !(
    Object.keys(assetRepoMap).length === 2 ||
    (Object.keys(assetRepoMap).length == 1 &&
      (AssetRepositoryMap[AssetRepositoryType.CAMS].isDisabled ||
        AssetRepositoryMap[AssetRepositoryType.KARVY].isDisabled))
  );
};

export const getParameters: (url: string) => {
  [key in string]: string;
} = (url: string) => {
  const params = {};
  let paramString = url.split("?")[1];
  let queryString = new URLSearchParams(paramString);
  for (let pair of queryString.entries()) {
    params[pair[0]] = pair[1];
  }
  return params;
};

export const isLimitMoreThanPledgeThreshold = async () => {
  const pledgeThreshold = await SharedPropsService.getCreditLimit();
  if (pledgeThreshold > 25000) {
    return true;
  } else {
    return false;
  }
};

export const removeCommasFromNumber = (num: string) => {
  return num.replace(/,/g, "");
};
