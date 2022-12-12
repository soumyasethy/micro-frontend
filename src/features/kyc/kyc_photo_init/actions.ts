import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { CameraPayload } from "./types";
import { CameraPickerProps } from "@voltmoney/schema";
import { stopCamera } from "../../../configs/utils";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { api } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";

let imageUploadUrl = "";
export const CameraAction: ActionFunction<CameraPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network }
): Promise<any> => {
  let base64Image: string = action.payload.value;
  base64Image = base64Image.replace(/^data:image\/[a-z]+;base64,/, "");
  const user: User = await SharedPropsService.getUser();

  const imageUploadResponse = await network.post(
    api.photoInit,
    {
      applicationId: user.linkedApplications[0].applicationId,
      imageName: `${user.linkedApplications[0].applicationId}_${user.linkedBorrowerAccounts[0].accountHolderPhoneNumber}.txt`,
      imageType: "image/jpeg",
    },
    { headers: await getAppHeader() }
  );
  if (imageUploadResponse.status === 200) {
    imageUploadUrl = imageUploadResponse.data.stepResponseObject;
  }
  if (!imageUploadUrl) return;
  const response = await network.put(imageUploadUrl, base64Image, {
    headers: { "Content-Type": "image/jpeg" },
  });
  if (response.status === 200) {
    await setDatastore(ROUTE.CAMERA_CAPTURE, "camera", <CameraPickerProps>{
      isShowVideo: false,
    });
    await navigate(ROUTE.KYC_AFTER_CAMERA, { photo: base64Image });
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
