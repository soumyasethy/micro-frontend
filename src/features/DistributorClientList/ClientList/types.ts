export enum ACTION {
  TRACK = "TRACK",
  TRACK_PENDING = "TRACK_PENDING",
  MANAGE = "MANAGE",
  CTA="CTA",
  ON_CHANGE="ON_CHANGE",
}

export type TestActionPayload = {};

export type dataTypeClient = {
  value:any,
  widgetID: string;
  data:any
}

export type ClientPendingPayloadType = {
  name: string,
  steps: any,
  applicationId: string,
  data:any,
  totalSteps:string,
  completedSteps:string
}

export type ClientInProgressPayloadType = {
  name: string,
  utilizedAmount: number|string,
  fullAmount: number|string,
  applicationId: string,
}