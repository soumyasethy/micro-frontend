import { ActionFunction } from "@voltmoney/types";
import { getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { ButtonProps, CameraPickerProps } from "@voltmoney/schema";
import { AadharInitPayload } from "../kyc_init/types";
import { ROUTE } from "../../../routes";
import { User } from "../../login/otp_verify/types";
import { nextStepCredStepper } from "../../../configs/utils";
import _ from "lodash";

export const PhotoVerifyAction: ActionFunction<any> = async (
  action,
  _datastore,
  { network, navigate, setDatastore }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const user: User = await SharedPropsService.getUser();
  const imageName = `${user.linkedApplications[0].applicationId}_${user.linkedBorrowerAccounts[0].accountHolderPhoneNumber}.txt`;

  /** Generate Image Upload Link */
  const imageUploadLinkResponse = await network.post(
    api.photoInit,
    {
      applicationId: user.linkedApplications[0].applicationId,
      imageName,
      imageType: "image/jpeg",
    },
    { headers: await getAppHeader() }
  );
  if (imageUploadLinkResponse.status === 200) {
    /** Image Link Generated Successful **/
    if (!imageUploadLinkResponse.data.stepResponseObject) return;
    /** Upload Image to Generated Link **/
    const imageUploadResponse = await network.put(
      imageUploadLinkResponse.data.stepResponseObject,
      action.payload.base64Image,
      {
        headers: { "Content-Type": "image/jpeg" },
      }
    );
    if (imageUploadResponse.status === 200) {
      /** Image Uploaded Successfully **/
      const imageVerifyResponse = await network.post(
        api.photoVerify,
        {
          applicationId: user.linkedApplications[0].applicationId,
        },
        { headers: await getAppHeader() }
      );
      if (imageVerifyResponse.status === 200) {
        /** Photo Verification Successful **/
        user.linkedApplications[0] = _.get(
          imageVerifyResponse,
          "data.updatedApplicationObj"
        );
        await SharedPropsService.setUser(user);
        const routeObj = await nextStepCredStepper();
        await navigate(routeObj.routeId, routeObj.params);
      }
    }
    await setDatastore(action.routeId, "continue", <ButtonProps>{
      loading: false,
    });
  }
};
export const RetakePhoto: ActionFunction<any> = async (
  action,
  _datastore,
  { setDatastore, goBack }
): Promise<any> => {
  await setDatastore(ROUTE.CAMERA_CAPTURE, "camera", <CameraPickerProps>{
    isShowVideo: true,
  });
  await goBack();
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
  await goBack();
};
