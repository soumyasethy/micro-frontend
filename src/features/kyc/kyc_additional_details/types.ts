export enum ACTION {
  TRIGGER_CTA = "TRIGGER_CTA",
  TOGGLE_CTA = "TOGGLE_CTA",
  DISABLE_CTA = "DISABLE_CTA",
  ENABLE_CTA = "ENABLE_CTA",
  INPUT_NAME = "INPUT_NAME",
  GO_BACK = "GO_BACK",
  SELECT_QUALIFICATION = 'SELECT_QUALIFICATION',
  STATUS_CHECK = 'STATUS_CHECK',
  STATUS_UNCHECK = 'STATUS_UNCHECK',
}
export type EnableDisableCTA = {
  value: boolean;
  targetWidgetId: string;
};

export type InputPayload = {
  value: string;
  widgetID: string;
};

export type MaritalStatusPayload = {
  value: boolean;
  targetWidgetId: string,
}

export enum MARITAL_STATUS {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
}

export type KycAdditionalDetailsPayload = {
  fatherFirstName: string;
  fatherLastName: string;
  martialStatus: MARITAL_STATUS;
  motherFirstName: string;
  motherLastName: string;
  qualification: string; //enum
};
