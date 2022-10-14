import { ActionFunction } from "@voltmoney/types";
import { LoginAction, OTPPayload, ResendOtp, SignInUserSession } from "./types";
import { Auth } from "aws-amplify";
import { ROUTE } from "../../routes";
import { InputStateToken } from "@voltmoney/schema";
import { api, StoreKey } from "../../configs/api";
const token =
  "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.1hX9GSeI4XSyI320QYXHPuE-N_YB5uBvJbMUAtqHQ0T6n5afoXu8fcXB8DX-2LGxjJ4mSFJLNH_7i_HSuD872ddUwIeTRH5Fjebcwe8OPU5Bce319JV82hZlNh_Gnc5xCCTV7gEK-7T12dpaQyHXPNoU3PuGTRKmideWdKl6OA4blo7IBy8KkVHX8FRoYz-KkAOHTw-0LlX030LjFpPV1gPb_3iIPYPmtNSroPq4dX2A_7l3BtR0P05EBdnvUqPbg_DS-NRz7EBFCeUAten-ZHZNJGW7LiNOaK97ZStU2B29eY8tZw2X1hYXowofivuxsUR42oz1DYAY45EPcp5csg.GWb8Mc-wPuiEM2ID.K4IwbGgYDs7SFlHCxEbQioeQx8cRamuDv0aLorPDePBO2x9uOyyeaOas1S--31cNjCbnoHsdEGYCdOISAH2XnzugeW9rC1M275j2tDh13a76KWN9sTpOQ_Ae5vOTSwrFhIemXUejQEYwWA86X06j0h3KqcGJwzHajqDnbqjAIZQr5pFfIhZknWiFdVXC4cpDs8rv99dm4GopmLSHKiFRHbWeq9cY-mPGTFwqW7t-MlCD4zxHNWzgAxVQJjM6RtUzzuMwXaStGfoiRDN9aoJVQAPbBpDtvzVzXQHkcU9lcDWlOdXYPIRMguLynx4K0kjfuszQBvIU9UketDQg8EzTkXK0GRvIz5H_eS_aVzl4oA-vdx4LsaIrC1W1FeEs2M6mMKLBNbTeEsp1WEpAInO3gd8Z16fryeQ7AV5vJkQGH6l94Pbxu09W9JmdInwzFZkz3EsTxLTlbHK-1HmrSvQdoTTyI9FSE02vC_aVSYoX0CzO4rPtnshT1JWQ5mpaeT9HK9JONwUpHlz2BTIy7l3IlsJwf01Dp6DKy7-a1TYkXf7wawcE5r9433mW9NmUdwyw9-Ke3bRU1Av9sPdMgfkz7X5LgMyHmdfBavqqiG0b2UkvQNeuFy1dRKvDQ8vLbZvQEJ-mTQe5GvI2CHpBXXX9P32gSKFbNNnEmnKGmPZpKiZgu9RlfxDX5tk8B5WmkKvek-roqk0mDutI8scQw7hvsPjULkFfdM8wAq6L1d8oLB59pqMXrYRa22U0aX4Gix-MQr5-vyq5JMM_JOirdn1qgD2Mdf8-_SszhOBJUHcsluINmb-M0khFtPkHdArsVOV8g0Q5PQ8450n88ujh1xXRNZZPtZKO2_NsmKhcDnrq2Ycw_TdXO_QL-HEuMqI4cRWLL7Rj3DJt2oMgwzwW6sS6aBcZCK3jRYaGx-y3dIe1OBoUksHFVyLbTZqr0u0nkWeJdfi86OjNRE3ipZQfG141v8WlEF_z7U-xMEFOG3dgD0XTHioNBoLMjUaWWHD5X-81MTbKPCDF-GpOnHLU6UBU6UEvzupgWokwoZ3i_PIorrVNsvo4m53jG__Ikn91eI1x9vv2qZ7EP5PDQ6IkK_G5W6TfYpt_P1VXt0PEYbJ1x9zU0TQc1ttS6uQp7VPYBu-bBGoXrPGXj6h3hWqMdztzxYsZ2S1fKcmicFJpHrzipAGIH5I9BWP1Z7EsUOab1bG02MURR1-F7UbQ5PmYzu2e8se1N8Ay3NAcpVLgSqV2NeKusHR2FAlGvG2hN1lrR0QUWwns8gZdNta-tAkRnVebfiaahAd_MjJ4MQDaWQdu6StNz1HOxtAJRJAjLys_-A.SDEVfmPTJZQfTzFzsBYfRA";

export const loginCognito: ActionFunction<LoginAction & OTPPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, network, ...props }
): Promise<any> => {
  if (action.payload.value.length !== 6) return;
  try {
    const response: { signInUserSession: SignInUserSession } =
      await Auth.sendCustomChallengeAnswer(
        action.payload.session,
        action.payload.value
      );
    console.warn(
      "accessToken: --->",
      response.signInUserSession.accessToken.jwtToken
    );
    console.warn(
      "refreshToken: --->",
      response.signInUserSession.refreshToken.token
    );

    if (response.signInUserSession.accessToken) {
      await setDatastore(action.routeId, action.payload.widgetId, {
        state: InputStateToken.SUCCESS,
      });
      await asyncStorage.set(
        StoreKey.accessToken,
        response.signInUserSession.accessToken.jwtToken
      );
      await asyncStorage.set(
        StoreKey.refreshToken,
        response.signInUserSession.refreshToken.token
      );
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
      await navigate(ROUTE.EMAIL_VERIFY);
    } else {
      console.warn("Something went wrong");
      await setDatastore(action.routeId, action.payload.widgetId, {
        state: InputStateToken.ERROR,
      });
    }
  } catch (e) {
    console.warn("aws error: ", e);
    await setDatastore(action.routeId, action.payload.widgetId, {
      state: InputStateToken.ERROR,
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

export const resendOtp: ActionFunction<ResendOtp> = async (
  action,
  _datastore,
  { network }
) => {
  console.warn("resend otp number ->", action.payload.phoneNumber);

  const response = await network.post(api.sendOTP, {
    phoneNumber: `${action.payload.phoneNumber}`,
  });
  console.warn("resend otp response ->", response);
};
export const fetchUserContext: ActionFunction<any> = async (
  action,
  _datastore,
  { network, asyncStorage }
): Promise<any> => {
  console.warn("****** fetchUserContext *****");
  // const payload = JSON.stringify({
  //   partnerCode: "abCdEfgH",
  //   relationshipManagerCode: "abCdEfgH",
  // });
  const config = {
    url: api.userContext,
    headers: {
      // Authorization: `Bearer ${await asyncStorage.get(StoreKey.accessToken)}`,
      Authorization: `Bearer ${token}`,
      "X-AppPlatform": "SDK_KFIN",
      "Content-Type": "application/json",
      accept: "application/json",
    },
  };
  const response = await network.get(api.userContext, {
    headers: config.headers,
  }); //network.get(api.userContext, config.headers);
  console.warn("****** User Response ", response);
};
