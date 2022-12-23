import { User } from "./features/login/otp_verify/types";
import { __isMock__ } from "./configs/config";
import { MockUser } from "./mock/MockUser";
import { MockToken } from "./mock/MockToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreKey } from "./configs/api";
import { AvailableCASItem } from "./features/unlockLimit/unlock_limit/types";

export enum BUILD_TYPE {
  BORROWER_PRODUCTION = "BORROWER_PRODUCTION",
  BORROWER_STAGING = "BORROWER_STAGING",
  PARTNER_PRODUCTION = "PARTNER_PRODUCTION",
  PARTNER_STAGING = "PARTNER_STAGING",
}
type GlobalProps = {
  buildType: BUILD_TYPE;
  user: User;
  access_token: string;
  availableAuthCasMap: { [key in string]: AvailableCASItem };
  accountNumber: string;
  ref?: string;
};

let _globalProps: GlobalProps = {
  buildType: BUILD_TYPE.PARTNER_STAGING,
  user: {},
  access_token: "",
  availableAuthCasMap: {},
  accountNumber: "",
  ref: "",
};
async function setBuildType(buildType) {
  _globalProps.buildType = buildType;
}
export function getBuildType(): BUILD_TYPE {
  return _globalProps.buildType;
}

async function setAccountNumber(accountNumber: string) {
  _globalProps.accountNumber = accountNumber;
}
async function getAccountNumber() {
  return _globalProps.accountNumber;
}
async function setGlobalProps(props: GlobalProps) {
  _globalProps = await props;
}
async function getPartnerRefCode() {
  return _globalProps.ref;
}
async function setPartnerRefCode(ref: string) {
  _globalProps.ref = ref;
}

function getPropsValue(key?: string) {
  if (_globalProps && key) {
    return _globalProps[key];
  }
  return null;
}
async function setUser(props: User) {
  _globalProps.user = await props;
}

async function getUser() {
  if (__isMock__) {
    return MockUser;
  }
  if (Object.values(_globalProps.user).length > 0) {
    return _globalProps.user;
  }
  return null;
}
async function setToken(access_token: string) {
  _globalProps.access_token = access_token;
  await AsyncStorage.setItem(StoreKey.accessToken, access_token);
}

async function getToken() {
  if (__isMock__) {
    return MockToken;
  }
  if (_globalProps && _globalProps.access_token != "") {
    return _globalProps.access_token;
  }
  const token = await AsyncStorage.getItem(StoreKey.accessToken);
  _globalProps.access_token = token;
  if (token) return token;

  return null;
}

async function setAvailableCASMap(availableAuthCasMap: {
  [key in string]: AvailableCASItem;
}) {
  _globalProps.availableAuthCasMap = availableAuthCasMap;
}

async function getAvailableCASMap() {
  return _globalProps.availableAuthCasMap;
}

async function setOnboarding(boolean: boolean) {
  // isOnboardingSeen.seen = boolean;
  await AsyncStorage.setItem(
    StoreKey.isLoadedFirstTime,
    JSON.stringify(boolean)
  );
}

async function getOnboarding() {
  return await AsyncStorage.getItem(StoreKey.isLoadedFirstTime);
}
async function setPledgeFirstTime(boolean: boolean) {
  await AsyncStorage.setItem(
    StoreKey.isPledgeFirstTime,
    JSON.stringify(boolean)
  );
}

async function isPledgeFirstTime(): Promise<boolean> {
  return !!(await AsyncStorage.getItem(StoreKey.isPledgeFirstTime));
}

export default {
  setBuildType,
  getBuildType,
  setGlobalProps,
  getPropsValue,
  setUser,
  getUser,
  setToken,
  getToken,
  setAvailableCASMap,
  getAvailableCASMap,
  setOnboarding,
  getOnboarding,
  getAccountNumber,
  setAccountNumber,
  setPledgeFirstTime,
  isPledgeFirstTime,
  setPartnerRefCode,
  getPartnerRefCode,
};
