import { Action } from "@voltmoney/types";

export enum ACTION {
  CLOSE_POPUP = "CLOSE_POPUP",
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
  isAutoTriggerCta?: boolean;
  autoTriggerTimerInMilliseconds?: number;
};
