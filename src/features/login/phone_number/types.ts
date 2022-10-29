export enum ACTION {
  PHONE_NUMBER = "PHONE_NUMBER",
  WHATSAPP_CHECK = "WHATSAPP_CHECK",
  WHATSAPP_UNCHECK = "WHATSAPP_UNCHECK",
  CONTINUE = "CONTINUE",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
}
export type EnableDisableCTA = {
  value: boolean;
  targetWidgetId: string;
};
export type PhoneNumberPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
  isResend?: boolean;
};
export type WhatsAppEnabledPayload = {
  value: boolean;
  widgetId: string;
};
