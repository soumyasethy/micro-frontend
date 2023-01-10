export enum ACTION {
  TRACK = "TRACK",
  MANAGE = "MANAGE",
  CTA="CTA",
  GO_BACKAction="GO_BACKAction",
  RESUME = "RESUME"
}

export type TestActionPayload = {};

export type ClientPendingPayloadType = {
  name: string,
  stepsCompleted: number | string,
  applicationId: string,
}

export type ClientInProgressPayloadType = {
  name: string,
  utilizedAmount: number|string,
  fullAmount: number|string,
  applicationId: string,
}