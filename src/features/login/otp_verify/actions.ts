import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload, User } from "./types";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { clearAllData, nextStepId } from "../../../configs/utils";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import _ from "lodash";

export const login: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  await clearAllData();

  const loginResponse = await network.post(api.verifyOtp, {
    otp: action.payload.value,
    phoneNo: action.payload.username,
  });

  if (
    _.get(loginResponse, "data.status", "") === "success" &&
    loginResponse.data.jwt
  ) {
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

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
