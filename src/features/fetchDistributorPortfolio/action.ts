import { ActionFunction } from "@voltmoney/types";
import {
  ButtonProps,
  ButtonTypeTokens,
  IconTokens,
  StepperStateToken,
} from "@voltmoney/schema";

import {
  ACTION
} from "./types";
import { ROUTE } from "../../routes";
import SharedPropsService from "../../SharedPropsService";
import _ from "lodash";
import { api } from "../../configs/api";
import { APP_CONFIG, getAppHeader } from "../../configs/config";
import {
  updateCurrentStepId,
  updateStepStatusMap,
} from "../../configs/utils";
import { navigate } from "../afterUnlock/dashboard/actions";


export const onSave: ActionFunction<{}> = async (action, _datastore, { ...props }): Promise<any> => {
 
};

export const onSkip: ActionFunction<{}> = async (action, _datastore, { ...props }): Promise<any> => {
  console.log("Skip");
};

export const onShare: ActionFunction<{}> = async (action, _datastore, { ...props }): Promise<any> => {
 console.log("Share");
};

export const onBack: ActionFunction<{}> = async (action, _datastore, { navigate }): Promise<any> => {
  await navigate(ROUTE.BASIC_DETAILS_START)
 };


