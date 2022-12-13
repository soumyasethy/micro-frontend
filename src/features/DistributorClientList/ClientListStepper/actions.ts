import { ActionFunction } from "@voltmoney/types";
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
    { setDatastore }
): Promise<any> => {
    console.warn("CTA triggerred");
};
