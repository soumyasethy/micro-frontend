import SharedPropsService from "../SharedPropsService";
const isTest = true;
export const config = {
  headers: {
    "X-AppPlatform": isTest ? "VOLT_MOBILE_APP_TEST" : "VOLT_MOBILE_APP",
    Authorization: `Bearer ${SharedPropsService.getToken()}`,
    "Content-Type": "application/json",
  },
  baseUrl:
    "http://beta-appor-y52xud3gnv47-417447330.ap-south-1.elb.amazonaws.com",
};
