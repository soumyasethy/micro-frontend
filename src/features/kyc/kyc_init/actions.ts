import { ActionFunction } from "@voltmoney/types";
import { AadharInitRepo } from "./repo";
import { AadharInitPayload } from "./types";
import { ROUTE } from "../../../routes";
import { ButtonProps } from "@voltmoney/schema";

export const AadharInitAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await AadharInitRepo(
    action.payload.applicationId,
    action.payload.aadhaarNumber
  );
  await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
    loading: false,
  });
  if (response.hasOwnProperty("status") && response.status === "SUCCESS")
    await navigate(ROUTE.KYC_AADHAAR_VERIFICATION_OTP);
  else if (
    response.hasOwnProperty("statusCode") &&
    response.statusCode === "400"
  )
    await navigate(ROUTE.KYC_AADHAAR_VERIFICATION);
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
