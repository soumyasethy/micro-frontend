export enum ACTION {
  PHONE_NUMBER = "PHONE_NUMBER",
  WHATSAPP_CHECK = "WHATSAPP_CHECK",
  WHATSAPP_UNCHECK = "WHATSAPP_UNCHECK",
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
export type WhatsAppEnabledPayload = {
  value: boolean;
  widgetId: string;
};
