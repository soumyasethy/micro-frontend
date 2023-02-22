import SharedPropsService from "../SharedPropsService";
import { getScreenType } from "../configs/platfom-utils";
import { Dimensions } from "react-native";
import { SCREEN_SIZE } from "@voltmoney/types";
import {IconTokens} from "@voltmoney/schema";

export const __isTest__ = false;
export const __isMock__ = false;

export const screenType = getScreenType(Dimensions.get("window").width);

export const defaultAuthHeaders = () => {
  const headers = new Headers();
  headers.append("X-EntityType", "BORROWER");
  headers.append(
    "X-AppPlatform",
    __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP"
  );
  headers.append("Content-Type", "application/json");
  if (screenType === SCREEN_SIZE.X_SMALL || screenType === SCREEN_SIZE.SMALL) {
    headers.append("X-DeviceType", "Mobile");
  } else {
    headers.append("X-DeviceType", "Desktop");
  }
  return headers;
};
export const defaultHeaders = async () => {
  const headers = new Headers();
  headers.append("X-AppMode", "INVESTOR_VIEW");
  headers.append(
    "X-AppPlatform",
    __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP"
  );
  headers.append(
    "Authorization",
    `Bearer ${await SharedPropsService.getToken()}`
  );
  headers.append("Content-Type", "application/json");
  if (screenType === SCREEN_SIZE.X_SMALL || screenType === SCREEN_SIZE.SMALL) {
    headers.append("X-DeviceType", "Mobile");
  } else {
    headers.append("X-DeviceType", "Desktop");
  }
  return headers;
};

export const getAuthHeaders = () => ({
  "X-EntityType": "BORROWER",
  "X-AppPlatform": __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP",
  "Content-Type": "application/json",
  "X-DeviceType":
    screenType === SCREEN_SIZE.X_SMALL || screenType === SCREEN_SIZE.SMALL
      ? "Mobile"
      : "Desktop",
});
export const getAppHeader = async () => ({

  "X-AppMode": "INVESTOR_VIEW",
  "X-AppPlatform": await SharedPropsService.getAppPlatform(),
  //"X-AppMode": "INVESTOR_VIEW",
  Authorization: `Bearer ${await SharedPropsService.getToken()}`,
  "Content-Type": "application/json",
  "X-DeviceType":
    screenType === SCREEN_SIZE.X_SMALL || screenType === SCREEN_SIZE.SMALL
      ? "Mobile"
      : "Desktop",
});

export const getPartnerAuthHeaders = () => ({
  "X-EntityType": "PARTNER",
  "X-AppPlatform": __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP",
  "Content-Type": "application/json",
});


export const APP_CONFIG = {
  POLLING_INTERVAL: 5000,
  AUTO_REDIRECT: 5000,
  MODAL_TRIGGER_TIMEOUT: 250,
  POP_UP_SIZE: {
    WIDTH: 600,
    HEIGHT: 600,
  },
};

export enum AssetRepositoryType {
  CAMS = "CAMS",
  KARVY = "KARVY",
}

export const PartnerAssetRepositoryMap = {
  [AssetRepositoryType.CAMS]: {
    value: AssetRepositoryType.CAMS,
    NAME: "Cams",
    OTP_LENGTH: 4,
    LIST: [],
  },
  [AssetRepositoryType.KARVY]: {
    VALUE: AssetRepositoryType.KARVY,
    NAME: "karvy",
    OTP_LENGTH: 5,
    LIST: [],
  },
};



export const AssetRepositoryMap = new Map([
  [
      AssetRepositoryType.CAMS, {
    value: AssetRepositoryType.CAMS,
    NAME: "CAMS",
    OTP_LENGTH: 5,
    LIST: [],
    isDisabled: false,
    MODE_OF_COMM: "email",
    PRIORITY: 1,
    ICON: IconTokens.Cams,
    IS_PLEDGED: false
  }],
  [
      AssetRepositoryType.KARVY, {
    VALUE: AssetRepositoryType.KARVY,
    NAME: "K-Fintech",
    OTP_LENGTH: 6,
    LIST: [],
    isDisabled: false,
    MODE_OF_COMM: "phone",
    PRIORITY: 2,
    ICON: IconTokens.Kfin,
    IS_PLEDGED: false
  }
  ]]);


export const getPrimaryAssetRepository = async () => {
  let [priorityMap] = new Map([...AssetRepositoryMap.entries()]
      .sort((a,b) => a[1].PRIORITY - b[1].PRIORITY));
  return priorityMap[0];
};

export enum RegexConfig {
  EMAIL = "^^[a-zA-Z0-9._{|}-]*@[a-zA-Z0-9]+.^[A-Za-z]+${2,}$",
  MOBILE = "^[0-9]*$",
  PAN = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
  AADHAR = "^[2-9]{1}[0-9]{11}$",
  ONLY_NUMBER = "^[0-9]*$",

}

export enum DeepLinks {
  MOBILE_WHATSAPP = "whatsapp://send?phone=919611749097",
  WHATSAPP = "https://wa.me/919611749097",
  CALL = "tel:+919611749097",
  MAILTO = "mailto:support@voltmoney.in",
}

export enum ConfigTokens {
  IS_PAN_EDIT_ALLOWED = "IS_PAN_EDIT_ALLOWED",
  IS_MF_FETCH_AUTO_TRIGGER_OTP = "IS_MF_FETCH_AUTO_TRIGGER_OTP",
  IS_GOOGLE_LOGIN_ENABLED = "IS_GOOGLE_LOGIN_ENABLED",
  IS_KYC_PHOTO_VERIFICATION = "IS_KYC_PHOTO_VERIFICATION",
  IS_MF_FETCH_BACK_ALLOWED = "IS_MF_FETCH_BACK_ALLOWED",
  MIN_AMOUNT_ALLOWED = "MIN_AMOUNT_ALLOWED",
  MAX_AMOUNT_ALLOWED = "MAX_AMOUNT_ALLOWED",
  IS_FIRST_JOURNEY = "IS_FIRST_JOURNEY"
  GET_UPDATES_ON_WHATSAPP_ALLOWED = "GET_UPDATES_ON_WHATSAPP_ALLOWED",
}

export enum ConfigValues {
  MinimumAmountAllowed = 25000,
  AADHAR = "^[2-9]{1}[0-9]{11}$"
}
