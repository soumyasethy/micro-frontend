export enum ACTION {
  TRACK = "TRACK",
  TRACK_PENDING = "TRACK_PENDING",
  MANAGE = "MANAGE",
  CTA="CTA",
  NOTIFICATION="NOTIFICATION",
}

export type TestActionPayload = {};

export type ClientPendingPayloadType = {
  name: string,
  steps: any,
  applicationId: string,
  data:any
}

export type ClientInProgressPayloadType = {
  name: string,
  utilizedAmount: number|string,
  fullAmount: number|string,
  applicationId: string,
}