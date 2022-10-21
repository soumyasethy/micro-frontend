import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { api, StoreKey } from "../../configs/api";
import { fetchUserDetails } from "../otp_verify/actions";
import { User } from "../otp_verify/types";
import { ButtonProps } from "@voltmoney/schema";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const token = await props.asyncStorage.get(StoreKey.accessToken);
  console.warn("**** using emailId ****", emailId);
  const headers = new Headers();
  headers.append("X-AppMode", "INVESTOR_VIEW");
  headers.append("X-AppPlatform", "VOLT_MOBILE_APP");

  headers.append("Authorization", `Bearer ${token}`);

  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    secureDataAttributeDetailsMap: {
      EMAIL: {
        secureDataAttributeDetails: {
          value: emailId,
          sources: ["SELF"],
          verified: true,
          verificationSources: [`web`],
          collectedOn: `${Date.now()}`,
          verifiedOn: `${Date.now()}`,
        },
        isPrimary: true,
      },
    },
  });

  const requestOptions = {
    method: "PATCH",
    headers: headers,
    body: raw,
  };

  await fetch(
    `${api.accountAttributes}${action.payload.applicationId}`,
    requestOptions
  )
    .then(async (response) => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
      if (response.status === 200) {
        const user: User = await props.asyncStorage
          .get(StoreKey.userContext)
          .then((response) => JSON.parse(response));

        user.linkedBorrowerAccounts[0].accountHolderEmail =
          action.payload.value;
        console.warn("edited user->", JSON.stringify(user));
        await props.asyncStorage.set(
          StoreKey.userContext,
          JSON.stringify({ ...user })
        );
        await fetchUserDetails(action, _datastore, {
          setDatastore,
          ...props,
        });
      }
    })
    .catch(async (error) => {
      console.log("error", error);
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
    });
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email ****", action.payload.value);
  emailId = action.payload.value;
};
