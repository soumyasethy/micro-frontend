import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";

export const CameraAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  console.warn("**** Camera Action Triggered ****", action);
  await goBack();
  // await cameraPicker();
  await navigate(ROUTE.KYC_AADHAAR_CONFIRM);
};
