import { ActionFunction } from "@voltmoney/types";
import { partnerApi } from "../../../configs/api";
import { getAppHeader } from "../../../configs/config";
import { ROUTE } from "../../../routes";
import SharedPropsService from "../../../SharedPropsService";
import { navigate } from "../../afterUnlock/dashboard/actions";
import { ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";

export const onTrackCTA: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { navigate,setDatastore }
): Promise<any> => {
    await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST_STEPPER,{
        applicationId:action.payload.applicationId,
        name: action.payload.name,
        stepperData:action.payload.steps
    });
};

export const pendingTracks: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { navigate,setDatastore }
): Promise<any> => {
    const stepsData = action.payload.data;
    const applicationId = action.payload.applicationId;
    await SharedPropsService.setApplicationId(applicationId);
    if(stepsData.currentStepId === "MF_PLEDGE_PORTFOLIO"){
       
        await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
        // go to fetch portfolio
    }else if(stepsData.currentStepId === "BANK_ACCOUNT_VERIFICATION"){
        await navigate(ROUTE.DIST_BANK_ACCOUNT_ADD);
        // go to bank add
    }else if(stepsData.currentStepId === "MF_FETCH_PORTFOLIO"){
        // go to fetch portfolio
        await navigate(ROUTE.DISTRIBUTOR_PORTFOLIO);
    }else{
        await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST);
    }
};

export const notification: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn(
        "notification click"
    );
};

export const onManageCTA: ActionFunction<ClientInProgressPayloadType> = async (
   action,
   _datastore,
   { setDatastore }
): Promise<any> => {
    console.warn(
        JSON.stringify(action.payload)
    );
};

export const onClickCTA: ActionFunction<any> = async (
    action,
    _datastore,
    { network,setDatastore,navigate }
): Promise<any> => {
    const applicationId = "";
        const response = await network.post(
            partnerApi.stepperData,
            {},
            { headers: await getAppHeader() }
        );

        let data1 = [];
        let data = [];
        Object.keys(response.data.partnerViewStepperMap).map(key=> {
          const value = response.data.partnerViewStepperMap[key];
          const stepData:any = new Object();
          if(value.isEditable === true){
            stepData.title = value.verticalDisplayName;
            stepData.subTitle = value.verticalDescription;
            stepData.id =value.order;
            stepData.status = value.status;
            data1.push(stepData);
          }
          })
          data = data1.sort(function (a, b) {
            return a.id - b.id;
          });

          await SharedPropsService.setStepperData(data);
            await navigate(ROUTE.BASIC_DETAILS_START);
 // await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
};
