export enum ACTION {
  EDIT_MOBILE_NUMBER = "EDIT_MOBILE_NUMBER",
  PHONE_NUMBER_ONCHANGE = "PHONE_NUMBER_ONCHANGE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
}
export type UpdateMobileNumber = { value: string; targetWidgetId: string };
