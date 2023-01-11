export enum ACTION {
  ENTER_NAME = "ENTER_NAME",
  ENTER_EMAIL = "ENTER_EMAIL",
  CONTINUE = "CONTINUE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
  BACK = "BACK",
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
