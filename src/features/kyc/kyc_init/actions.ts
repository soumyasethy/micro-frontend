import { ActionFunction } from "@voltmoney/types";
import { AadharInitRepo } from "./repo";
import { AadharInitPayload } from "./types";
import { ROUTE } from "../../../routes";
import { ButtonProps } from "@voltmoney/schema";
import {DigioDocsStatus, DigioKycStatus, ImportScriptSrc} from "../../../configs/constants";
import {getDigio, nextStepCredStepper, nextStepId} from "../../../configs/utils";
import { api } from "../../../configs/api";
import { User } from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import { getAppHeader } from "../../../configs/config";

let pollInterval;

export const AadharInitAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, importScript, network, digio }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
    loading: true,
  });

  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;

  importScript(
    ImportScriptSrc.DIGIO_SCRIPT,
    getDigio,
    async (digio_response) => {
      network
        .post(
          `${api.digioKycCheckRequestStatusOnCallBack}${applicationId}`,
          {},
          {
            headers: await getAppHeader(),
          }
        )
        .then(async (response) => {
          clearInterval(pollInterval);
          console.log("Success: ", response);
          console.log("Digio_Response", digio_response);
          const routeObj = await nextStepId(response.data.updatedApplicationObj.currentStepId)
          console.warn("**** NextStep Route ****", routeObj);
          await navigate(routeObj.routeId, routeObj.params);
        });
    },
    async (digio_response) => {
      clearInterval(pollInterval);
      console.log("Failure Digio_Response", digio_response);
    }
  );
  // Digio Kyc Mandate
  await network
    .post(
      `${api.digioKycInitiateRequest}${applicationId}`,
      {},
      {
        headers: await getAppHeader(),
      }
    )
    .then((response) => {
      if (response.status === 200) {
        if (response.data && response.data.stepResponseObject) {
          const requestId = response.data.stepResponseObject.requestId;
          const tokenId = response.data.stepResponseObject.tokenId;
          //@ts-ignore
          digio.init();
          console.log("RequestId: ", requestId);
          console.log("PhoneNumber: ", user.user.phoneNumber);
          console.log("tokenId: ", tokenId);
          digio.submit(requestId, user.user.phoneNumber, tokenId);
          //polling
          pollInterval = setInterval(async () => {
            network
              .post(
                `${api.digioKycCheckRequestStatus}${applicationId}`,
                {},
                {
                  headers: await getAppHeader(),
                }
              )
              .then(async (res) => {
                if (
                  res &&
                  res.data &&
                  res.data.stepResponseObject !== DigioKycStatus.CREATED
                ) {
                  console.log("Verification Completed");
                  clearInterval(pollInterval);
                  const routeObj = await nextStepId(res.data.updatedApplicationObj.currentStepId)
                  console.warn("**** NextStep Route ****", routeObj);
                  await navigate(routeObj.routeId, routeObj.params);
                }
              });
          }, 5000);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

  await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
    loading: false,
  });
};
export const GoBackAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  await goBack();
};
