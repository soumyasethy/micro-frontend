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
