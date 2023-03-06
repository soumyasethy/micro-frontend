import { ROUTE } from "../routes";

type HeightMapType = {
  [key: string]: number | string;
};

export const heightMap: HeightMapType = {
  [ROUTE.PAN_CONFIRM_NAME]: 185,
  [ROUTE.ALERT_PAGE]: 280,
  [ROUTE.WITHDRAWAL_SUCCESS]: 570,
  [ROUTE.WITHDRAWAL_OTP]: 265,
  [ROUTE.LOAN_AUTOPAY]: 258,
  [ROUTE.PLEDGE_VERIFY]: 333,
  [ROUTE.OTP_AUTH_CAS]: 333,
  [ROUTE.MF_FETCH_PORTFOLIO]: 550,
  [ROUTE.UPDATE_PHONE_NUMBER]: 274,
  [ROUTE.UPDATE_EMAIL_ID]: 274,
  [ROUTE.MODIFY_PLEDGED_AMOUNT]: 247+16,
  [ROUTE.SELECT_SOURCE]: 272,
  [ROUTE.UPDATE_SLIDER_AMOUNT]: 176,
};
