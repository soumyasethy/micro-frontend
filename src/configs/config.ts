import SharedPropsService from "../SharedPropsService";

export const __isTest__ = false;
export const __isMock__ = false;
export const defaultAuthHeaders = () => {
  const headers = new Headers();
  headers.append("X-EntityType", "BORROWER");
  headers.append(
    "X-AppPlatform",
    __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP"
  );
  headers.append("Content-Type", "application/json");
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
  return headers;
};

export const getAuthHeaders = () => ({
  "X-EntityType": "BORROWER",
  "X-AppPlatform": __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP",
  "Content-Type": "application/json",
});
export const getAppHeader = async () => ({
  "X-AppMode": "INVESTOR_VIEW",
  "X-AppPlatform": __isTest__ ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP",
  Authorization: `Bearer ${await SharedPropsService.getToken()}`,
  "Content-Type": "application/json",
});

export const APP_CONFIG = {
  POLLING_INTERVAL: 5000,
  AUTO_REDIRECT: 5000,
};

export enum AssetRepositoryType {
  CAMS = "CAMS",
  KARVY = "KARVY",
  DEFAULT = "KARVY",
}
export const AssetRepositoryMap = {
  [AssetRepositoryType.CAMS]: {
    value: AssetRepositoryType.CAMS,
    NAME: "Cams",
    OTP_LENGTH: 5,
    LIST: [],
  },
  [AssetRepositoryType.KARVY]: {
    VALUE: AssetRepositoryType.KARVY,
    NAME: "karvy",
    OTP_LENGTH: 6,
    LIST: [],
  },
};

export enum RegexConfig {
  EMAIL = "^^[a-zA-Z0-9._{|}-]*@[a-zA-Z0-9]+.^[A-Za-z]+${2,}$",
  MOBILE = "^[0-9]*$",
  PAN = "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
  AADHAR = "^[2-9]{1}[0-9]{11}$",
}

export enum DeepLinks {
  MOBILE_WHATSAPP = "whatsapp://send?phone=919611749097",
  WHATSAPP = "https://wa.me/919611749097",
  CALL = "tel:+919611749097",
  MAILTO= "mailto:support@voltmoney.in",
}