import { StepResponseObject } from "../../fetchDistributorPortfolio/types";

export enum ACTION {
    ON_SAVE = "ON_SAVE",
    ON_MODIFY = "ON_MODIFY",
    ON_SKIP = "ON_SKIP",
    GO_BACK = "GO_BACK",
    BACK_BUTTON = "BACK_BUTTON",
    SHARE = "SHARE",
    COPY = "COPY",
  }
  
  export type AssetsPayload = {
    value: string;
    widgetId: string;
    stepResponseObject?: StepResponseObject;
  };

  export type EditItemPayload = {
    value: number;
    stepResponseObject: StepResponseObject;
    selectedMap: { [key in string]: boolean };
  };