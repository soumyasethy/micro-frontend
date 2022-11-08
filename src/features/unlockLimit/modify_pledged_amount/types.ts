export enum ACTION {
    MODIFY_PLEDGED_AMOUNT = "MODIFY_PLEDGED_AMOUNT",
  }

  
  export type amountPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  