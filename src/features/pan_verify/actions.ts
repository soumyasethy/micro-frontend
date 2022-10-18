import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, PanPayload } from "./types";
import { api, StoreKey } from "../../configs/api";
import { fetchUserContext } from "../otp_verify/actions";
import { ROUTE } from "../../routes";
import { User } from "../otp_verify/types";

let pan: string = "";

export const verifyPan: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { asyncStorage, ...props }
): Promise<any> => {
  const token = await asyncStorage.get(StoreKey.accessToken);
  const headers = new Headers();
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    applicationId: `${action.payload.applicationId}`,
    panNumber: `${pan}`,
  });

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };

  await fetch(api.panVerify, requestOptions)
    .then((response) => response.json())
    .then(async (result) => {
      props.navigate(ROUTE.PAN_CONFIRM_NAME, {
        name: result.stepResponseObject.fullName,
      });
    })
    .catch((error) => console.log("error", error));
};
export const textOnChange: ActionFunction<PanPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update pan ****", action.payload.value);
  pan = action.payload.value;
};
