import { Action } from "@voltmoney/types";

export enum ACTION {
  GO_BACK = "GO_BACK",
}
export type TestActionPayload = {};

export type AlertNavProps = {
  title?: string;
  subTitle?: string;
  message?: string;
  iconName?: string;
  ctaLabel?: string;
  primary?: boolean;
  ctaAction?: Action<any>;
  type?: "SUCCESS" | "FAILED" | "IN_PROGRESS" | "LOADING" | "DEFAULT";
};
