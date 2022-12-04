export enum ACTION {
  REPAYMENT = "REPAYMENT",
  PROFILE = "PROFILE",
  GO_BACK = "GO_BACK",
  COPY = "COPY",
}

export type AssetsPayload = {
  value: string;
  widgetId: string;
};

export type CopyToClipboardPayload = {
  value: string;
};
