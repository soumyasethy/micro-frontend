import { onBoarding } from "./features/on_boarding";
export var ROUTE;
(function (ROUTE) {
    ROUTE[ROUTE["ON_BOARDING"] = 0] = "ON_BOARDING";
    ROUTE[ROUTE["MOBILE_NO_VERIFY"] = 1] = "MOBILE_NO_VERIFY";
    ROUTE[ROUTE["ENTER_OTP"] = 2] = "ENTER_OTP";
    ROUTE[ROUTE["EMAIL_VERIFY"] = 3] = "EMAIL_VERIFY";
    ROUTE[ROUTE["PAN_VERIFY"] = 4] = "PAN_VERIFY";
    ROUTE[ROUTE["PAN_CONFIRM"] = 5] = "PAN_CONFIRM";
})(ROUTE || (ROUTE = {}));
export const RouteMap = {
    ON_BOARDING: onBoarding,
};
