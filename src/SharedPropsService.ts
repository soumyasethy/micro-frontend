import { User } from "./features/login/otp_verify/types";
import { __isTest__ } from "./configs/config";
import { MockUser } from "./mock/MockUser";
import { MockToken } from "./mock/MockToken";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoreKey } from "./configs/api";
type GlobalProps = {
  user: User;
  access_token: string;
};

let _globalProps: GlobalProps = {
  user: {},
  access_token: "",
};

async function setGlobalProps(props: GlobalProps) {
  _globalProps = await props;
}

function getPropsValue(key?: string) {
  if (_globalProps && key) {
    return _globalProps[key];
  }
  return null;
}
async function setUser(props: User) {
  _globalProps.user = await props;
  await AsyncStorage.setItem(StoreKey.userContext, JSON.stringify(props));
}

async function getUser() {
  // if (__isTest__) {
  //   return MockUser;
  // }
  if (Object.values(_globalProps.user).length > 0) {
    return _globalProps.user;
  }
  try {
    const user: User = await JSON.parse(
      await AsyncStorage.getItem(StoreKey.userContext)
    );
    if (user) return user;
  } catch (e) {
    return null;
  }

  return null;
}
async function setToken(access_token: string) {
  _globalProps.access_token = access_token;
  await AsyncStorage.setItem(StoreKey.accessToken, access_token);
}

async function getToken() {
  // if (__isTest__) {
  //   return MockToken;
  // }
  if (_globalProps && _globalProps.access_token != "") {
    return _globalProps.access_token;
  }
  const token = await AsyncStorage.getItem(StoreKey.accessToken);
  _globalProps.access_token = token;
  console.warn("token------>", token);
  if (token) return token;

  return null;
}

export default {
  setGlobalProps,
  getPropsValue,
  setUser,
  getUser,
  setToken,
  getToken,
};
