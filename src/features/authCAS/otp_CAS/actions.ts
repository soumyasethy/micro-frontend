import { ActionFunction } from "@voltmoney/types";
import { AuthCASPayload } from "./types";
import { api } from "../../../configs/api";
import { InputStateToken, TextInputProps } from "@voltmoney/schema";
import { AssetRepositoryMap, getAppHeader } from "../../../configs/config";
import { nextStepId } from "../../../configs/utils";
import _ from "lodash";

export const authCAS: ActionFunction<AuthCASPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, network, goBack }
): Promise<any> => {
  if (
    action.payload.value.length !==
    AssetRepositoryMap[action.payload.assetRepository].OTP_LENGTH
  )
    return;
  await setDatastore(action.routeId, "input", <TextInputProps>{
    state: InputStateToken.LOADING,
  });

  const response = await network.post(
    api.authCAS,
    {
      applicationId: action.payload.applicationId,
      otp: action.payload.value,
      assetRepository: action.payload.assetRepository,
    },
    { headers: await getAppHeader() }
  );
  if (response.status === 200) {
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.SUCCESS,
    });
    await goBack();

    if (_.get(response, "data.updatedApplicationObj.currentStepId", false)) {
      const nextRoute = await nextStepId(
        response.data.updatedApplicationObj.currentStepId
      );
      nextRoute.params = { ...nextRoute.params, response };
      await navigate(nextRoute.routeId, nextRoute.params);
    }
  } else {
    await setDatastore(action.routeId, "input", <TextInputProps>{
      state: InputStateToken.ERROR,
    });
  }
};

export const goBack: ActionFunction<any> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};
