import { ActionFunction } from "@voltmoney/types";
import { ROUTE } from "../../../routes";
import { navigate } from "../../afterUnlock/dashboard/actions";
import { ClientInProgressPayloadType, ClientPendingPayloadType } from "./types";

export const onTrackCTA: ActionFunction<ClientPendingPayloadType> = async (
    action,
    _datastore,
    { setDatastore }
): Promise<any> => {
    console.warn(
        JSON.stringify(action.payload)
    );
};

export const onManageCTA: ActionFunction<ClientInProgressPayloadType> = async (
   action,
   _datastore,
   { setDatastore }
): Promise<any> => {
    console.warn(
        JSON.stringify(action.payload)
    );
};

export const onClickCTA: ActionFunction<any> = async (
    action,
    _datastore,
    { setDatastore,navigate }
): Promise<any> => {
   await navigate(ROUTE.DISTRIBUTOR_BASIC_DETAILS_INFO);
};
