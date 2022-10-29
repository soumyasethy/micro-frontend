import { ActionFunction } from "@voltmoney/types";
import { Authentication, LoginAction, OTPPayload, User } from "./types";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import SharedPropsService from "../../../SharedPropsService";
import { fetchUserDetails, loginRepo, nextStep } from "./repo";

export const login: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  const response: Authentication = await loginRepo(
    action.payload.value,
    action.payload.username
  );

  if (response.status === "success" && response.jwt) {
    await SharedPropsService.setToken(response.jwt);
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.SUCCESS,
    });
    const user: User = await fetchUserDetails();
    const nextRoute = await nextStep(user);
    await navigate(nextRoute.routeId, nextRoute.params);
  } else {
    //update to error state
    await setDatastore(action.routeId, action.payload.widgetId, <
      TextInputProps
    >{
      state: InputStateToken.ERROR,
      caption: { error: response.message },
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
