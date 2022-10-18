import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload, ResendOtp, User } from "./types";
import { ROUTE } from "../../routes";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api, StoreKey } from "../../configs/api";

export const loginCognito: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;

  const headers = new Headers();
  headers.append("accept", "*/*");
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    otp: action.payload.value,
    phoneNo: action.payload.username,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };
  type Response = {
    status: string;
    message: string;
    jwt: string;
  };
  await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  await fetch(api.verifyOtp, requestOptions)
    .then((response) => response.json())
    .then(async (response: Response) => {
      if (response.status === "success") {
        await setDatastore(action.routeId, action.payload.widgetId, {
          state: InputStateToken.SUCCESS,
        });
        if (response.jwt) {
          await setDatastore(action.routeId, action.payload.widgetId, <
            TextInputProps
          >{
            state: InputStateToken.SUCCESS,
          });
          await asyncStorage.set(StoreKey.accessToken, response.jwt);
          await fetchUserContext(
            { payload: {}, type: "LOCAL_TRIGGER", routeId: ROUTE.OTP_VERIFY },
            _datastore,
            {
              navigate,
              setDatastore,
              asyncStorage,
              network,
              ...props,
            }
          );
        } else {
          //update to error state
          await setDatastore(action.routeId, action.payload.widgetId, <
            TextInputProps
          >{
            state: InputStateToken.ERROR,
            caption: { error: response.message },
          });
        }
      }
    })
    .catch((error) => console.log("error", error));
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const resendOtp: ActionFunction<ResendOtp> = async (
  action,
  _datastore,
  {}
) => {
  const headers = new Headers();
  headers.append("accept", "*/*");

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  await fetch(`${api.login}${action.payload.phoneNumber}`, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      console.warn("otp resent");
    })
    .catch(async (error) => {
      console.log("error", error);
    });
};
export const fetchUserContext: ActionFunction<any> = async (
  action,
  _datastore,
  { ...props }
): Promise<any> => {
  const token = await props.asyncStorage.get(StoreKey.accessToken);
  console.warn("***** token async ****", token);
  const headers = new Headers();
  headers.append("X-AppMode", "INVESTOR_VIEW");
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({});

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  const user: User = await fetch(api.userContext, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error", error));

  await props.asyncStorage.set(StoreKey.userContext, JSON.stringify(user));
  console.warn("User Logged In ->", JSON.stringify(user));
  await nextStep(
    { type: "NEXT_STEP", routeId: "NEXT_ID", payload: {} },
    {},
    { ...props }
  );
};

export const nextStep: ActionFunction<any> = async (
  action,
  _datastore,
  { asyncStorage, navigate }
): Promise<any> => {
  const user: User = await asyncStorage
    .get(StoreKey.userContext)
    .then((result) => JSON.parse(result));
  console.warn("fetched saved user", user);

  if (!user.linkedBorrowerAccounts[0].accountHolderEmail) {
    await navigate(ROUTE.EMAIL_VERIFY, {
      applicationId: user.linkedBorrowerAccounts[0].accountId,
    });
  } else if (
    user.linkedApplications[0].currentStepId === ROUTE.KYC_PAN_VERIFICATION
  ) {
    await navigate(ROUTE.KYC_PAN_VERIFICATION, {
      applicationId: user.linkedApplications[0].applicationId,
    });
  } else if (user.linkedApplications[0].currentStepId === ROUTE.MF_PLEDGING) {
    await navigate(ROUTE.MF_PLEDGING, {
      applicationId: user.linkedApplications[0].applicationId,
    });
  }
};
