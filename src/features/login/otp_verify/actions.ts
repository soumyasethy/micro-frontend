import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload, User } from "./types";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { nextStepId } from "../../../configs/utils";
import { api, partnerApi } from "../../../configs/api";
import { getAppHeader, getPartnerAuthHeaders } from "../../../configs/config";
import _ from "lodash";
import { ROUTE } from "../../../routes";


export const checkUserType: ActionFunction<any> = async (
  action,
  _datastore,  { ...props }
): Promise<any> => {
  const userType = await SharedPropsService.getUserType();
  switch (userType) {
    case "PARTNER":
      await partnerLogin(action,{},props);
      break;
    case "BORROWER":
      await login(action,{},props);
      break;
  }
};

export const partnerLogin: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  const loginResponse = await network.post(api.verifyOtp, {
    otp: action.payload.value,
    phoneNo: action.payload.username,
  });

  if (_.get(loginResponse, "status") === 200) {
    await SharedPropsService.setToken(loginResponse.data.jwt);
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.SUCCESS,
    });
    const userContextResponse = await network.post(
      partnerApi.userContext,
      {},
      { headers: await getAppHeader() }
    );
    const user: User = userContextResponse.data;
  
    await SharedPropsService.setUser(user);
    await navigate(ROUTE.ENTER_NAME);
   // const nextRoute = await nextStepId(
    //   user.linkedApplications[0].currentStepId
    // );
    // await navigate(nextRoute.routeId, nextRoute.params);
  } else {
    //update to error state
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.ERROR,
      caption: { error: loginResponse.data.message },
    });
  }
};


export const login: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, }
): Promise<any> => {
  console.log("login")
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  const loginResponse = await network.post(api.verifyOtp, {
    otp: action.payload.value,
    phoneNo: action.payload.username,
  });

  if (_.get(loginResponse, "status") === 200) {
    await SharedPropsService.setToken(loginResponse.data.jwt);
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.SUCCESS,
    });
    const userContextResponse = await network.post(
      api.userContext,
      {},
      { headers: await getAppHeader() }
    );
    const user: User = userContextResponse.data;
  
    await SharedPropsService.setUser(user);

    const nextRoute = await nextStepId(
      user.linkedApplications[0].currentStepId
    );
    await navigate(nextRoute.routeId, nextRoute.params);
  } else {
    //update to error state
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.ERROR,
      caption: { error: loginResponse.data.message },
    });
  }
};

export const getUserContext: ActionFunction<any> = async (
  action,
  _datastore,
  {  network }
): Promise<any> => {
  const userContextResponse = await network.post(
    api.userContext,
    {},
    { headers: await getAppHeader() }
  );
  const user: User = userContextResponse.data;
  return user;
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
