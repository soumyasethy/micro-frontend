export enum ACTION {
    GO_BACK = "GO_BACK",
    CHANGE_INPUT = "CHANGE_INPUT",
    DISABLE_CONTINUE = "DISABLE_CONTINUE",
    ENABLE_CONTINUE = "ENABLE_CONTINUE",
    TRIGGER_CTA = "TRIGGER_CTA",
    ENTER_DOB = "ENTER_DOB",
}

export type InputPayload = {
    value: string;
    widgetId: string;
  };

  export type EnableDisableCTA = {
    value: boolean;
    targetWidgetId: string;
  };