export enum ACTION {
    FAQ = "FAQ",
    CONTACT = "CONTACT",
    PROFILE = "PROFILE",
    BACK_BUTTON = "BACK_BUTTON"
  }
  
  
  export type FaqPayload = {
    value: string;
    widgetId: string;
  };

  export type WithdrawalPayload = {
    value: string;
    widgetId: string;
  };

  export type KYCPayload = {
    value: string;
    widgetId: string;
  };
  
  