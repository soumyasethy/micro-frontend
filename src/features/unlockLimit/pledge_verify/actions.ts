import { ActionFunction } from "@voltmoney/types";
import { OtpPledgePayload } from "./types";
import { AuthPledgeRepo } from "./repo";
import { nextStepId } from "../../../configs/utils";

export const verifyOTP: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { handleError, navigate }
): Promise<any> => {
  console.log("verify otp");
  if (action.payload.value.length !== 6) return;
  const response = await AuthPledgeRepo(
    action.payload.assetRepository,
    action.payload.value
  );
  console.warn("AuthPledgeRepo", response);
  if (response) {
    await handleError(response, {
      success: "Rs 30000 unlocked successfully!",
      failed: "Failed",
    });
  }
  const currentStepId = response.updatedApplicationObj.currentStepId;
  const routeObj = await nextStepId(currentStepId);
  await navigate(routeObj.routeId, routeObj.params);
};

export const goBack: ActionFunction<OtpPledgePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
