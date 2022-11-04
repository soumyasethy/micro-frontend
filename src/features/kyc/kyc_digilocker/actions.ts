import { ActionFunction } from "@voltmoney/types";
import { AadharInitRepo } from "./repo";
import { AadharInitPayload } from "./types";
import { ROUTE } from "../../../routes";

export const AadharInitAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  const response = await AadharInitRepo(
    action.payload.applicationId,
    action.payload.aadhaarNumber
  );
  console.warn("response", response);
  if (response.hasOwnProperty("status") && response.status === "SUCCESS")
    await navigate(ROUTE.KYC_AADHAAR_VERIFICATION_OTP);
  else if (
    response.hasOwnProperty("statusCode") &&
    response.statusCode === "400"
  )
    await navigate(ROUTE.KYC_AADHAAR_VERIFICATION);
};
