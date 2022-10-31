import { Action } from "@voltmoney/types";

export enum ACTION {
  TEST_ACTION = "TEST_ACTION",
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
};
