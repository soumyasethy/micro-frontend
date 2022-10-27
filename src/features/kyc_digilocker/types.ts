export enum ACTION {
  AADHAR_INIT = "AADHAR_INIT",
}
export type AadharInitPayload = {
  aadhaarNumber?: string;
  applicationId: string;
};
