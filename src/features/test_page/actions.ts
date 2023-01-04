import { ActionFunction } from "@voltmoney/types";
import sharedPropsService from "../../SharedPropsService";
import {User} from "../login/otp_verify/types";
import SharedPropsService from "../../SharedPropsService";
import {api} from "../../configs/api";
import {KycAdditionalDetailsPayload} from "../kyc/kyc_additional_details/types";
import {getAppHeader, ImportScriptSrc} from "../../configs/config";
import { getDigio } from "../../configs/utils";

export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, network, digio, importScript }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  importScript(ImportScriptSrc.DIGIO_SCRIPT, getDigio)
  // Digio Kyc Mandate
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;
  await network.post(
      `${api.digioKycESignInitiateRequest}${applicationId}`,
      {},
      {
        headers: {
          "X-AppMode": "SDK_INVESTWELL",
          "X-AppPlatform": await SharedPropsService.getAppPlatform(),
          Authorization: `Bearer ${await SharedPropsService.getToken()}`,
          "Content-Type": "application/json",
        }
      }
  ).then(response => {
      if(response.status === 200) {
         if(response.data && response.data.stepResponseObject) {
             const requestId = response.data.stepResponseObject.requestId
             const tokenId = response.data.stepResponseObject.tokenId
             //@ts-ignore
             digio.init();
             console.log("RequestId: ", requestId)
             console.log("PhoneNumber: ", user.user.phoneNumber)
             console.log("tokenId: ", tokenId)
             digio.submit(requestId, user.user.phoneNumber, tokenId)
             //polling
             const pollInterval = setInterval(async ()=> {
                network.post(
                    `${api.digioKycCheckRequestStatus}${applicationId}`,
                    {},
                    {
                        headers: {
                            "X-AppMode": "SDK_INVESTWELL",
                            "X-AppPlatform": await SharedPropsService.getAppPlatform(),
                            Authorization: `Bearer ${await SharedPropsService.getToken()}`,
                            "Content-Type": "application/json",
                        }
                    }
                ).then(res=> {
                    if(res && res.data && res.data.stepResponseObject !== "PENDING") {
                        clearInterval(pollInterval)
                    }
                })
             }, 5000)
         }
      }
  }).catch(error=>{
      console.log(error)
  });
};
