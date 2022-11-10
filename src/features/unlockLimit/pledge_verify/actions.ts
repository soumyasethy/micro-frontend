import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
   OtpPledgePayload
} from "./types";
import {
  ButtonProps,
  IconTokens,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";
import { clearAllData, showBottomSheet } from "../../../configs/utils";
import { AuthPledgeRepo } from "./repo";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage,showPopup,handleError }
): Promise<any> => {
  console.log("verify otp")
  if (action.payload.value.length !== 4) return;
  const response = await AuthPledgeRepo(
    "CAMS",
    action.payload.value
  );

  if(response){
    handleError(response)
  }
  
 // await navigate(ROUTE.MODIFY_LIMIT);

};

