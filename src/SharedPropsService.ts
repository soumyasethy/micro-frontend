import { User } from "./features/login/otp_verify/types";
import {  __isMock__ } from "./configs/config";
import { MockUser } from "./mock/MockUser";
import { MockToken } from "./mock/MockToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreKey } from "./configs/api";
import { AvailableCASItem } from "./features/unlockLimit/unlock_limit/types";

export enum USERTYPE {
  BORROWER = "BORROWER",
  PARTNER = "PARTNER"
}

type GlobalProps = {
  user: User;
  access_token: string;
  availableAuthCasMap: { [key in string]: AvailableCASItem };
  accountNumber: string;
  userType:USERTYPE;
  partnerRefCode?: string;
};
let _globalProps: GlobalProps = {
  user: {},
  access_token: "",
  availableAuthCasMap: {},
  accountNumber: "",
  userType:USERTYPE.PARTNER
};

async function setUserType(userType: USERTYPE){
  _globalProps.userType = userType;
}

async function getUserType(){
  return _globalProps.userType;
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
  console.warn("*** getPartnerRefCode ***", _globalProps.partnerRefCode);
  return _globalProps.partnerRefCode;
}
async function setPartnerRefCode(partnerRefCode: string) {
  _globalProps.partnerRefCode = partnerRefCode;
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
  setUserType,
  getUserType,
  setPartnerRefCode,
  getPartnerRefCode,
};
