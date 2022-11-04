import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../routes";
import { photoInitRepo } from "./repo";
import { CameraPayload } from "./types";

let imageUploadUrl = "";
export const CameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  let base64Image: string = action.payload.value;
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
  imageUploadUrl = await photoInitRepo();
  console.warn("image uploading to -->", imageUploadUrl);
  const headers = new Headers({ "Content-Type": "image/jpeg" });
  try {
    const response = await fetch(imageUploadUrl, {
      method: "PUT",
      headers: headers,
      body: base64Image,
    });
    console.warn("upload response ", response);
    if (response)
      await navigate(ROUTE.KYC_AFTER_CAMERA, { photo: base64Image });
  } catch (e) {
    console.warn("CameraAction", e);
  }
};
