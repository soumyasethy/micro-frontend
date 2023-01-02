import { User } from "./features/login/otp_verify/types";
import { __isMock__, AssetRepositoryType } from "./configs/config";
import { MockUser } from "./mock/MockUser";
import { MockToken } from "./mock/MockToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreKey } from "./configs/api";
import { AvailableCASItem } from "./features/unlockLimit/unlock_limit/types";

export type AssetRepositoryConfigItemType = {
  isFetched?: boolean;
  isPledgedRequired?: boolean;
  isPledged?: boolean;
  priority?: number;
};
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
  url?: string;
  assetRepositoryType?: AssetRepositoryType;
  assetRepositoryConfig?: {
    [key in AssetRepositoryType]: AssetRepositoryConfigItemType;
  };
  casListOriginal?: AvailableCASItem[];
};

let _globalProps: GlobalProps = {
  buildType: BUILD_TYPE.BORROWER_STAGING,
  user: {},
  access_token: "",
  availableAuthCasMap: {},
  accountNumber: "",
  ref: "",
  /*** Default asset repository */
  assetRepositoryType: AssetRepositoryType.KARVY,
  assetRepositoryConfig: {
    /*** Sequence of fetching asset repository ***/
    [AssetRepositoryType.KARVY]: {
      isFetched: false,
      isPledgedRequired: false,
      isPledged: false,
      priority: 1,
    },
    [AssetRepositoryType.CAMS]: {
      isFetched: false,
      isPledgedRequired: false,
      isPledged: false,
      priority: 2,
    },
  },
  casListOriginal: [],
};
export function setBuildType(buildType) {
  _globalProps.buildType = buildType;
}
export function getBuildType(): BUILD_TYPE {
  return _globalProps.buildType;
}
/*** Asset repository ***/
async function setAssetRepositoryType(
  assetRepositoryType: AssetRepositoryType
) {
  _globalProps.assetRepositoryType = assetRepositoryType;
}
async function getAssetRepositoryType() {
  return _globalProps.assetRepositoryType;
}
async function getAssetRepositoryFetchMap() {
  return _globalProps.assetRepositoryConfig;
}
async function setAssetRepositoryFetchMap(
  value: AssetRepositoryConfigItemType,
  type?: AssetRepositoryType
) {
  if (type) {
    _globalProps.assetRepositoryConfig[type] = value;
  } else {
    _globalProps.assetRepositoryConfig[_globalProps.assetRepositoryType] =
      value;
  }
}
/*** End Asset repository ***/

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
async function getUrlParams() {
  const timestamp = new Date().getTime();
  const urlWithDate = await AsyncStorage.getItem(StoreKey.urlWithDate);
  if (urlWithDate && urlWithDate.includes("&timestamp=")) {
    const dataArray = urlWithDate.split("&timestamp=");
    const time = parseInt(dataArray[1]) || 0;
    if (time) {
      const diff = timestamp - time;
      if (diff > 2419200000) {
        return null;
      } else {
        return dataArray[0];
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
async function setUrlParams(url: string) {
  if (
    url.includes(
      "utm_source" ||
        "utm_medium" ||
        "utm_campaign" ||
        "utm_content" ||
        "utm_id"
    )
  ) {
    const urlWithDate = url + "&timestamp=" + new Date().getTime();
    await AsyncStorage.setItem(StoreKey.urlWithDate, urlWithDate);
  }
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

async function setCasListOriginal(casListOriginal: AvailableCASItem[]) {
  _globalProps.casListOriginal = casListOriginal;
}
async function getCasListOriginal() {
  return _globalProps.casListOriginal;
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
  setAssetRepositoryType,
  getAssetRepositoryType,
  getAssetRepositoryFetchMap,
  setAssetRepositoryFetchMap,
  setCasListOriginal,
  getCasListOriginal,
  setUrlParams,
  getUrlParams,
};
