import { ActionFunction } from "@voltmoney/types";
import { getAppHeader } from "../../../configs/config";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { ButtonProps, CameraPickerProps } from "@voltmoney/schema";
import { AadharInitPayload } from "../kyc_init/types";
import { ROUTE } from "../../../routes";

export const PhotoVerifyAction: ActionFunction<any> = async (
  action,
  _datastore,
  { network, navigate, setDatastore, showPopup }
): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  await network
    .post(
      api.photoVerify,
      {
        applicationId: (
          await SharedPropsService.getUser()
        ).linkedApplications[0].applicationId,
      },
      { headers: await getAppHeader() }
    )
    .then(async (response) => {
      await navigate(response.data.updatedApplicationObj.currentStepId);
    })
    .finally(async () => {
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
    });
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
