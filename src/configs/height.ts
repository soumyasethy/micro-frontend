import { ROUTE } from "../routes";

type HeightMapType = {
  [key: string]: number | string;
};

export const heightMap: HeightMapType = {
  [ROUTE.PAN_CONFIRM_NAME]: 185,
  [ROUTE.ALERT_PAGE]: 245,
  [ROUTE.WITHDRAWAL_SUCCESS]: 519,
  [ROUTE.WITHDRAWAL_OTP]: 265,
  [ROUTE.LOAN_AUTOPAY]: 258,
  [ROUTE.PLEDGE_VERIFY]: 333,
  [ROUTE.OTP_AUTH_CAS]: 312,
  [ROUTE.MF_FETCH_PORTFOLIO]: 550,
  [ROUTE.UPDATE_PHONE_NUMBER]: 176,
  [ROUTE.UPDATE_EMAIL_ID]: 176,
  [ROUTE.MODIFY_PLEDGED_AMOUNT]: 247,
};
