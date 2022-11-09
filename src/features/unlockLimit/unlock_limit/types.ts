export enum ACTION {
    UNLOCK_LIMIT = "UNLOCK_LIMIT",
    MODIFY_LIMIT = "MODIFY_LIMIT",
  }

  
  export type ContinuePayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  export type LimitPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  