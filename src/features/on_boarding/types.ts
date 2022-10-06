export enum ACTION {
  TEXT_ON_CHANGE = "TEXT_ON_CHANGE",
  CONTINUE = "CONTINUE",
}
export type TextOnChangePayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  phone_number: string;
  widgetId: string;
};
