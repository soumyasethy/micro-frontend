import { StepResponseObject } from "../../mfPledge/unlock_limit/types";

export enum ACTION {
  MODIFY_PLEDGED_AMOUNT = "MODIFY_PLEDGED_AMOUNT",
  EDIT_AMOUNT = "EDIT_AMOUNT",
  GO_BACK = "GO_BACK",
}

export type ModifyAmountPayload = {
  index: number;
  stepResponseObject: StepResponseObject;
  selectedMap: { [key in number]: boolean };
  portfolioSearchKeyword?: string
};
export type AmountPayload = {
  value: string;
};
