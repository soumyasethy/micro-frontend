import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { CameraPayload } from "./types";
import { CameraPickerProps, CameraPickerState } from "@voltmoney/schema";
import { stopCamera } from "../../../configs/utils";

export const CameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  await setDatastore(ROUTE.CAMERA_CAPTURE, "camera", <CameraPickerProps>{
    state: CameraPickerState.OFF,
  });
  let base64Image: string = action.payload.value;
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
  await navigate(ROUTE.KYC_AFTER_CAMERA, { photo: base64Image });
};

export const CancelCameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { goBack, setDatastore }
): Promise<any> => {
  await setDatastore(ROUTE.CAMERA_CAPTURE, "camera", <CameraPickerProps>{
    isShowVideo: false,
  });
  stopCamera();
  await goBack();
};
