export enum ACTION {
  SEARCH_BANK = "SEARCH_BANK",
  TEST_ACTION = "TEST_ACTION",
}
export type SearchActionPayload = { value: string; targetWidgetId: string };
export type TestActionPayload = {};
