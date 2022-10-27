import { ActionFunction } from "@voltmoney/types";
import { AadharInitRepo } from "./repo";
import { AadharInitPayload } from "./types";
import { ROUTE } from "../../routes";

export const AadharInitAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  const response = await AadharInitRepo(
    action.payload.aadhaarNumber,
    action.payload.applicationId
  );
  console.warn("response", response);
  await navigate(ROUTE.KYC_AADHAAR_VERIFICATION);
};
