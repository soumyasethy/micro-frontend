export enum ACTION {
  PHOTO_VERIFY = "PHOTO_VERIFY",
  PHOTO_RETAKE = "PHOTO_RETAKE",
  GO_BACK = "GO_BACK",
}

export type PhotoVerifyPayload = {
  base64Image: string;
}