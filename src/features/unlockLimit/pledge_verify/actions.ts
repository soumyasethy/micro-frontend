import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";
import { AuthPledgeRepo } from "./repo";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage, showPopup, handleError }
): Promise<any> => {
  console.log("verify otp");
  if (action.payload.value.length !== 4) return;
  const response = await AuthPledgeRepo("CAMS", action.payload.value);
  console.warn('AuthPledgeRepo',response)
  if (response) {
    await handleError(response, {success:'Unlocked', failed:'Fail'});
  }

  // await navigate(ROUTE.MODIFY_LIMIT);
};
