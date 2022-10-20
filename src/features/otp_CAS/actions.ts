import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload, ResendOtp, User } from "./types";
import { ROUTE } from "../../routes";
import { api, StoreKey } from "../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 4) return;
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });
  const token = await asyncStorage.get(StoreKey.accessToken);
  const headers = new Headers();
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId: action.payload.applicationId,
    otp: action.payload.value.length,
    assetRepository: action.payload.assetRepository,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  await fetch(api.authCAS, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      await setDatastore(action.routeId, "input", <TextInputProps>{
        state: InputStateToken.SUCCESS,
      });
      console.log(result);
    })
    .catch(async (error) => {
      await navigate(ROUTE.VERIFICATION_FAILED);
      console.log("error", error);
    });
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
