import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, EmailPayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { nextStepId } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { AnalyticsEventTracker } from "../../../configs/constants";

let emailId: string = "";

export const saveEmailId: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { network, setDatastore, navigate, analytics }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const applicationId = (await SharedPropsService.getUser())
    .linkedBorrowerAccounts[0].accountId;
  const response = await network.patch(
    `${api.accountAttributes}${applicationId}`,
    {
      secureDataAttributeDetailsMap: {
        ["EMAIL"]: {
          secureDataAttributeDetails: {
            value: action.payload.value || emailId,
            sources: ["SELF"],
            verified: true,
            verificationSources: [`web`],
            collectedOn: `${Date.now()}`,
            verifiedOn: `${Date.now()}`,
          },
          isPrimary: true,
        },
      },
    },
    { headers: await getAppHeader() }
  );
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  const updatedUser: User = response.data;
  if (updatedUser) {
    analytics(AnalyticsEventTracker.borrower_sign_up["Event Name"], {
      ...AnalyticsEventTracker.borrower_sign_up,
    });
    // await SharedPropsService.setUser(updatedUser);
    // action?.payload?.setIsUserLoggedIn(updatedUser);

    const userContextResponse = await network.post(
      api.userContext,
      { onboardingPartnerCode: await SharedPropsService.getPartnerRefCode() },
      { headers: await getAppHeader() }
    );
    const user: User = userContextResponse.data;
    await SharedPropsService.setUser(updatedUser);
    action?.payload?.setIsUserLoggedIn(user);

    const route = await nextStepId(
      updatedUser.linkedApplications[0].currentStepId
    );
    await navigate(route.routeId, route.params);
  }
};
export const textOnChange: ActionFunction<EmailPayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  emailId = action.payload.value;
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.EMAIL_VERIFY);
};
