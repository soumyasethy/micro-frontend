import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";

export const CameraConfirmAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  await navigate(ROUTE.CAMERA_CAPTURE);
};
export const GoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
