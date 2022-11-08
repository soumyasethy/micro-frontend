export enum ACTION {
    PLEDGED_AMOUNT = "PLEDGED_AMOUNT",
  }

  export type amountPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  