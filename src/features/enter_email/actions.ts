import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { api, StoreKey } from "../../configs/api";
import { User } from "../otp_verify/types";
import { ButtonProps } from "@voltmoney/schema";
import SharedPropsService from "../../SharedPropsService";
import { saveAttribute } from "./repo";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { setDatastore, ...props }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  await saveAttribute(
    action.payload.applicationId,
    "EMAIL",
    action.payload.value
  );
  //await setDatastore(action.routeId, "continue", <ButtonProps>{
  //         loading: false,
  //       });
  // if (response.status === 200) {
  //   const user: User = await props.asyncStorage
  //       .get(StoreKey.userContext)
  //       .then((response) => JSON.parse(response));
  //
  //   user.linkedBorrowerAccounts[0].accountHolderEmail =
  //       action.payload.value;
  //   console.warn("edited user->", JSON.stringify(user));
  //   await props.asyncStorage.set(
  //       StoreKey.userContext,
  //       JSON.stringify({ ...user })
  //   );
  //   await fetchUserDetails(action, _datastore, {
  //     setDatastore,
  //     ...props,
  //   });
  // }
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  console.warn("**** update email ****", action.payload.value);
  emailId = action.payload.value;
};
