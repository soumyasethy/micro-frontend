import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";

export const CameraConfirmAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack }
): Promise<any> => {
  await goBack();
  await navigate(ROUTE.CAMERA_CAPTURE);
};
export const GoBackAction: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
