import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { photoInitRepo } from "./repo";
import { CameraPayload } from "./types";
import { CameraPickerProps } from "@voltmoney/schema";

let imageUploadUrl = "";
export const CameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  const video = document.querySelector("video");
  const mediaStream = video.srcObject;
  if ("getTracks" in mediaStream) {
    const tracks = mediaStream.getTracks();
    tracks[0].stop();
    tracks.forEach((track) => track.stop());
  }

  let base64Image: string = action.payload.value;
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
  imageUploadUrl = await photoInitRepo();
  const headers = new Headers({ "Content-Type": "image/jpeg" });
  try {
    const response = await fetch(imageUploadUrl, {
      method: "PUT",
      headers: headers,
      body: base64Image,
    });
    if (response) {
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
  { goBack }
): Promise<any> => {
  await goBack();
};
