import { ActionFunction } from "@voltmoney/types";
// import { signInGoogle, signInGoogleWeb } from "./repo";
import { GoogleLoginResponse, OtherEmail } from "./types";
import { ROUTE } from "../../../routes";
// import { saveEmailId } from "../enter_email/actions";
// import { ContinuePayload } from "../enter_email/types";
import SharedPropsService from "../../../SharedPropsService";
import { saveAttribute } from "../enter_email/repo";
import { nextStepId } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import { Platform } from "react-native";

export const loginGoogle: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate,metaData }
): Promise<any> => {
  const accountId = (await SharedPropsService.getUser())
    .linkedBorrowerAccounts[0].accountId;
  const updatedUser: User = await saveAttribute(
    accountId,
    "EMAIL",
    action.payload.value,
    metaData.platform.OS,
  );
  await SharedPropsService.setUser(updatedUser);
  const route = await nextStepId(
    updatedUser.linkedApplications[0].currentStepId
  );
  await navigate(route.routeId, route.params);
};
export const otherEmail: ActionFunction<OtherEmail> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.ENTER_EMAIL, { applicationId: action.payload.applicationId });
};
