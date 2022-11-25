import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { photoInitRepo } from "./repo";
import { CameraPayload } from "./types";
import { CameraPickerProps } from "@voltmoney/schema";
import { stopCamera } from "../../../configs/utils";

let imageUploadUrl = "";
export const CameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  let base64Image: string = action.payload.value;
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
  imageUploadUrl = await photoInitRepo();
  try {
    const response = await network.put(imageUploadUrl, base64Image, {
      headers: { "Content-Type": "image/jpeg" },
    });
    if (response.status === 200) {
      await setDatastore(ROUTE.CAMERA_CAPTURE, "camera", <CameraPickerProps>{
        isShowVideo: false,
      });
      await navigate(ROUTE.KYC_AFTER_CAMERA, { photo: base64Image });
    }
  } catch (e) {
    console.warn("CameraAction Error ->", e);
  }
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
