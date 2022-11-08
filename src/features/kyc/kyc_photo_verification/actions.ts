import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";

export const CameraConfirmAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, cameraPicker }
): Promise<any> => {
  // console.warn("**** Camera Action Triggered ****", action);
  await goBack();
  await navigate(ROUTE.CAMERA_CAPTURE);
};
