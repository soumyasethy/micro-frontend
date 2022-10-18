export enum ACTION {
  ENTER_EMAIL = "ENTER_EMAIL",
  CONTINUE = "CONTINUE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
}
export type EmailPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
  applicationId: string;
};
