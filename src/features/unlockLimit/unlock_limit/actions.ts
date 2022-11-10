import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  LimitPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultHeaders } from "../../../configs/config";
import SharedPropsService from "../../../SharedPropsService";
import { PledgeCreateRepo } from "./repo";
//let availableCAS: string = "";

export const continueLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {

  navigate(ROUTE.PLEDGE_CONFIRMATION, { availableCAS: action.payload.value });
};

export const modifyLimit: ActionFunction<LimitPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {

  navigate(ROUTE.MODIFY_LIMIT);
};

