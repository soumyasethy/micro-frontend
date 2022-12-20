export enum ACTION {
    ENTER_NAME = "ENTER_NAME",
    CONTINUE = "CONTINUE",
    DISABLE_CONTINUE = "DISABLE_CONTINUE",
    ENABLE_CONTINUE = "ENABLE_CONTINUE",
    BACK = "BACK",
    GO_TO_BASIC_DETAILS = "GO_TO_BASIC_DETAILS",
  }
  export type NamePayload = {
    value: string;
    widgetId: string;
  };
  
  export type ContinuePayload = {
    value: string;
    widgetId: string;
    applicationId: string;
  };
  