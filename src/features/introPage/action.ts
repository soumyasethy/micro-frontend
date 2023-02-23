import { ActionFunction } from "@voltmoney/types";
import {ROUTE} from "../../routes";

export const ApplyNowAction: ActionFunction<any> = async (
    action,
    _datastore,
    { navigate }
): Promise<any> => {
    console.log(" here: ", action.payload.props);
    await navigate(ROUTE.SPLASH_SCREEN, action.payload.props);
};