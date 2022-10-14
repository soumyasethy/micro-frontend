export enum ACTION {
  ENTER_EMAIL = "ENTER_EMAIL",
  CONTINUE = "CONTINUE",
}
export type EmailPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
};
