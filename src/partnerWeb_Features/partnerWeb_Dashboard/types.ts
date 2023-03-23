import {PartnerLeadsListType} from "../../SharedPropsService";
import {EDUCATION} from "../../features/kyc/kyc_additional_details/types";

export enum ACTION {
  TEST_ACTION = "TEST_ACTION",
  CHANGE_INPUT="CHANGE_INPUT",
  CHANGE_TAB="CHANGE_TAB",
  ON_SEARCH_LEADS="ON_SEARCH_LEADS",
  ON_SELECT="ON_SELECT",
  ON_SORT="ON_SORT",
  ON_SELECT_ALL_LEADS = 'ON_SELECT_ALL_LEADS',
  ON_LOAD = 'ON_LOAD',
  CHANGE_INPUT_AC="CHANGE_INPUT_AC",
  ON_SEARCH_AC="ON_SEARCH_AC",
  ON_SELECT_AC="ON_SELECT_AC",
  ON_SORT_AC="ON_SORT_AC",
  ON_SELECT_ALL_AC = 'ON_SELECT_ALL_AC',
  ON_FILTER_LEADS_BY_STATUS = 'ON_FILTER_LEADS_BY_STATUS',
  VALIDATE_FORM_1 = "VALIDATE_FORM_1",
  VALIDATE_FORM_2 = "VALIDATE_FORM_2",
  FILTER_BY_DATE = 'FILTER_BY_DATE',
  ON_SEARCH_RP = 'ON_SEARCH_RP',
  ON_SORT_RP = 'ON_SORT_RP',
  ON_TRACK_CUSTOMER_JOURNEY = 'ON_TRACK_CUSTOMER_JOURNEY'
}
export type TestActionPayload = {};

export type SearchInputActionPayload = {
  value: string,
  widgetId: string
};

export type SelectActionPayload = {
  data: object
};

export type SortActionPayload = {
  value: string
}

export type OnLoadActionPayload = {
  partnerData: PartnerLeadsListType
}

export type DropDownPayload = {
  value?: EDUCATION;
  widgetID: string;
};