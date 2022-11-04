import { ActionFunction } from "@voltmoney/types";
import { defaultHeaders } from "../../../configs/config";
import { api } from "../../../configs/api";
import SharedPropsService from "../../../SharedPropsService";
import { ROUTE } from "../../../routes";
import { ButtonProps } from "@voltmoney/schema";

export const PhotoVerifyAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, setDatastore }
): Promise<any> => {
  console.warn("**** PhotoVerify Action Triggered ****", action);

  const raw = JSON.stringify({
    applicationId: (await SharedPropsService.getUser()).linkedApplications[0]
      .applicationId,
  });

  const requestOptions = {
    method: "POST",
    headers: await defaultHeaders(),
    body: raw,
  };
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await fetch(api.photoVerify, requestOptions)
    .then((response) => response.json())
    .catch(async (error) => {
      console.log("error", error);
      await setDatastore(action.routeId, "continue", <ButtonProps>{
        loading: false,
      });
    });
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  if (response.statusCode === "200") await navigate(ROUTE.KYC_AADHAAR_CONFIRM);
};
export const RetakePhoto: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
