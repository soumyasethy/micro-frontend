import { EDUCATION } from "../kyc_additional_details/types";

export enum ACTION {
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  SELECT_DOC_TYPE = "SELECT_DOC_TYPE",
  SELECT_DOCUMENT = "SELECT_DOCUMENT",
  GO_BACK = "GO_BACK",
}
export type DropDownPayload = {
  value?: EDUCATION;
  widgetID: string;
};

export type DocumentUploadPayload = {
  value: any;//{ content: any; name: string };
  widgetID: string;
};
