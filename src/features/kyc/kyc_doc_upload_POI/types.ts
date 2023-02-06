import { EDUCATION } from "../kyc_additional_details/types";

export enum ACTION {
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  ON_PAGE_LOAD = "ON_PAGE_LOAD",
  SELECT_DOCUMENT = "SELECT_DOCUMENT",
  GO_BACK = "GO_BACK",
}
export type DropDownPayload = {
  value?: EDUCATION;
  widgetID: string;
};

export type DocumentUploadPayload = {
  value: any; //{ content: any; name: string };
  widgetID: string;
};
