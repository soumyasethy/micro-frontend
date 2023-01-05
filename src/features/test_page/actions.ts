import { ActionFunction } from "@voltmoney/types";
import sharedPropsService from "../../SharedPropsService";
import {User} from "../login/otp_verify/types";
import SharedPropsService from "../../SharedPropsService";
import {api} from "../../configs/api";
import {KycAdditionalDetailsPayload} from "../kyc/kyc_additional_details/types";
import {DigioDocsStatus, DigioKycStatus, getAppHeader, ImportScriptSrc} from "../../configs/config";
import { getDigio } from "../../configs/utils";

let pollInterval;

export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, network, digio, importScript }
): Promise<any> => {
  console.warn("**** Test Action Triggered ****", action);
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;
  /*
  //DIGIO Kyc Verification Integration
  importScript(ImportScriptSrc.DIGIO_SCRIPT, getDigio, async(digio_response)=>{
      network.post(
          `${api.digioKycCheckRequestStatusOnCallBack}${applicationId}`,
          {},
          {
              headers: {
                  "X-AppMode": "SDK_INVESTWELL",
                  "X-AppPlatform": await SharedPropsService.getAppPlatform(),
                  Authorization: `Bearer ${await SharedPropsService.getToken()}`,
                  "Content-Type": "application/json",
              }
          }
      ).then(response=>{
          clearInterval(pollInterval)
          console.log("Success: ", response)
          console.log("Digio_Response", digio_response)

      })
  }, async(digio_response)=>{
      network.post(
          `${api.digioKycCheckRequestStatusOnCallBack}${applicationId}`,
          {},
          {
              headers: {
                  "X-AppMode": "SDK_INVESTWELL",
                  "X-AppPlatform": await SharedPropsService.getAppPlatform(),
                  Authorization: `Bearer ${await SharedPropsService.getToken()}`,
                  "Content-Type": "application/json",
              }
          }
      ).then(response=>{
        clearInterval(pollInterval)
        console.log("Failure: ", response)
        console.log("Digio_Response", digio_response)
      })
  })
  // Digio Kyc Mandate
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
                  pollInterval = setInterval(async ()=> {
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
                          if(res && res.data && res.data.stepResponseObject !== DigioKycStatus.CREATED) {
                              console.log("Verification Completed")
                              clearInterval(pollInterval)
                          }
                      })
                  }, 5000)
              }
          }
      }).catch(error=>{
          console.log(error)
      });
  */
    importScript(
        ImportScriptSrc.DIGIO_SCRIPT,
        getDigio,
        async(digio_response)=>{
            network.post(
                `${api.digioDocsCheckRequestStatusOnCallBack}${applicationId}`,
                {},
                {
                    headers: {
                        "X-AppMode": "SDK_INVESTWELL",
                        "X-AppPlatform": await SharedPropsService.getAppPlatform(),
                        Authorization: `Bearer ${await SharedPropsService.getToken()}`,
                        "Content-Type": "application/json",
                    }
            }
        ).then(response=>{
            clearInterval(pollInterval)
            console.log("Success: ", response)
            console.log("Digio_Response", digio_response)
        })
    }, async(digio_response)=>{
        network.post(
            `${api.digioDocsCheckRequestStatusOnCallBack}${applicationId}`,
            {},
            {
                headers: {
                    "X-AppMode": "SDK_INVESTWELL",
                    "X-AppPlatform": await SharedPropsService.getAppPlatform(),
                    Authorization: `Bearer ${await SharedPropsService.getToken()}`,
                    "Content-Type": "application/json",
                }
            }
        ).then(response=>{
            clearInterval(pollInterval)
            console.log("Failure: ", response)
            console.log("Digio_Response", digio_response)
        })
    })
    // Digio Kyc Mandate
    await network.post(
        `${api.digioDocsESignInitiateRequest}${applicationId}`,
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
                console.log("init: ", response.data)
                const stepResponseObjectId = response.data.stepResponseObject
                //@ts-ignore
                digio.init();
                digio.submit(stepResponseObjectId, user.user.phoneNumber)
                //polling
                pollInterval = setInterval(async ()=> {
                    network.post(
                        `${api.digioDocsCheckRequestStatus}${applicationId}`,
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
                         if(res && res.data && res.data.stepResponseObject !== DigioDocsStatus.REQUESTED) {
                            console.log("Polling Completed")
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
