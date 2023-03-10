import { ActionFunction } from "@voltmoney/types";
import { OtherEmail } from "./types";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { saveAttribute } from "../enter_email/repo";
import { nextStepId } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";

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
