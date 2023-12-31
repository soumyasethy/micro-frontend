import { ActionFunction } from "@voltmoney/types";
import { ContinuePayload, NamePayload } from "./types";
import { ButtonProps } from "@voltmoney/schema";
import { nextStepId } from "../../configs/utils";
import { User } from "../login/otp_verify/types";
import SharedPropsService from "../../SharedPropsService";
import { ROUTE } from "../../routes";
import { api, partnerApi } from "../../configs/api";
import { getAppHeader } from "../../configs/config";

let name: string = "";
let email: string = "";

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
      partnerName: name,
      accountHolderEmail: email,
    },
    { headers: await getAppHeader() }
  );

  // api call end

  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  const updatedUser: User = response.data;
  if (updatedUser) {
    await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
  }
};
export const textOnChange_name: ActionFunction<NamePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  name = action.payload.value;
};

export const textOnChange_email: ActionFunction<NamePayload> = async (
  action,
  _datastore,
  {}
): Promise<any> => {
  email = action.payload.value;
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.EMAIL_VERIFY);
};
