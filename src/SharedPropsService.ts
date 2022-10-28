import { User } from "./features/otp_verify/types";

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
}

function getUser() {
  if (_globalProps && _globalProps.user) {
    return _globalProps.user;
  }
  return null;
}
async function setToken(access_token: string) {
  _globalProps.access_token = access_token;
}

function getToken() {
  if (_globalProps && _globalProps.access_token) {
    return _globalProps.access_token;
  }
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
