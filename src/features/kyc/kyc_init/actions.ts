import { ActionFunction } from "@voltmoney/types";
import { AadharInitRepo } from "./repo";
import { AadharInitPayload } from "./types";
import { ROUTE } from "../../../routes";
import { ButtonProps } from "@voltmoney/schema";
import {DigioDocsStatus, ImportScriptSrc} from "../../../configs/constants";
import { getDigio } from "../../../configs/utils";
import {api} from "../../../configs/api";
import {User} from "../../login/otp_verify/types";
import SharedPropsService from "../../../SharedPropsService";
import {getAppHeader} from "../../../configs/config";

let pollInterval;

export const AadharInitAction: ActionFunction<AadharInitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, importScript, network, digio }
): Promise<any> => {
  await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
    loading: true,
  });
  // const response = await AadharInitRepo(
  //   action.payload.applicationId,
  //   action.payload.aadhaarNumber
  // );
  // await setDatastore(ROUTE.KYC_DIGILOCKER, "continue", <ButtonProps>{
  //   loading: false,
  // });
  // if (response.hasOwnProperty("status") && response.status === "SUCCESS")
  //   await navigate(ROUTE.KYC_AADHAAR_VERIFICATION_OTP);
  // else if (
  //   response.hasOwnProperty("statusCode") &&
  //   response.statusCode === "400"
  // )
  //   await navigate(ROUTE.KYC_AADHAAR_VERIFICATION);
  const user: User = await SharedPropsService.getUser();
  const applicationId = user.linkedApplications[0].applicationId;

  importScript(
      ImportScriptSrc.DIGIO_SCRIPT,
      getDigio,
      async(digio_response)=>{
        console.log("Successfully verified from vendor")
        network.post(
            `${api.digioDocsCheckRequestStatusOnCallBack}${applicationId}`,
            {},
            {
              headers: await getAppHeader()
            }
        ).then(response=>{
          clearInterval(pollInterval)
          console.log("Success: ", response)
          console.log("Digio_Response", digio_response)
        })
      }, async(digio_response)=>{
        clearInterval(pollInterval)
        console.log("Failure Digio_Response", digio_response)
      })
  // Digio Docs Init
  await network.post(
      `${api.digioDocsESignInitiateRequest}${applicationId}`,
      {},
      {
        headers: await getAppHeader()
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
                headers: await getAppHeader()
              }
          ).then(res=> {
            if(res && res.data && res.data.stepResponseObject !== DigioDocsStatus.REQUESTED) {
              console.log("Polling Completed");
              clearInterval(pollInterval)
            }
          })
        }, 5000)
      }
    }
  }).catch(error=>{
    console.log(error)
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
