export enum ACTION {
    GO_BACK = "GO_BACK",
    CHANGE_INPUT = "CHANGE_INPUT",
    CHANGE_INPUT_PAN = "CHANGE_INPUT_PAN",
    CHANGE_INPUT_PHONE = "CHANGE_INPUT_PHONE",
    CHANGE_INPUT_EMAIL = "CHANGE_INPUT_EMAIL",
    DISABLE_CONTINUE = "DISABLE_CONTINUE",
    ENABLE_CONTINUE = "ENABLE_CONTINUE",
    TRIGGER_CTA = "TRIGGER_CTA",
    ENTER_DOB = "ENTER_DOB",
}

export type InputPayload = {
    value: any;
    widgetId: any;
  };

  export type EnableDisableCTA = {
    value: boolean;
    targetWidgetId: string;
  };