import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  OtpPayload
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

export const verifyOTP: ActionFunction<OtpPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
  console.log("verify otp")
  if (action.payload.value.length !== 4) return;
  // await setDatastore(action.routeId, action.payload.widgetId, <TextInputProps>{
  //   state: InputStateToken.LOADING,
  // });
  // await clearAllData();
  const response = await AuthPledgeRepo(
    "CAMS",
    action.payload.value
  );

  const route = showBottomSheet({
    // title: result.statusCode,
    message: response.message,
    primary: true,
    iconName: IconTokens.Volt,
  });
 // await navigate(ROUTE.MODIFY_LIMIT);

};

