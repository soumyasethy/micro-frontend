import { StepResponseObject } from "../../mfPledge/unlock_limit/types";

export enum ACTION {
  PORTFOLIO = "PORTFOLIO",
  SEARCH_PORTFOLIO = "SEARCH_PORTFOLIO",
  CLEAR_SEARCH_PORTFOLIO = "CLEAR_SEARCH_PORTFOLIO",
  BACK_BUTTON = "BACK_BUTTON",
  TOGGLE_ITEM = "TOGGLE_ITEM",
  EDIT_ITEM = "EDIT_ITEM",
}

export type OtpPayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};

export type PortfolioTogglePayload = {
  stepResponseObject: StepResponseObject;
  value: number;
  selectedMap: { [key in string | number]: boolean };
};
export type EditItemPayload = {
  value: number;
  stepResponseObject: StepResponseObject;
  selectedMap: { [key in string]: boolean };
};

export type CtaPayload = {
  value: StepResponseObject;
  widgetId: string;
  isResend?: boolean;
};
export type SearchPortfolioPayload = {
  value: string;
  widgetId: string;
  stepResponseObject: StepResponseObject;
};

