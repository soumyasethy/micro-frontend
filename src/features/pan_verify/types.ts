export enum ACTION {
  ENTER_PAN = "ENTER_PAN",
  VERIFY_PAN = "VERIFY_PAN",
}
export type PanPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
};
