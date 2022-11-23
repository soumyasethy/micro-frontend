import { User } from "../login/otp_verify/types";
import SharedPropsService from "../../SharedPropsService";
import { defaultHeaders } from "../../configs/config";
import { api } from "../../configs/api";

export const fetchUserDetails: () => Promise<User> = async () => {
  let user: User = {};
  const raw = JSON.stringify({});
  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };
  user = await fetch(api.userContext, requestOptions).then((response) =>
    response.json()
  );
  await SharedPropsService.setUser(user);
  return Promise.resolve(user);
};


