export enum ACTION {
  PHONE_NUMBER = "PHONE_NUMBER",
  // USER_CHECK = "USER_CHECK",
  CONTINUE = "CONTINUE",
}
export type PhoneNumberPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
};
