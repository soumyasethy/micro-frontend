import { ActionFunction, SCREEN_SIZE } from "@voltmoney/types";
import {Share} from "react-native"
import {
   AmountPayload, RepositoryPayload
} from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import _ from "lodash";
import { partnerApi } from "../../configs/api";
import { AssetRepositoryType, getAppHeader } from "../../configs/config";
import { getScreenType } from "../../configs/platfom-utils";
import { Dimensions } from "react-native";
import { ButtonProps } from "@voltmoney/schema";

export const onSave: ActionFunction<AmountPayload> = async (action, _datastore, {setDatastore, navigate, ...props }): Promise<any> => {
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: true,
  });
  const response = await SharedPropsService.getStepperData();
  let data1 = [];
  let stepper_data = [];
  response.forEach((item,index) => {
    if(item.horizontalDisplayName === "Fetch Portfolio"){
      item.status = "COMPLETED";
    }
    data1.push(item);
  });
  await SharedPropsService.setStepperData(data1);
  await setDatastore(action.routeId, "continue", <ButtonProps>{
    loading: false,
  });
  await navigate(ROUTE.PORTFOLIO_UNLOCK,{
    stepResponseObject: action.payload.value,
  });
};

export const onSkip: ActionFunction<{}> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
 
  let filtered_stepper = [];
  let stepper_data = await SharedPropsService.getStepperData();
  stepper_data.forEach((item, index) => {
      if (item.horizontalTitle === "Fetch Portfolio") {
          item.status = "NOT_STARTED";
      }
      filtered_stepper.push(item);
  })

  await SharedPropsService.setStepperData(filtered_stepper);

  await navigate(ROUTE.INVESTOR);
};


export const onShare: ActionFunction<{}> =
    async (action, _datastore, { network, clipboard, setDatastore, ...props }): Promise<any> => {

        const applicationId = await SharedPropsService.getApplicationId();
        const Linkresponse = await network.get(
            `${partnerApi.referalLink}${applicationId}`,
            {
                headers: await getAppHeader(),
            }
        );
        const link = Linkresponse.data.link;
        const screenType = getScreenType(Dimensions.get("window").width);
        if (
            screenType === SCREEN_SIZE.X_SMALL ||
            screenType === SCREEN_SIZE.SMALL
        ) {
            try {
                const result = await Share.share({
                    message: `Hi\n\nUse Volt to open a credit line(OD) against mutual funds in 5 minutes with trusted lenders such as Bajaj Finance.\n\nInterest rates starting at 9%. Use this link to apply now.\n${link}\n`,
                });
                if (result.action === Share.sharedAction) {
                    if (result.activityType) {
                        // shared with activity type of result.activityType
                    } else {
                        // shared
                    }
                } else if (result.action === Share.dismissedAction) {
                    // dismissed
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            clipboard.set(link);
        }
    };

export const onBack: ActionFunction<{}> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.DISTRIBUTOR_CLIENT_LIST)
};


export const goNext: ActionFunction<RepositoryPayload> = async (action, _datastore, { navigate, network }): Promise<any> => {
  const applictaionId = await SharedPropsService.getApplicationId();
  const accountId = await SharedPropsService.getAccountId();
  
  const response = await network.get(
    `${partnerApi.userProfile}${accountId}`,
    { headers: await getAppHeader() }
  );
  if (response.status === 200) {
    await SharedPropsService.setPartnerUser({
      name: response.data.name,
      panNumber: response.data.panNumber,
      phoneNumber: response.data.phoneNumber,
      emailId: response.data.emailId
    });
  }
  if(action.payload.value === AssetRepositoryType.CAMS){
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.CAMS);
  }else{
    await SharedPropsService.setAssetRepositoryType(AssetRepositoryType.KARVY);
  }
  
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {
    headTitle: action.payload.value,
    applicationId: applictaionId
  })
};


export const getUserDetails: ActionFunction<{}> = async (
  action,
  _datastore,
  { network, setDatastore, navigate }
): Promise<any> => {
  const accountId = await SharedPropsService.getAccountId();
  const response = await network.get(
    `${partnerApi.userProfile}${accountId}`,
    { headers: await getAppHeader() }
  );
  if (response.status === 200) {
    await SharedPropsService.setPartnerUser({
      name: response.data.phoneNumber,
      panNumber: response.data.panNumber,
      phoneNumber: response.data.phoneNumber,
      emailId: response.data.emailId
    });
  }

};




