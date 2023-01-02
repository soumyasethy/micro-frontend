import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  StepperStateToken,
} from "@voltmoney/schema";

import {
  ACTION, AmountPayload
} from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import _ from "lodash";
import { api, partnerApi } from "../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../configs/config";
import {
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../configs/utils";
import { navigate } from "../afterUnlock/dashboard/actions";


export const onSave: ActionFunction<AmountPayload> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  await navigate(ROUTE.PORTFOLOIO_START,{
    stepResponseObject: action.payload.value,
  });
  // await navigate(ROUTE.PORTFOLOIO_START,{
  //   amount:action.payload.value
  // });
};

export const onSkip: ActionFunction<{}> = async (action, _datastore, { navigate, ...props }): Promise<any> => {
  await navigate(ROUTE.SELECT_DISTRIBUTOR_PORTFOLIO);
};

export const onShare: ActionFunction<{}> = async (action, _datastore, { ...props }): Promise<any> => {
  console.log("Share");
};

export const onBack: ActionFunction<{}> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.BASIC_DETAILS_START)
};


export const goCamsNext: ActionFunction<{}> = async (action, _datastore, { navigate, network }): Promise<any> => {
  const applictaionId = await SharedPropsService.getApplicationId();
  console.log("send", applictaionId);
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
  //await getUserDetails({},{});
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {
    headTitle: "CAMS",
    applicationId: applictaionId
  })
};


export const goKarvyNext: ActionFunction<{}> = async (action, _datastore, { navigate, network }): Promise<any> => {
  const applictaionId = await SharedPropsService.getApplicationId();
  //  await getUserDetails({},{});
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
  await navigate(ROUTE.MF_FETCH_PORTFOLIO, {
    headTitle: "KARVY",
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




