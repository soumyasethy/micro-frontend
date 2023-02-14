export enum ACTION {
  ON_SAVE = "ON_SAVE",
  ON_SKIP = "ON_SKIP",
  GO_BACK = "GO_BACK",
  ON_CLIENT = "ON_CLIENT",
  SHARE = "SHARE",
  ON_CLIPBOARD = "ON_CLIPBOARD"
}


export type LinkPayload = {
  value: string;
};