export enum ACTION {
    FAQ = "FAQ",
    PROFILE = "PROFILE",
    BACK_BUTTON = "BACK_BUTTON"
  }
  
  
  export type FaqPayload = {
    value: string;
    widgetId: string;
  };
  
  