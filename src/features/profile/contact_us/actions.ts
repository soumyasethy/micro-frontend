import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import {
  ContactPayload
} from "./types";
import {
  ButtonProps,
  InputStateToken,
  TextInputProps,
} from "@voltmoney/schema";
import { api } from "../../../configs/api";
import { defaultAuthHeaders } from "../../../configs/config";

let phoneNumber: string = "";

export const accountDetails: ActionFunction<ContactPayload> = async (
  action,
  _datastore,
  { navigate, setDatastore, asyncStorage }
): Promise<any> => {
 
};


export const goBack: ActionFunction<ContactPayload> = async (
  action,
  _datastore,
  {goBack }
): Promise<any> => {
  goBack();
};

