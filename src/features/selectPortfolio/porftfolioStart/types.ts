import { StepResponseObject } from "../../fetchDistributorPortfolio/types";

export enum ACTION {
    ON_SAVE = "ON_SAVE",
    ON_SKIP = "ON_SKIP",
    GO_BACK = "GO_BACK",
    SHARE = "SHARE",
  }
  
  export type AssetsPayload = {
    value: string;
    widgetId: string;
    stepResponseObject?: StepResponseObject;
  };