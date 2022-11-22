export enum ACTION {
  WITHDRAW_AMOUNT = "WITHDRAW_AMOUNT",
  ON_AMOUNT_CHANGE = "ON_AMOUNT_CHANGE",
  SET_RECOMENDED_AMOUNT = "SET_RECOMENDED_AMOUNT",
  GO_BACK = "GO_BACK",
}

export type AmountPayload = {
  value: string;
};

export type CreateDisbursementRequestPayload = {
  disbursalAmount: number;
};
