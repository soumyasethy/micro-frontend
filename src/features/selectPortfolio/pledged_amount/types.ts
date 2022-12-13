export enum ACTION {
    PLEDGED_AMOUNT = "PLEDGED_AMOUNT",
    GO_BACK = "GO_BACK"
  }

  export type amountPayload = {
    value: string;
    widgetId: string;
    isResend?: boolean;
  };

  