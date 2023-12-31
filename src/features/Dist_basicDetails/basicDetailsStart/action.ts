import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, NamePayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { nextStepId } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";
import { api, partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

let name: string = "";

export const Go_Next_Action: ActionFunction<{ stepId?: string }> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** NextStep Action triggered ****", action);
  // 
  const stepper = await SharedPropsService.getStepperData();

  const nextroute = stepper.filter((value) => value.status === "IN_PROGRESS");
  if (nextroute.length > 0) {
    if (nextroute[0].title == "Basic Details") {
      navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
      return;
    } else
      if (nextroute[0].title == "Bank Details") {
        navigate(ROUTE.DIST_BANK_ACCOUNT_ADD);
        return;
      } else
        if (nextroute[0].title == "Fetch Portfolio") {
          navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
          return;
        } else
          if (nextroute[0].title == "Select Portfolio") {
            navigate(ROUTE.PORTFOLOIO_START);
            return;
          }

  } else {
    await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
  }
};

export const saveName: ActionFunction<ContinuePayload> = async (
  action,
  _datastore,
  { network, setDatastore, navigate }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const accountId = (await SharedPropsService.getUser())
    .linkedPartnerAccounts[0].accountId;


  const response = await network.patch(
    `${partnerApi.accountAttributes}${accountId}`,
    {
      partnerName: name
    },
    { headers: await getAppHeader() }
  );

  // api call end

  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  const updatedUser: User = response.data;
  if (updatedUser) {
    // await SharedPropsService.setUser(updatedUser);
    // const route = await nextStepId(
    //   updatedUser.linkedApplications[0].currentStepId
    // );
    // await navigate(route.routeId, route.params);
    await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
    // await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
  }
};
export const textOnChange: ActionFunction<NamePayload> = async (
  action,
  _datastore,
  { }
): Promise<any> => {
  name = action.payload.value;
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};