export enum ACTION {
  UPDATE_EMAIL_ID = "UPDATE_EMAIL_ID",
  EMAIL_NUMBER_ONCHANGE = "EMAIL_NUMBER_ONCHANGE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
  GO_BACK = "GO_BACK",
}
export type UpdateEmailIdPayload = { value: string; targetWidgetId: string };
