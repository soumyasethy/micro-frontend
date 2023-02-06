export enum ACTION {
  VALIDATE_FORM = "VALIDATE_FORM",
  VERIFY_PAN = "VERIFY_PAN",
  ENABLE_CONTINUE = "ENABLE_CONTINUE",
  DISABLE_CONTINUE = "DISABLE_CONTINUE",
}
export type InputPayload = {
  value: string;
  widgetId: string;
};

export type ContinuePayload = {
  value: string;
  widgetId: string;
  applicationId: string;
  targetRoute?: string;
  setIsUserLoggedIn?: (user: any) => void;
};
