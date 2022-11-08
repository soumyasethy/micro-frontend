export enum ACTION {
  AADHAR_INIT = "AADHAR_INIT",
  GO_BACK = "GO_BACK",
}
export type AadharInitPayload = {
  aadhaarNumber?: string;
  applicationId: string;
};
export type ToggleKYCVerifyCTA = {
  value: boolean;
};
