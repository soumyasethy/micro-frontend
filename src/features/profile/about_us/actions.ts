import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { ProfilePayload } from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

let phoneNumber: string = "";

export const accountDetails: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {};

export const goBack: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { goBack }
): Promise<any> => {
  goBack();
};

export const goToPrivacy: ActionFunction<ProfilePayload> = async (
  action,
  _datastore,
  { navigate }
): Promise<any> => {
  navigate(ROUTE.PRIVACY_POLICY);
};
