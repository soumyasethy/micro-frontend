export enum ACTION {
  CONFIRM_PAN = "CONFIRM_PAN",
  CHANGE_PAN_NO = "CHANGE_PAN_NO",
}
export type PanPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
  applicationId: string;
  panNumber?: string;
  targetRoute?: string;
};
